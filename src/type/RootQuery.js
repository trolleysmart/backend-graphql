// @flow

import { Map } from 'immutable';
import { GraphQLObjectType } from 'graphql';
import ViewerType from './Viewer';
import UserType from './User';
import { NodeField } from '../interface';
import { createUserLoaderBySessionToken } from '../loader';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      resolve: async (_, args, request) => {
        const userLoaderBySessionToken = createUserLoaderBySessionToken();
        const userId = (await userLoaderBySessionToken.load(request.headers.authorization)).id;

        return Map({ id: userId, dataLoaders: Map({ userLoaderBySessionToken }) });
      },
    },
    viewer: {
      type: ViewerType,
      resolve: () => Map({ id: 'ViewerId' }),
    },
    node: NodeField,
  },
});
