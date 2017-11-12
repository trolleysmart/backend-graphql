// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { StoreService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import OwnedStore from './OwnedStore';

const OwnedStoreConnection = connectionDefinitions({
  name: 'OwnedStoreType',
  nodeType: OwnedStore,
});

const getCriteria = (searchArgs, ownedByUserId) =>
  Map({
    include_parentStore: true,
    orderByFieldAscending: 'name',
    conditions: Map({
      ownedByUserId,
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      forDisplay: searchArgs.has('forDisplay') ? searchArgs.get('forDisplay') : undefined,
    }),
  });

const getOwnedStoresCountMatchCriteria =
    async (searchArgs, ownedByUserId, sessionToken) =>
      new StoreService().count(getCriteria(searchArgs, ownedByUserId), sessionToken);

const getOwnedStoresMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new StoreService().search(
    getCriteria(searchArgs, ownedByUserId)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getOwnedStores = async (searchArgs, dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getOwnedStoresCountMatchCriteria(searchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const stores = await getOwnedStoresMatchCriteria(searchArgs, userId, sessionToken, limit, skip);
  const indexedOwnedStores = stores.zip(Range(skip, skip + limit));

  const edges = indexedOwnedStores.map(indexedItem => ({
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

export default OwnedStoreConnection;
