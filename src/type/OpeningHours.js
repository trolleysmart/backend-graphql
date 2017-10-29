// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';
import moment from 'moment';

export default new GraphQLObjectType({
  name: 'OpeningHours',
  fields: {
    from: {
      type: GraphQLString,
      resolve: _ => moment(_.get('from')).format('LT'),
    },
    until: {
      type: GraphQLString,
      resolve: _ => moment(_.get('until')).format('LT'),
    },
  },
});
