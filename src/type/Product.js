// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ProductPriceService } from 'trolley-smart-parse-server-common';
import { NodeInterface } from '../interface';
import MultiBuy from './MultiBuy';
import unitPriceType from './UnitPrice';
import Tag from './Tag';
import Store from './Store';

export const getProduct = async (productId, sessionToken) =>
  new ProductPriceService().read(productId, Map({ include_store: true, include_tags: true, include_storeProduct: true }), sessionToken);

export default new GraphQLObjectType({
  name: 'Product',
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
      resolve: async (_, args, { dataLoaders }) => {
        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = (await dataLoaders.get('storeLoaderById').load(_.get('storeId'))).get('key');
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
        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = (await dataLoaders.get('storeLoaderById').load(_.get('storeId'))).get('key');
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeProductsImages').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.get('imageUrl');
      },
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
      resolve: async (_, args, { dataLoaders }) => {
        if (!_.has('storeId')) {
          return '';
        }

        const storeKey = (await dataLoaders.get('storeLoaderById').load(_.get('storeId'))).get('key');
        const productSearchConfig = await dataLoaders.get('configLoader').load('productSearch');

        if (productSearchConfig.get('storesKeyToExcludeProductsPageUrls').find(key => key.localeCompare(storeKey) === 0)) {
          return '';
        }

        return _.get('productPageUrl');
      },
    },
    specialType: {
      type: GraphQLString,
      resolve: _ => _.getIn(['priceDetails', 'specialType']),
    },
    priceToDisplay: {
      type: GraphQLFloat,
      resolve: _ => _.get('priceToDisplay'),
    },
    saving: {
      type: GraphQLFloat,
      resolve: _ => _.get('saving'),
    },
    savingPercentage: {
      type: GraphQLFloat,
      resolve: _ => _.get('savingPercentage'),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['priceDetails', 'currentPrice']),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: _ => _.getIn(['priceDetails', 'wasPrice']),
    },
    multiBuy: {
      type: MultiBuy,
      resolve: _ => _.getIn(['priceDetails', 'multiBuyInfo']),
    },
    unitPrice: {
      type: unitPriceType,
      resolve: _ => _.getIn(['priceDetails', 'unitPrice']),
    },
    offerEndDate: {
      type: GraphQLString,
      resolve: (_) => {
        const offerEndDate = _.get('offerEndDate');

        return offerEndDate ? offerEndDate.toISOString() : null;
      },
    },
    comments: {
      type: GraphQLString,
      resolve: () => '',
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
