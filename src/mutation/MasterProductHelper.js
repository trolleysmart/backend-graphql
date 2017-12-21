// @flow

import { Map } from 'immutable';
import { MasterProductService } from '@trolleysmart/parse-server-common';

export const addMasterProductForProvidedUser = async (name, description, barcode, size, sessionToken) =>
  new MasterProductService().create(
    Map({
      name,
      description,
      barcode,
      size,
    }),
    null,
    sessionToken,
  );

export const addMasterProduct = async (name, description, barcode, size, sessionToken) =>
  addMasterProductForProvidedUser(name, description, barcode, size, sessionToken);
