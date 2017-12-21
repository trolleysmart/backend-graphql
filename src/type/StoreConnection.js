// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { StoreService } from '@trolleysmart/parse-server-common';
import Store from './Store';

const getCriteria = searchArgs =>
  Map({
    include_parentStore: true,
    ids: searchArgs.has('storeIds') ? searchArgs.get('storeIds') : undefined,
    conditions: Map({
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      forDisplay: searchArgs.has('forDisplay') ? searchArgs.get('forDisplay') : undefined,
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  if (sortOption && sortOption.localeCompare('AddressDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'address');
  }

  if (sortOption && sortOption.localeCompare('AddressAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'address');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getStoresCountMatchCriteria = async (searchArgs, sessionToken) =>
  new StoreService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getStoresMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new StoreService().search(
    addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getStores = async (searchArgs, sessionToken) => {
  const count = await getStoresCountMatchCriteria(searchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
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

export default connectionDefinitions({
  name: 'StoreType',
  nodeType: Store,
});
