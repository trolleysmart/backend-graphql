// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { setUserDefaultShoppingList } from './ShoppingListHelper';
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
  },
  mutateAndGetPayload: async ({ shoppingListId }, request) => {
    try {
      const sessionToken = request.headers.authorization;
      const userLoaderBySessionToken = createUserLoaderBySessionToken();

      await setUserDefaultShoppingList(shoppingListId, userLoaderBySessionToken, sessionToken);

      return Map();
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
