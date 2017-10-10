// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ShoppingListConnection, getShoppingLists } from '../type';
import { addShoppingList } from './ShoppingListHelper';
import { createUserLoaderBySessionToken } from '../loader';

export default mutationWithClientMutationId({
  name: 'AddShoppingList',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    shoppingList: {
      type: ShoppingListConnection.edgeType,
      resolve: _ => _.get('shoppingList'),
    },
  },
  mutateAndGetPayload: async ({ name }, request) => {
    try {
      const sessionToken = request.headers.authorization;
      const userLoaderBySessionToken = createUserLoaderBySessionToken();
      const shoppingListId = await addShoppingList(name, userLoaderBySessionToken, sessionToken);

      return Map({
        shoppingList: (await getShoppingLists(Map({ shoppingListIds: List.of(shoppingListId) }), userLoaderBySessionToken, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
