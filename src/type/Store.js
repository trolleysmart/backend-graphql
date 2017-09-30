// @flow

import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import { storeLoaderById } from '../loader';

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
      resolve: _ => _.get('imageUrl'),
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
  },
  interfaces: [NodeInterface],
});

const Store = new GraphQLObjectType({
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
      resolve: _ => _.get('imageUrl'),
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
    parentStore: {
      type: ParentStore,
      resolve: (_) => {
        const parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return storeLoaderById.load(parentStoreId);
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

export default Store;
