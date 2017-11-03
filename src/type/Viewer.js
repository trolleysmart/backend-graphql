// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import TagConnection, { getTags } from './TagConnection';
import Store, { getStore } from './Store';
import StoreConnection, { getStores } from './StoreConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    tags: {
      type: TagConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        forDisplay: {
          type: GraphQLBoolean,
        },
      },
      resolve: async (_, args, { sessionToken }) => getTags(Immutable.fromJS(args), sessionToken),
    },
    store: {
      type: Store,
      args: {
        storeId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { storeId }, { dataLoaders }) => getStore(storeId, dataLoaders),
    },
    stores: {
      type: StoreConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        forDisplay: {
          type: GraphQLBoolean,
        },
      },
      resolve: async (_, args, { sessionToken }) => getStores(Immutable.fromJS(args), sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
