// @flow

import Immutable, { List, Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { getShoppingListById, removeItemsFromShoppingList } from './ShoppingListHelper';

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
  mutateAndGetPayload: async ({ shoppingListId, shoppingListItemIds }, { sessionToken, dataLoaders }) => {
    try {
      // Trying to read the shopping list to make sure user has access to...
      await getShoppingListById(shoppingListId, sessionToken);

      await removeItemsFromShoppingList(
        shoppingListItemIds ? Immutable.fromJS(shoppingListItemIds) : List(),
        dataLoaders,
        shoppingListId,
        sessionToken,
      );

      return Map();
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
