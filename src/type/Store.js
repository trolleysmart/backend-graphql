// @flow

import Immutable, { List } from 'immutable';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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
  console.log(storeKeys);

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
