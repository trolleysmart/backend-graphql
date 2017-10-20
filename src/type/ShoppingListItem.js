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
      resolve: (_) => {
        if (_.get('stapleItemId')) {
          return _.get('imageUrl');
        }

        if (!_.hasIn(['productPrice', 'imageUrl'])) {
          return undefined;
        }

        return _.getIn(['productPrice', 'imageUrl']);
      },
    },
    barcode: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'barcode']) ? _.getIn(['productPrice', 'barcode']) : undefined),
    },
    size: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'size']) ? _.getIn(['productPrice', 'size']) : undefined),
    },
    productPageUrl: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'productPageUrl']) ? _.getIn(['productPrice', 'productPageUrl']) : undefined),
    },
    specialType: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'specialType']) ? _.getIn(['productPrice', 'specialType']) : undefined),
    },
    priceToDisplay: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'priceToDisplay']) ? _.getIn(['productPrice', 'priceToDisplay']) : undefined),
    },
    saving: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'saving']) ? _.getIn(['productPrice', 'saving']) : undefined),
    },
    savingPercentage: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'savingPercentage']) ? _.getIn(['productPrice', 'savingPercentage']) : undefined),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: _ =>
        (_.hasIn(['productPrice', 'priceDetails', 'currentPrice']) ? _.getIn(['productPrice', 'priceDetails', 'currentPrice']) : undefined),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'wasprice']) ? _.getIn(['productPrice', 'priceDetails', 'wasPrice']) : undefined),
    },
    multiBuy: {
      type: MultiBuy,
      resolve: _ =>
        (_.hasIn(['productPrice', 'priceDetails', 'multiBuyInfo']) ? _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']) : undefined),
    },
    unitPrice: {
      type: UnitPrice,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'unitPrice']) ? _.getIn(['productPrice', 'priceDetails', 'unitPrice']) : undefined),
    },
    offerEndDate: {
      type: GraphQLString,
      resolve: (_) => {
        if (!_.hasIn(['productPrice', 'offerEndDate'])) {
          return undefined;
        }

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
