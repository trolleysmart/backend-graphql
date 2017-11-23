// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { MasterProductConnection, getMasterProducts } from '../type';
import { addMasterProduct } from './MasterProductHelper';

export default mutationWithClientMutationId({
  name: 'AddMasterProduct',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    barcode: { type: GraphQLString },
    size: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    masterProduct: {
      type: MasterProductConnection.edgeType,
      resolve: _ => _.get('masterProduct'),
    },
  },
  mutateAndGetPayload: async ({
    name, description, barcode, size,
  }, { sessionToken, dataLoaders }) => {
    try {
      const masterProductId = await addMasterProduct(name, description, barcode, size, sessionToken);

      return Map({
        masterProduct: (await getMasterProducts(Map({ masterProductIds: List.of(masterProductId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
