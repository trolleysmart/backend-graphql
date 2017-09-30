'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _graphql = require('graphql');

var _interface = require('../interface');

var _MultiBuy = require('./MultiBuy');

var _MultiBuy2 = _interopRequireDefault(_MultiBuy);

var _UnitPrice = require('./UnitPrice');

var _UnitPrice2 = _interopRequireDefault(_UnitPrice);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = new _graphql.GraphQLObjectType({
  name: 'ShoppingListItem',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      },
    },
    itemType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('itemType');
      },
    },
    stapleItemId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('stapleItemId');
      },
    },
    productPriceId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('productPriceId');
      },
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      },
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      },
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('stapleItemId') ? _.get('imageUrl') : _.getIn(['productPrice', 'imageUrl']);
      },
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'barcode']);
      },
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'size']);
      },
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'productPageUrl']);
      },
    },
    specialType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'specialType']);
      },
    },
    priceToDisplay: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceToDisplay']);
      },
    },
    saving: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'saving']);
      },
    },
    savingPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'savingPercentage']);
      },
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'currentPrice']);
      },
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'wasPrice']);
      },
    },
    multiBuy: {
      type: _MultiBuy2.default,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']);
      },
    },
    unitPrice: {
      type: _UnitPrice2.default,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'unitPrice']);
      },
    },
    offerEndDate: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        var offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : undefined;
      },
    },
    quantity: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('quantity');
      },
    },
    comments: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('comments');
      },
    },
    store: {
      type: _Store2.default,
      resolve: function resolve(_) {
        return _.get('store');
      },
    },
    tags: {
      type: new _graphql.GraphQLList(_Tag2.default),
      resolve: function resolve(_) {
        return _.get('tags');
      },
    },
  },
  interfaces: [_interface.NodeInterface],
});
