// @flow

import Dataloader from 'dataloader';
import { UserService } from 'micro-business-parse-server-common';
import { DefaultShoppingListService } from 'trolley-smart-parse-server-common';
import { addShoppingListForProvidedUser, setUserDefaultShoppingListForProvidedUser } from '../mutation';

export const createUserDefaultShoppingList = async (user, sessionToken) => {
  const shoppingListId = await addShoppingListForProvidedUser('My List', user, sessionToken);

  await setUserDefaultShoppingListForProvidedUser(shoppingListId, user, sessionToken);

  return shoppingListId;
};

const createUserDefaultShoppingListLoader = () =>
  new Dataloader(async sessionTokens =>
    Promise.all(sessionTokens.map(async (sessionToken) => {
      const user = await UserService.getUserForProvidedSessionToken(sessionToken);
      const defaultShoppingLists = await new DefaultShoppingListService().search(Map({ conditions: Map({ userId: user.id }) }), sessionToken);

      if (defaultShoppingLists.isEmpty()) {
        return createUserDefaultShoppingList(user, sessionToken);
      } else if (defaultShoppingLists.count() === 1) {
        return defaultShoppingLists.first().get('shoppingListId');
      }

      throw new Error('Multiple default shopping lists found.');
    })));

export default createUserDefaultShoppingListLoader;
