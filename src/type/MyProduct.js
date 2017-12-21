// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { MyProductService } from '@trolleysmart/parse-server-common';
import { NodeInterface } from '../interface';
import Tag from './Tag';

export const getMyProduct = async (myProductId, sessionToken) => new MyProductService().read(myProductId, Map({ include_tags: true }), sessionToken);

export default new GraphQLObjectType({
  name: 'MyProduct',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
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
    barcode: {
      type: GraphQLString,
      resolve: _ => _.get('barcode'),
    },
    size: {
      type: GraphQLString,
      resolve: _ => _.get('size'),
    },
    productPageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('productPageUrl'),
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: _ => _.get('tags'),
    },
  },
  interfaces: [NodeInterface],
});
