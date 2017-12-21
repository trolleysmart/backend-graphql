// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { StoreService } from '@trolleysmart/parse-server-common';
import uuid from 'uuid/v4';

export const addStoreForProvidedUser = async (name, address, googleMapUrl, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new StoreService().create(
    Map({
      key: uuid(),
      name,
      address,
      googleMapUrl,
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
