// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { ShoppingListService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import ShoppingList from './ShoppingList';

const getCriteria = (searchArgs, userId) =>
  Map({
    ids: searchArgs.has('shoppingListIds') ? searchArgs.get('shoppingListIds') : undefined,
    orderByFieldAscending: 'name',
    conditions: Map({
      userId,
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      status: 'A',
    }),
  });

const getShoppingListCountMatchCriteria = async (searchArgs, userId, sessionToken) =>
  new ShoppingListService().count(getCriteria(searchArgs, userId), sessionToken);

const getShoppingListMatchCriteria = async (searchArgs, userId, sessionToken, limit, skip) =>
  new ShoppingListService().search(
    getCriteria(searchArgs, userId)
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
    userDefaultShoppingListLoader.load(sessionToken);
    count = 1;
  }

  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(searchArgs, count, 10, 1000);
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
