// @flow

import Immutable, { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { MasterProductService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import MasterProduct from './MasterProduct';

const getCriteria = async searchArgs =>
  Map({
    include_tags: true,
    conditions: Map({
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: convertStringArgumentToSet(searchArgs.get('description')),
    }).merge(searchArgs.has('tagIds') ? Map({ tagIds: searchArgs.get('tagIds') }) : Map()),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getMasterProductPriceCountMatchCriteria = async (searchArgs, sessionToken) =>
  new MasterProductService().count(addSortOptionToCriteria(await getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getMasterProductPriceMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new MasterProductService().search(
    addSortOptionToCriteria(await getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getMasterProducts = async (searchArgs, dataLoaders, sessionToken) => {
  const finalSearchArgs = searchArgs.merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
    ? Map({
      tagIds: Immutable.fromJS(await dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')),
    })
    : Map());
  const count = await getMasterProductPriceCountMatchCriteria(finalSearchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const productPriceItems = await getMasterProductPriceMatchCriteria(finalSearchArgs, sessionToken, limit, skip);
  const indexedMasterProductPriceItems = productPriceItems.zip(Range(skip, skip + limit));
  const edges = indexedMasterProductPriceItems.map(indexedItem => ({
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
  name: 'MasterProduct',
  nodeType: MasterProduct,
});
