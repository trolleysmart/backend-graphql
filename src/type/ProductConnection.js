// @flow

import Immutable, { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { ProductPriceService } from '@trolleysmart/parse-server-common';
import Product from './Product';
import { getAllStoresToFilterBy } from './Store';

const getCriteria = async (searchArgs, dataLoaders) => {
  const productSearchConfig = await dataLoaders.configLoader.load('productSearch');

  return Map({
    include_store: true,
    include_tags: true,
    include_storeProduct: true,
    ids: searchArgs.has('productIds') ? searchArgs.get('productIds') : undefined,
    conditions: Map({
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
      status: 'A',
    })
      .merge(productSearchConfig.get('returnCrawledProducts') ? Map() : Map({ createdByCrawler: false }))
      .merge(productSearchConfig.get('returnUnauthorizedProductToDisplay') ? Map() : Map({ authorizedToDisplay: true }))
      .merge(productSearchConfig.get('returnProductsOnSpecialOnly') ? Map({ special: true }) : Map())
      .merge(!productSearchConfig.get('returnProductsOnSpecialOnly') && searchArgs.has('special') ? Map({ special: searchArgs.get('special') }) : Map())
      .merge(searchArgs.has('tagIds') ? Map({ tagIds: searchArgs.get('tagIds') }) : Map())
      .merge(searchArgs.has('storeIds') ? Map({ storeIds: searchArgs.get('storeIds') }) : Map()),
  });
};

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

const getProductPriceCountMatchCriteria = async (searchArgs, dataLoaders, sessionToken) =>
  new ProductPriceService().count(addSortOptionToCriteria(await getCriteria(searchArgs, dataLoaders), searchArgs.get('sortOption')), sessionToken);

const getProductPriceMatchCriteria = async (searchArgs, dataLoaders, sessionToken, limit, skip) =>
  new ProductPriceService().search(
    addSortOptionToCriteria(await getCriteria(searchArgs, dataLoaders), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getProducts = async (searchArgs, dataLoaders, sessionToken) => {
  const finalSearchArgs = searchArgs
    .merge(searchArgs.has('storeKeys') && searchArgs.get('storeKeys')
      ? Map({
        storeIds: (await getAllStoresToFilterBy(searchArgs.get('storeKeys'), dataLoaders)).map(store => store.get('id')),
      })
      : Map())
    .merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
      ? Map({
        tagIds: Immutable.fromJS(await dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')),
      })
      : Map());
  const count = await getProductPriceCountMatchCriteria(finalSearchArgs, dataLoaders, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const productPriceItems = await getProductPriceMatchCriteria(finalSearchArgs, dataLoaders, sessionToken, limit, skip);
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
