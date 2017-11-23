// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { MyProductService } from 'trolley-smart-parse-server-common';

export const addMyProductForProvidedUser = async (name, description, barcode, productPageUrl, size, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new MyProductService().create(
    Map({
      name,
      description,
      barcode,
      productPageUrl,
      size,
      ownedByUser: user,
    }),
    acl,
    sessionToken,
  );
};

export const addMyProduct = async (name, description, barcode, productPageUrl, size, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addMyProductForProvidedUser(name, description, barcode, productPageUrl, size, user, sessionToken);
};
