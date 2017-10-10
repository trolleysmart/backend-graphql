// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { StoreService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import Store from './Store';

const StoreConnection = connectionDefinitions({
  name: 'StoreType',
  nodeType: Store,
});

const getCriteria = searchArgs =>
  Map({
    include_parentStore: true,
    orderByFieldAscending: 'name',
    conditions: Map({
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
    }),
  });

const getStoresCountMatchCriteria = async (searchArgs, sessionToken) => new StoreService().count(getCriteria(searchArgs), sessionToken);

const getStoresMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new StoreService().search(
    getCriteria(searchArgs)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getStores = async (searchArgs, sessionToken) => {
  const count = await getStoresCountMatchCriteria(searchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const stores = await getStoresMatchCriteria(searchArgs, sessionToken, limit, skip);
  const indexedStores = stores.zip(Range(skip, skip + limit));

  const edges = indexedStores.map(indexedItem => ({
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

export default StoreConnection;
