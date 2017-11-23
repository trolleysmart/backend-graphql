// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StoreService } from 'trolley-smart-parse-server-common';
import uuid from 'uuid/v4';

export const addStoreForProvidedUser = async (name, address, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new StoreService().create(
    Map({
      key: uuid(),
      name,
      address,
      forDisplay: true,
      ownedByUser: user,
      status: 'I',
    }),
    acl,
    sessionToken,
  );
};

export const addStore = async (name, address, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addStoreForProvidedUser(name, address, user, sessionToken);
};