// @flow

import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import { tagLoaderById } from '../loader';

const ParentTag = new GraphQLObjectType({
  name: 'ParentTag',
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
    description: {
      type: GraphQLString,
      resolve: _ => _.get('description'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: _ => _.get('forDisplay'),
    },
  },
  interfaces: [NodeInterface],
});

const Tag = new GraphQLObjectType({
  name: 'Tag',
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
    description: {
      type: GraphQLString,
      resolve: _ => _.get('description'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: _ => _.get('forDisplay'),
    },
    parentTag: {
      type: ParentTag,
      resolve: (_) => {
        const parentTagId = _.get('parentTagId');

        if (parentTagId) {
          return tagLoaderById.load(parentTagId);
        }

        const parentTag = _.get('parentTag');

        if (parentTag) {
          return parentTag;
        }

        return null;
      },
    },
  },
  interfaces: [NodeInterface],
});

export default Tag;
