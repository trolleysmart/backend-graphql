'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'ShoppingListItem',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    itemType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('itemType');
      }
    },
    stapleItemId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('stapleItemId');
      }
    },
    productPriceId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('productPriceId');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      }
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        if (_.get('stapleItemId')) {
          return _.get('imageUrl');
        }

        if (!_.hasIn(['productPrice', 'imageUrl'])) {
          return undefined;
        }

        return _.getIn(['productPrice', 'imageUrl']);
      }
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'barcode']) ? _.getIn(['productPrice', 'barcode']) : undefined;
      }
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'size']) ? _.getIn(['productPrice', 'size']) : undefined;
      }
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'productPageUrl']) ? _.getIn(['productPrice', 'productPageUrl']) : undefined;
      }
    },
    specialType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'specialType']) ? _.getIn(['productPrice', 'specialType']) : undefined;
      }
    },
    priceToDisplay: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceToDisplay']) ? _.getIn(['productPrice', 'priceToDisplay']) : undefined;
      }
    },
    saving: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'saving']) ? _.getIn(['productPrice', 'saving']) : undefined;
      }
    },
    savingPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'savingPercentage']) ? _.getIn(['productPrice', 'savingPercentage']) : undefined;
      }
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'currentPrice']) ? _.getIn(['productPrice', 'priceDetails', 'currentPrice']) : undefined;
      }
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'wasprice']) ? _.getIn(['productPrice', 'priceDetails', 'wasPrice']) : undefined;
      }
    },
    multiBuy: {
      type: _MultiBuy2.default,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'multiBuyInfo']) ? _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']) : undefined;
      }
    },
    unitPrice: {
      type: _UnitPrice2.default,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'unitPrice']) ? _.getIn(['productPrice', 'priceDetails', 'unitPrice']) : undefined;
      }
    },
    offerEndDate: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        if (!_.hasIn(['productPrice', 'offerEndDate'])) {
          return undefined;
        }

        var offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : undefined;
      }
    },
    quantity: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('quantity');
      }
    },
    comments: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('comments');
      }
    },
    store: {
      type: _Store2.default,
      resolve: function resolve(_) {
        return _.get('store');
      }
    },
    tags: {
      type: new _graphql.GraphQLList(_Tag2.default),
      resolve: function resolve(_) {
        return _.get('tags');
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});