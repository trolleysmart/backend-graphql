// @flow

import Immutable, { List, Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import GeoLocation from './GeoLocation';
import OpeningHours from './OpeningHours';
import Phone from './Phone';
import { NodeInterface } from '../interface';

const getAllStoresToFilterByUsingId = async (storeIds, dataLoaders) => {
  if (storeIds.isEmpty()) {
    return List();
  }

  let storesToFilterBy = List();
  const { storeLoaderById } = dataLoaders;
  const stores = Immutable.fromJS(await storeLoaderById.loadMany(storeIds.toJS()));

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
  const { storeLoaderByKey } = dataLoaders;
  const stores = Immutable.fromJS(await storeLoaderByKey.loadMany(storeKeys.toJS()));

  storesToFilterBy = storesToFilterBy.concat(stores);

  const storesWithParentStores = stores.filter(store => store.get('parentStoreId'));

  if (!storesWithParentStores.isEmpty()) {
    const storesWithParentToAdd = await getAllStoresToFilterByUsingId(storesWithParentStores.map(store => store.get('parentStoreId')), dataLoaders);

    storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);
  }

  return storesToFilterBy;
};

export const getStore = async (storeId, dataLoaders) => dataLoaders.storeLoaderById.load(storeId);

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

        const { storeLoaderById, configLoader } = dataLoaders;
        const storeKey = (await storeLoaderById.load(_.get('id'))).get('key');
        const productSearchConfig = await configLoader.load('productSearch');

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
    openingHours: {
      type: OpeningHours,
      resolve: (_) => {
        const from = _.get('openFrom');
        const until = _.get('openUntil');

        if (!from || !until) {
          return null;
        }

        return Map({ from, until });
      },
    },
    phone: {
      type: new GraphQLList(new GraphQLNonNull(Phone)),
      resolve: (_) => {
        const phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
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

        const { storeLoaderById, configLoader } = dataLoaders;
        const storeKey = (await storeLoaderById.load(_.get('id'))).get('key');
        const productSearchConfig = await configLoader.load('productSearch');

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
    openingHours: {
      type: OpeningHours,
      resolve: (_) => {
        const from = _.get('openFrom');
        const until = _.get('openUntil');

        if (!from || !until) {
          return null;
        }

        return Map({ from, until });
      },
    },
    phone: {
      type: new GraphQLList(new GraphQLNonNull(Phone)),
      resolve: (_) => {
        const phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      },
    },
    parentStore: {
      type: ParentStore,
      resolve: (_, args, { dataLoaders }) => {
        const parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return dataLoaders.storeLoaderById.load(parentStoreId);
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
