// @flow

import Immutable, { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { DefaultShoppingListService, ShoppingListService, ShoppingListItemService } from '@trolleysmart/parse-server-common';

const getShoppingListItemById = async (id, sessionToken) => new ShoppingListItemService().read(id, null, sessionToken);

const getAllShoppingListItemsContainProvidedProductPrice = async (productPriceId, shoppingListId, sessionToken) =>
  new ShoppingListItemService().search(Map({ conditions: Map({ productPriceId, shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken);

const getAllShoppingListItemsContainProvidedStapleItem = async (stapleItemId, shoppingListId, sessionToken) =>
  new ShoppingListItemService().search(Map({ conditions: Map({ stapleItemId, shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken);

export const getShoppingListById = async (id, sessionToken) => new ShoppingListService().read(id, null, sessionToken);

export const removeItemsFromShoppingList = async (shoppingListItemIds, dataLoaders, shoppingListId, sessionToken) => {
  if (shoppingListItemIds.isEmpty()) {
    return;
  }

  const shoppingListItemsPromises = shoppingListItemIds.map(id => getShoppingListItemById(id, sessionToken)).toArray();
  const allShoppingListItems = Immutable.fromJS(await Promise.all(shoppingListItemsPromises));
  const shoppingListItems = allShoppingListItems.filter(item => item.get('shoppingListId').localeCompare(shoppingListId) === 0);
  const productPriceIds = shoppingListItems
    .filter(_ => _.get('productPriceId'))
    .map(_ => _.get('productPriceId'))
    .groupBy(_ => _)
    .map(_ => _.first())
    .valueSeq()
    .toList();
  const stapleItemIds = shoppingListItems
    .filter(_ => _.get('stapleItemId'))
    .map(_ => _.get('stapleItemId'))
    .groupBy(_ => _)
    .map(_ => _.first())
    .valueSeq()
    .toList();

  const shoppingListItemService = new ShoppingListItemService();

  if (!productPriceIds.isEmpty()) {
    const itemsToRemovePromises = productPriceIds
      .map(productPriceId => getAllShoppingListItemsContainProvidedProductPrice(productPriceId, shoppingListId, sessionToken))
      .toArray();
    const itemsToRemove = Immutable.fromJS(await Promise.all(itemsToRemovePromises)).flatMap(_ => _);

    const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
    await Promise.all(itemsToRemove.map(item => shoppingListItemService.update(item.set('removedByUserId', userId), sessionToken)).toArray());
  }

  if (!stapleItemIds.isEmpty()) {
    const itemsToRemovePromises = stapleItemIds
      .map(stapleItemId => getAllShoppingListItemsContainProvidedStapleItem(stapleItemId, shoppingListId, sessionToken))
      .toArray();
    const itemsToRemove = Immutable.fromJS(await Promise.all(itemsToRemovePromises)).flatMap(_ => _);

    const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
    await Promise.all(itemsToRemove.map(item => shoppingListItemService.update(item.set('removedByUserId', userId), sessionToken)).toArray());
  }
};

export const addShoppingListForProvidedUser = async (name, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new ShoppingListService().create(Map({ name, user, status: 'A' }), acl, sessionToken);
};

export const addShoppingList = async (name, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addShoppingListForProvidedUser(name, user, sessionToken);
};

export const updateShoppingList = async (shoppingListId, name, sessionToken) => {
  const shoppingListService = new ShoppingListService();
  const shoppingList = await shoppingListService.read(shoppingListId, null, sessionToken);

  if (!name) {
    return shoppingList;
  }

  return shoppingListService.update(shoppingList.set('name', name), sessionToken);
};

export const removeShoppingList = async (shoppingListId, sessionToken) => {
  const shoppingListService = new ShoppingListService();
  const shoppingList = await shoppingListService.read(shoppingListId, null, sessionToken);

  return shoppingListService.update(shoppingList.set('status', 'I'), sessionToken);
};

export const setUserDefaultShoppingListForProvidedUser = async (shoppingListId, user, sessionToken) => {
  const defaultShoppingListService = new DefaultShoppingListService();
  const defaultShoppingLists = await defaultShoppingListService.search(Map({ conditions: Map({ userId: user.id }) }), sessionToken);

  if (defaultShoppingLists.isEmpty()) {
    return defaultShoppingListService.create(Map({ user, shoppingListId }), ParseWrapperService.createACL(user), sessionToken);
  } else if (defaultShoppingLists.count() === 1) {
    return defaultShoppingListService.update(defaultShoppingLists.first().set('shoppingListId', shoppingListId), sessionToken);
  }

  throw new Error('Multiple default shopping lists found.');
};

export const setUserDefaultShoppingList = async (shoppingListId, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return setUserDefaultShoppingListForProvidedUser(shoppingListId, user, sessionToken);
};
