// @flow

import Immutable, { List, Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { getShoppingListById, removeItemsFromShoppingList } from './ShoppingListHelper';
import { createUserLoaderBySessionToken } from '../loader';

export default mutationWithClientMutationId({
  name: 'RemoveItemsFromShoppingList',
  inputFields: {
    shoppingListId: { type: new GraphQLNonNull(GraphQLID) },
    shoppingListItemIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
  },
  mutateAndGetPayload: async ({ shoppingListId, shoppingListItemIds }, request) => {
    try {
      const sessionToken = request.headers.authorization;

      // Trying to read the shopping list to make sure user has access to...
      await getShoppingListById(shoppingListId, sessionToken);

      const userLoaderBySessionToken = createUserLoaderBySessionToken();

      await removeItemsFromShoppingList(
        shoppingListItemIds ? Immutable.fromJS(shoppingListItemIds) : List(),
        userLoaderBySessionToken,
        shoppingListId,
        sessionToken,
      );

      return Map();
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
