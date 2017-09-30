// @flow

import { GraphQLID, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import MultiBuy from './MultiBuy';
import UnitPrice from './UnitPrice';
import Tag from './Tag';
import Store from './Store';

export default new GraphQLObjectType({
  name: 'ShoppingListItem',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    itemType: {
      type: GraphQLString,
      resolve: _ => _.get('itemType'),
    },
    stapleItemId: {
      type: GraphQLID,
      resolve: _ => _.get('stapleItemId'),
    },
    productPriceId: {
      type: GraphQLID,
      resolve: _ => _.get('productPriceId'),
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
      resolve: _ => (_.get('stapleItemId') ? _.get('imageUrl') : _.getIn(['productPrice', 'imageUrl'])),
    },
    barcode: {
      type: GraphQLString,
      resolve: _ => _.getIn(['productPrice', 'barcode']),
    },
    size: {
      type: GraphQLString,
      resolve: _ => _.getIn(['productPrice', 'size']),
    },
    productPageUrl: {
      type: GraphQLString,
      resolve: _ => _.getIn(['productPrice', 'productPageUrl']),
    },
    specialType: {
      type: GraphQLString,
      resolve: _ => _.getIn(['productPrice', 'specialType']),
    },
    priceToDisplay: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['productPrice', 'priceToDisplay']),
    },
    saving: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['productPrice', 'saving']),
    },
    savingPercentage: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['productPrice', 'savingPercentage']),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['productPrice', 'priceDetails', 'currentPrice']),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['productPrice', 'priceDetails', 'wasPrice']),
    },
    multiBuy: {
      type: MultiBuy,
      resolve: _ => _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']),
    },
    unitPrice: {
      type: UnitPrice,
      resolve: _ => _.getIn(['productPrice', 'priceDetails', 'unitPrice']),
    },
    offerEndDate: {
      type: GraphQLString,
      resolve: (_) => {
        const offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : undefined;
      },
    },
    quantity: {
      type: GraphQLInt,
      resolve: _ => _.get('quantity'),
    },
    comments: {
      type: GraphQLString,
      resolve: _ => _.get('comments'),
    },
    store: {
      type: Store,
      resolve: _ => _.get('store'),
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: _ => _.get('tags'),
    },
  },
  interfaces: [NodeInterface],
});
