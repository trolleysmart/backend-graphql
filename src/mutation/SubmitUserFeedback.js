// @flow

import Immutable, { Map } from 'immutable';
import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { UserFeedbackService } from 'trolley-smart-parse-server-common';
import { createUserLoaderBySessionToken } from '../loader';

export default mutationWithClientMutationId({
  name: 'SubmitUserFeedback',
  inputFields: {
    feedback: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ feedback }, request) => {
    const sessionToken = request.headers.authorization;
    const userLoaderBySessionToken = createUserLoaderBySessionToken();
    const user = await userLoaderBySessionToken.load(sessionToken);
    const acl = ParseWrapperService.createACL(user);

    return new UserFeedbackService().create(Map({ userId: user.id, feedback: Immutable.fromJS(JSON.parse(feedback)) }), acl, sessionToken);
  },
});
