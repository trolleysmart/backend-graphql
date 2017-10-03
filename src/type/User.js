// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import ShoppingList, { getShoppingList } from './ShoppingList';
import ShoppingListConnection, { getShoppingLists } from './ShoppingListConnection';
import ShoppingListItemConnection, { getShoppingListItems } from './ShoppingListItemConnection';
import Product, { getProduct } from './Product';
import ProductConnection, { getProducts } from './ProductConnection';
import StapleItemConnection, { getStapleItems } from './StapleItemConnection';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    shoppingLists: {
      type: ShoppingListConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        shoppingListIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
      },
      resolve: async (_, args, request) => getShoppingLists(Immutable.fromJS(args), _.get('id'), request.headers.authorization),
    },
    shoppingList: {
      type: ShoppingList,
      args: {
        shoppingListId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { shoppingListId }, request) => getShoppingList(shoppingListId, request.headers.authorization),
    },
    shoppingListItems: {
      type: ShoppingListItemConnection.connectionType,
      args: {
        ...connectionArgs,
        shoppingListId: {
          type: new GraphQLNonNull(GraphQLID),
        },
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
      resolve: async (_, args, request) => getShoppingListItems(Immutable.fromJS(args), args.shoppingListId, request.headers.authorization),
    },
    stapleItems: {
      type: StapleItemConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        tagKeys: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: async (_, args, request) => getStapleItems(Immutable.fromJS(args), _.get('id'), request.headers.authorization),
    },
    products: {
      type: ProductConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
        tagKeys: {
          type: new GraphQLList(GraphQLString),
        },
        storeKeys: {
          type: new GraphQLList(GraphQLString),
        },
        special: {
          type: GraphQLBoolean,
        },
      },
      resolve: async (_, args, request) => getProducts(Immutable.fromJS(args), request.headers.authorization),
    },
    product: {
      type: Product,
      args: {
        productId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { productId }, request) => getProduct(productId, request.headers.authorization),
    },
  },
  interfaces: [NodeInterface],
});
