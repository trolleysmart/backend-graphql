// @flow

import { GraphQLObjectType } from 'graphql';
import addItemsToShoppingList from './AddItemsToShoppingList';
import addShoppingList from './AddShoppingList';
import removeItemsFromShoppingList from './RemoveItemsFromShoppingList';
import removeShoppingList from './RemoveShoppingList';
import submitUserFeedback from './SubmitUserFeedback';
import setUserDefaultShoppingList from './SetUserDefaultShoppingList';
import updateShoppingList from './UpdateShoppingList';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItemsToShoppingList,
    addShoppingList,
    removeItemsFromShoppingList,
    removeShoppingList,
    setUserDefaultShoppingList,
    submitUserFeedback,
    updateShoppingList,
  },
});
