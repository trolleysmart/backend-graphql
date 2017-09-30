// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import TagConnection, { getTags } from './TagConnection';
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
      resolve: async (_, args, request) => getTags(Immutable.fromJS(args), request.headers.authorization),
    },
    stores: {
      type: StoreConnection.connectionType,
      args: {
        ...connectionArgs,
        name: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, request) => getStores(Immutable.fromJS(args), request.headers.authorization),
    },
  },
  interfaces: [NodeInterface],
});
