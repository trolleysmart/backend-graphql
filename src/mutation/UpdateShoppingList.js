// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ShoppingListConnection, getShoppingLists } from '../type';
import { updateShoppingList } from './ShoppingListHelper';

export default mutationWithClientMutationId({
  name: 'UpdateShoppingList',
  inputFields: {
    shoppingListId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
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
  mutateAndGetPayload: async ({ shoppingListId, name }, { request, dataLoaders }) => {
    try {
      const sessionToken = request.headers.authorization;

      await updateShoppingList(shoppingListId, name, sessionToken);

      return Map({
        shoppingList: (await getShoppingLists(Map({ shoppingListIds: List.of(shoppingListId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
