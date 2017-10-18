// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { setUserDefaultShoppingList } from './ShoppingListHelper';
import { ShoppingListItemConnection, getShoppingListItems } from '../type';
import { createUserLoaderBySessionToken } from '../loader';

export default mutationWithClientMutationId({
  name: 'SetUserDefaultShoppingList',
  inputFields: {
    shoppingListId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
    },
    shoppingListItems: {
      type: new GraphQLList(ShoppingListItemConnection.edgeType),
      resolve: _ => _.get('shoppingListItems'),
    },
  },
  mutateAndGetPayload: async ({ shoppingListId }, request) => {
    try {
      const sessionToken = request.headers.authorization;
      const userLoaderBySessionToken = createUserLoaderBySessionToken();

      await setUserDefaultShoppingList(shoppingListId, userLoaderBySessionToken, sessionToken);

      const shoppingListItems = (await getShoppingListItems(Map({ first: 1000 }), shoppingListId, sessionToken)).edges;

      return Map({ shoppingListItems });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
