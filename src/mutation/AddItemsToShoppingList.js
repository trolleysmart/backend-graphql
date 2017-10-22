// @flow

import Immutable, { List, Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ShoppingListItemConnection, getShoppingListItems } from '../type';
import { getShoppingListById } from './ShoppingListHelper';
import addProductPricesToShoppingList from './ProductPriceHelper';
import { addStapleItemsToShoppingList, addNewStapleItemsToShoppingList } from './StapleItemHelper';

export default mutationWithClientMutationId({
  name: 'AddItemsToShoppingList',
  inputFields: {
    shoppingListId: { type: new GraphQLNonNull(GraphQLID) },
    productPriceIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
    stapleItemIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
    newStapleItemNames: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    shoppingListItems: {
      type: new GraphQLList(ShoppingListItemConnection.edgeType),
      resolve: _ => _.get('shoppingListItems'),
    },
  },
  mutateAndGetPayload: async ({
    shoppingListId, productPriceIds, stapleItemIds, newStapleItemNames,
  }, { sessionToken, dataLoaders }) => {
    try {
      // Trying to read the shopping list to make sure user has access to...
      await getShoppingListById(shoppingListId, sessionToken);

      const finalProductPriceIds = productPriceIds ? Immutable.fromJS(productPriceIds) : List();
      const finalStapleItemIds = stapleItemIds ? Immutable.fromJS(stapleItemIds) : List();
      const newShoppingListItemIds = Immutable.fromJS((await Promise.all([
        addProductPricesToShoppingList(finalProductPriceIds, dataLoaders, shoppingListId, sessionToken),
        addStapleItemsToShoppingList(finalStapleItemIds, dataLoaders, shoppingListId, sessionToken),
        addNewStapleItemsToShoppingList(
          newStapleItemNames ? Immutable.fromJS(newStapleItemNames) : List(),
          dataLoaders,
          shoppingListId,
          sessionToken,
        ),
      ]))[2]);
      const shoppingListItems = (await getShoppingListItems(Map({ first: 1000 }), shoppingListId, dataLoaders, sessionToken)).edges;
      const shoppingListItemsToReturn = shoppingListItems
        .filter(shoppingListItem => newShoppingListItemIds.find(id => id.localeCompare(shoppingListItem.node.get('id')) === 0))
        .concat(shoppingListItems.filter(shoppingListItem =>
          finalProductPriceIds.find(id => id.localeCompare(shoppingListItem.node.get('productPriceId')) === 0)))
        .concat(shoppingListItems.filter(shoppingListItem =>
          finalStapleItemIds.find(id => id.localeCompare(shoppingListItem.node.get('stapleItemId')) === 0)));

      return Map({ shoppingListItems: shoppingListItemsToReturn });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
