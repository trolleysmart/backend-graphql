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
      resolve: async (_, args, { dataLoaders }) => {
        if (_.get('stapleItemId')) {
          return _.get('description');
        }

        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = await dataLoaders.get('storeLoaderById').load(_.get('storeId'));
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeProductsDescriptions').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.get('description');
      },
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders }) => {
        if (_.get('stapleItemId')) {
          return _.get('imageUrl');
        }

        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = await dataLoaders.get('storeLoaderById').load(_.get('storeId'));
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeProductsImages').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.getIn(['productPrice', 'imageUrl']);
      },
    },
    barcode: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'barcode']) ? _.getIn(['productPrice', 'barcode']) : null),
    },
    size: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'size']) ? _.getIn(['productPrice', 'size']) : null),
    },
    productPageUrl: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders }) => {
        if (_.get('stapleItemId')) {
          return null;
        }

        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = await dataLoaders.get('storeLoaderById').load(_.get('storeId'));
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeProductsPageUrls').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.getIn(['productPrice', 'productPageUrl']);
      },
    },
    specialType: {
      type: GraphQLString,
      resolve: _ => (_.hasIn(['productPrice', 'specialType']) ? _.getIn(['productPrice', 'specialType']) : null),
    },
    priceToDisplay: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'priceToDisplay']) ? _.getIn(['productPrice', 'priceToDisplay']) : null),
    },
    saving: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'saving']) ? _.getIn(['productPrice', 'saving']) : null),
    },
    savingPercentage: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'savingPercentage']) ? _.getIn(['productPrice', 'savingPercentage']) : null),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'currentPrice']) ? _.getIn(['productPrice', 'priceDetails', 'currentPrice']) : null),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'wasprice']) ? _.getIn(['productPrice', 'priceDetails', 'wasPrice']) : null),
    },
    multiBuy: {
      type: MultiBuy,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'multiBuyInfo']) ? _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']) : null),
    },
    unitPrice: {
      type: UnitPrice,
      resolve: _ => (_.hasIn(['productPrice', 'priceDetails', 'unitPrice']) ? _.getIn(['productPrice', 'priceDetails', 'unitPrice']) : null),
    },
    offerEndDate: {
      type: GraphQLString,
      resolve: (_) => {
        if (!_.hasIn(['productPrice', 'offerEndDate'])) {
          return null;
        }

        const offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : null;
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
