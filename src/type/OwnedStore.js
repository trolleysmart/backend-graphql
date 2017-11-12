// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import GeoLocation from './GeoLocation';
import OpeningHours from './OpeningHours';
import Phone from './Phone';
import { NodeInterface } from '../interface';

const ParentOwnedStore = new GraphQLObjectType({
  name: 'ParentOwnedStore',
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
      resolve: async (_) => {
        if (!_.has('id')) {
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
    phones: {
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
  name: 'OwnedStore',
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
      resolve: async (_) => {
        if (!_.has('id')) {
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
    phones: {
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
      type: ParentOwnedStore,
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
