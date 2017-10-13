// @flow

import Immutable, { Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { DefaultShoppingListService, ShoppingListService } from 'trolley-smart-parse-server-common';
import { NodeInterface } from '../interface';
import ShoppingListItemConnection, { getShoppingListItems } from './ShoppingListItemConnection';
import { addShoppingList, setUserDefaultShoppingList } from '../mutation';

export const createUserDefaultShoppingList = async (userLoaderBySessionToken, sessionToken) => {
  const shoppingListId = await addShoppingList('My List', userLoaderBySessionToken, sessionToken);

  await setUserDefaultShoppingList(shoppingListId, userLoaderBySessionToken, sessionToken);

  return shoppingListId;
};

export const getShoppingList = async (shoppingListId, sessionToken) => new ShoppingListService().read(shoppingListId, null, sessionToken);

export const getUserDefaultShoppingList = async (userLoaderBySessionToken, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const defaultShoppingListService = new DefaultShoppingListService();
  const defaultShoppingLists = await defaultShoppingListService.search(Map({ conditions: Map({ userId }) }), sessionToken);

  if (defaultShoppingLists.isEmpty()) {
    return getShoppingList(await createUserDefaultShoppingList(userLoaderBySessionToken, sessionToken), sessionToken);
  } else if (defaultShoppingLists.count() === 1) {
    return getShoppingList(defaultShoppingLists.first().getId(), sessionToken);
  }

  throw new Error('Multiple default shopping lists found.');
};

export default new GraphQLObjectType({
  name: 'ShoppingList',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    totalItemsCount: {
      type: GraphQLInt,
      resolve: async (_, args, request) => (await getShoppingListItems(Map({ first: 1000 }), _.get('id'), request.headers.authorization)).count,
    },
    shoppingListItems: {
      type: ShoppingListItemConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        addedByUserId: {
          type: GraphQLID,
        },
        tagKeys: {
          type: new GraphQLList(GraphQLString),
        },
        storeKeys: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: async (_, args, request) => getShoppingListItems(Immutable.fromJS(args), _.get('id'), request.headers.authorization),
    },
  },
  interfaces: [NodeInterface],
});
