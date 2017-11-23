// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OwnedStoreConnection, getOwnedStores } from '../type';
import { addStore } from './StoreHelper';

export default mutationWithClientMutationId({
  name: 'AddStore',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    store: {
      type: OwnedStoreConnection.edgeType,
      resolve: _ => _.get('ownedStore'),
    },
  },
  mutateAndGetPayload: async ({ name, address }, { sessionToken, dataLoaders }) => {
    try {
      const storeId = await addStore(name, address, dataLoaders, sessionToken);

      return Map({
        ownedStore: (await getOwnedStores(Map({ ownedStoreIds: List.of(storeId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
