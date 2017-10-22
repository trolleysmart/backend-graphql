// @flow

import { Map } from 'immutable';
import { GraphQLObjectType } from 'graphql';
import ViewerType from './Viewer';
import UserType from './User';
import { NodeField } from '../interface';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      resolve: async (_, args, { sessionToken, dataLoaders }) => {
        const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;

        return Map({ id: userId });
      },
    },
    viewer: {
      type: ViewerType,
      resolve: () => Map({ id: 'ViewerId' }),
    },
    node: NodeField,
  },
});
