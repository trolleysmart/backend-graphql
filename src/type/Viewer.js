// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import TagConnection, { getTags } from './TagConnection';
import Store, { getStore } from './Store';
import StoreConnection, { getStores } from './StoreConnection';
import MasterProduct, { getMasterProduct } from './MasterProduct';
import MasterProductConnection, { getMasterProducts } from './MasterProductConnection';

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
    masterProducts: {
      type: MasterProductConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
        tagKeys: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: async (_, args, { sessionToken, dataLoaders }) => getMasterProducts(Immutable.fromJS(args), dataLoaders, sessionToken),
    },
    masterProduct: {
      type: MasterProduct,
      args: {
        masterProductId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { masterProductId }, { sessionToken }) => getMasterProduct(masterProductId, sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
