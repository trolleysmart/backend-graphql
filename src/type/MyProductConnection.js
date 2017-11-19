// @flow

import Immutable, { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { MyProductService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import MyProduct from './MyProduct';

const getCriteria = async (searchArgs, ownedByUserId) =>
  Map({
    include_tags: true,
    conditions: Map({
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: convertStringArgumentToSet(searchArgs.get('description')),
      ownedByUserId,
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

const getMyProductPriceCountMatchCriteria = async (searchArgs, dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;

  return new MyProductService().count(addSortOptionToCriteria(await getCriteria(searchArgs), userId, searchArgs.get('sortOption')), sessionToken);
};

const getMyProductPriceMatchCriteria = async (searchArgs, dataLoaders, sessionToken, limit, skip) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;

  return new MyProductService().search(
    addSortOptionToCriteria(await getCriteria(searchArgs, userId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );
};

export const getMyProducts = async (searchArgs, dataLoaders, sessionToken) => {
  const finalSearchArgs = searchArgs.merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
    ? Map({
      tagIds: Immutable.fromJS(await dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')),
    })
    : Map());
  const count = await getMyProductPriceCountMatchCriteria(finalSearchArgs, dataLoaders, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const productPriceItems = await getMyProductPriceMatchCriteria(finalSearchArgs, dataLoaders, sessionToken, limit, skip);
  const indexedMyProductPriceItems = productPriceItems.zip(Range(skip, skip + limit));
  const edges = indexedMyProductPriceItems.map(indexedItem => ({
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
  name: 'MyProduct',
  nodeType: MyProduct,
});
