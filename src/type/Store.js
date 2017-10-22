// @flow

import Immutable, { List, Map } from 'immutable';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import GeoLocation from './GeoLocation';
import { NodeInterface } from '../interface';

const getAllStoresToFilterByUsingId = async (storeIds, dataLoaders) => {
  if (storeIds.isEmpty()) {
    return List();
  }

  let storesToFilterBy = List();
  const stores = Immutable.fromJS(await dataLoaders.get('storeLoaderById').loadMany(storeIds.toJS()));

  storesToFilterBy = storesToFilterBy.concat(stores);

  const storesWithParentStores = stores.filter(store => store.get('parentStoreId'));

  if (!storesWithParentStores.isEmpty()) {
    const storesWithParentToAdd = await getAllStoresToFilterByUsingId(storesWithParentStores.map(store => store.get('parentStoreId')), dataLoaders);

    storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);
  }

  return storesToFilterBy;
};

export const getAllStoresToFilterBy = async (storeKeys, dataLoaders) => {
  let storesToFilterBy = List();
  const stores = Immutable.fromJS(await dataLoaders.get('storeLoaderByKey').loadMany(storeKeys.toJS()));

  storesToFilterBy = storesToFilterBy.concat(stores);

  const storesWithParentStores = stores.filter(store => store.get('parentStoreId'));

  if (!storesWithParentStores.isEmpty()) {
    const storesWithParentToAdd = await getAllStoresToFilterByUsingId(storesWithParentStores.map(store => store.get('parentStoreId')), dataLoaders);

    storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);
  }

  return storesToFilterBy;
};

export const getStore = async (storeId, dataLoaders) => dataLoaders.get('storeLoaderById').load(storeId);

const ParentStore = new GraphQLObjectType({
  name: 'ParentStore',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: _ => _.get('key'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders }) => {
        if (!_.has('id')) {
          return '';
        }

        const storeKey = (await dataLoaders.get('storeLoaderById').load(_.get('id'))).get('key');
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeStoreLogos').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.get('imageUrl');
      },
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
    geoLocation: {
      type: GeoLocation,
      resolve: (_) => {
        const geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return Map({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      },
    },
  },
  interfaces: [NodeInterface],
});

export default new GraphQLObjectType({
  name: 'Store',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: _ => _.get('key'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders }) => {
        if (!_.has('id')) {
          return '';
        }

        const storeKey = (await dataLoaders.get('storeLoaderById').load(_.get('id'))).get('key');
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeStoreLogos').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.get('imageUrl');
      },
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
    geoLocation: {
      type: GeoLocation,
      resolve: (_) => {
        const geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return Map({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      },
    },
    parentStore: {
      type: ParentStore,
      resolve: (_, args, { dataLoaders }) => {
        const parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return dataLoaders.get('storeLoaderById').load(parentStoreId);
        }

        const parentStore = _.get('parentStore');

        if (parentStore) {
          return parentStore;
        }

        return null;
      },
    },
  },
  interfaces: [NodeInterface],
});
