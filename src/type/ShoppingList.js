// @flow

import Immutable, { Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { DefaultShoppingListService, ShoppingListService } from 'trolley-smart-parse-server-common';
import { NodeInterface } from '../interface';
import ShoppingListItemConnection, { getShoppingListItems } from './ShoppingListItemConnection';
import { addShoppingList, setUserDefaultShoppingList } from '../mutation';

export const createUserDefaultShoppingList = async (dataLoaders, sessionToken) => {
  const shoppingListId = await addShoppingList('My List', dataLoaders, sessionToken);

  await setUserDefaultShoppingList(shoppingListId, dataLoaders, sessionToken);

  return shoppingListId;
};

export const getShoppingList = async (shoppingListId, sessionToken) => new ShoppingListService().read(shoppingListId, null, sessionToken);

export const getUserDefaultShoppingListId = async (dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const defaultShoppingLists = await new DefaultShoppingListService().search(Map({ conditions: Map({ userId }) }), sessionToken);

  if (defaultShoppingLists.isEmpty()) {
    return createUserDefaultShoppingList(dataLoaders, sessionToken);
  } else if (defaultShoppingLists.count() === 1) {
    return defaultShoppingLists.first().get('shoppingListId');
  }

  throw new Error('Multiple default shopping lists found.');
};

export const getUserDefaultShoppingList = async (dataLoaders, sessionToken) =>
  getShoppingList(await getUserDefaultShoppingListId(dataLoaders, sessionToken), sessionToken);

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
      resolve: async (_, args, { sessionToken, dataLoaders }) =>
        (await getShoppingListItems(Map({ first: 1000 }), _.get('id'), dataLoaders, sessionToken)).count,
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
      resolve: async (_, args, { sessionToken, dataLoaders }) => getShoppingListItems(Immutable.fromJS(args), _.get('id'), dataLoaders, sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
