// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { ShoppingListService } from '@trolleysmart/parse-server-common';
import ShoppingList from './ShoppingList';
import { createSessionTokenAndUserIdKeyCombination } from '../loaders';

const getCriteria = (searchArgs, userId) =>
  Map({
    ids: searchArgs.has('shoppingListIds') ? searchArgs.get('shoppingListIds') : undefined,
    conditions: Map({
      userId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      status: 'A',
    }),
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

const getShoppingListCountMatchCriteria = async (searchArgs, userId, sessionToken) =>
  new ShoppingListService().count(addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption')), sessionToken);

const getShoppingListMatchCriteria = async (searchArgs, userId, sessionToken, limit, skip) =>
  new ShoppingListService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getShoppingLists = async (searchArgs, dataLoaders, sessionToken) => {
  const { userDefaultShoppingListLoader, userLoaderBySessionToken } = dataLoaders;
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  let count = await getShoppingListCountMatchCriteria(searchArgs, userId, sessionToken);

  // Creating the default shopping list if no shopping list exists
  if (count === 0) {
    await userDefaultShoppingListLoader.load(createSessionTokenAndUserIdKeyCombination(sessionToken, userId));

    count = 1;
  }

  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const shoppingLists = await getShoppingListMatchCriteria(searchArgs, userId, sessionToken, limit, skip);
  const indexedShoppingLists = shoppingLists.zip(Range(skip, skip + limit));
  const edges = indexedShoppingLists.map(indexedItem => ({
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
  name: 'ShoppingList',
  nodeType: ShoppingList,
});
