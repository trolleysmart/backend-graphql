// @flow

import Immutable from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import ShoppingListItem, { getShoppingListItems } from './ShoppingListItems';

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
      type: ShoppingListItem.ShoppingListItemConnectionDefinition.connectionType,
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
