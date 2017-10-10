// @flow

import Immutable, { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { ProductPriceService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import Product from './Product';
import { storeLoaderByKey, tagLoaderByKey } from '../loader';

const getCriteria = searchArgs =>
  Map({
    include_store: true,
    include_tags: true,
    include_storeProduct: true,
    conditions: Map({
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: convertStringArgumentToSet(searchArgs.get('description')),
      status: 'A',
      special: searchArgs.has('special') ? searchArgs.get('special') : undefined,
      tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
      storeIds: searchArgs.get('storeIds') ? searchArgs.get('storeIds') : undefined,
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('PriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'priceToDisplay');
  }

  if (sortOption && sortOption.localeCompare('PriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'priceToDisplay');
  }

  if (sortOption && sortOption.localeCompare('SavingDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'saving');
  }

  if (sortOption && sortOption.localeCompare('SavingAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'saving');
  }

  if (sortOption && sortOption.localeCompare('SavingPercentageDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'savingPercentage');
  }

  if (sortOption && sortOption.localeCompare('SavingPercentageAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'savingPercentage');
  }

  if (sortOption && sortOption.localeCompare('OfferEndDateDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'offerEndDate');
  }

  if (sortOption && sortOption.localeCompare('OfferEndDateAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'offerEndDate');
  }

  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getProductPriceCountMatchCriteria = async (searchArgs, sessionToken) =>
  new ProductPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getProductPriceMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new ProductPriceService().search(
    addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getProducts = async (searchArgs, sessionToken) => {
  const finalSearchArgs = searchArgs
    .merge(searchArgs.has('storeKeys') && searchArgs.get('storeKeys')
      ? Map({ storeIds: Immutable.fromJS(await storeLoaderByKey.loadMany(searchArgs.get('storeKeys').toJS())).map(store => store.get('id')) })
      : Map())
    .merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
      ? Map({ tagIds: Immutable.fromJS(await tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')) })
      : Map());
  const count = await getProductPriceCountMatchCriteria(finalSearchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const productPriceItems = await getProductPriceMatchCriteria(finalSearchArgs, sessionToken, limit, skip);
  const indexedProductPriceItems = productPriceItems.zip(Range(skip, skip + limit));
  const edges = indexedProductPriceItems.map(indexedItem => ({
    node: indexedItem[0],
    cursor: indexedItem[1] + 1,
  }));
  const firstEdge = edges.first();
  const lastEdge = edges.last();

  return {
    edges: edges.toArray(),
    count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
      endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
      hasPreviousPage,
      hasNextPage,
    },
  };
};

export default connectionDefinitions({
  name: 'Product',
  nodeType: Product,
});
