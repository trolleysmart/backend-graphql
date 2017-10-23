// @flow

import Dataloader from 'dataloader';
import { UserService } from 'micro-business-parse-server-common';
import { DefaultShoppingListService } from 'trolley-smart-parse-server-common';
import { addShoppingListForProvidedUser, setUserDefaultShoppingListForProvidedUser } from '../mutation';

const sessionTokenAndUserIdSeparator = '76ae3866-6977-411c-8443-d711ba8b86d3';

const createUserDefaultShoppingList = async (user, sessionToken) => {
  const shoppingListId = await addShoppingListForProvidedUser('My List', user, sessionToken);

  await setUserDefaultShoppingListForProvidedUser(shoppingListId, user, sessionToken);

  return shoppingListId;
};

const getSessionTokenAndUserIdFromKeyCombination = (key) => {
  const results = key.split(sessionTokenAndUserIdSeparator);

  return {
    sessionToken: results[0],
    userId: results[1],
  };
};

export const createSessionTokenAndUserIdKeyCombination = (sessionToken, userId) => sessionToken + sessionTokenAndUserIdSeparator + userId;

const createUserDefaultShoppingListLoader = () =>
  new Dataloader(async keys =>
    Promise.all(keys.map(async (key) => {
      const { sessionToken, userId } = getSessionTokenAndUserIdFromKeyCombination(key);
      const defaultShoppingLists = await new DefaultShoppingListService().search(Map({ conditions: Map({ userId }) }), sessionToken);

      if (defaultShoppingLists.isEmpty()) {
        const user = await UserService.getUserForProvidedSessionToken(sessionToken);

        return createUserDefaultShoppingList(user, sessionToken);
      } else if (defaultShoppingLists.count() === 1) {
        return defaultShoppingLists.first().get('shoppingListId');
      }

      throw new Error('Multiple default shopping lists found.');
    })));

export default createUserDefaultShoppingListLoader;
