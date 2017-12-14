// @flow

import Immutable, { Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { ShoppingListService } from 'trolley-smart-parse-server-common';
import { NodeInterface } from '../interface';
import ShoppingListItemConnection, { getShoppingListItems } from './ShoppingListItemConnection';
import { createSessionTokenAndUserIdKeyCombination } from '../loaders';

export const getShoppingList = async (shoppingListId, sessionToken) => new ShoppingListService().read(shoppingListId, null, sessionToken);

export const getUserDefaultShoppingList = async (dataLoaders, sessionToken) => {
  const { userDefaultShoppingListLoader, userLoaderBySessionToken } = dataLoaders;
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;

  return getShoppingList(await userDefaultShoppingListLoader.load(createSessionTokenAndUserIdKeyCombination(sessionToken, userId)), sessionToken);
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
