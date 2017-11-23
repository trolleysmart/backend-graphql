// @flow

import { GraphQLObjectType } from 'graphql';
import addItemsToShoppingList from './AddItemsToShoppingList';
import addMasterProduct from './AddMasterProduct';
import addMyProduct from './AddMyProduct';
import addShoppingList from './AddShoppingList';
import addStore from './AddStore';
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
    addMasterProduct,
    addMyProduct,
    addStore,
    removeItemsFromShoppingList,
    removeShoppingList,
    setUserDefaultShoppingList,
    submitUserFeedback,
    updateShoppingList,
  },
});
