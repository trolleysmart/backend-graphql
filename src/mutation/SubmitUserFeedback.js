// @flow

import Immutable, { Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { UserFeedbackService } from '@trolleysmart/parse-server-common';

export default mutationWithClientMutationId({
  name: 'SubmitUserFeedback',
  inputFields: {
    feedback: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
  },
  mutateAndGetPayload: async ({ feedback }, { sessionToken, dataLoaders }) => {
    try {
      const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);
      const acl = ParseWrapperService.createACL(user);

      await new UserFeedbackService().create(Map({ userId: user.id, feedback: Immutable.fromJS(JSON.parse(feedback)) }), acl, sessionToken);

      return Map();
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
