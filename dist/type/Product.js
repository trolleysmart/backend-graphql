'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProduct = undefined;

var _immutable = require('immutable');

var _graphql = require('graphql');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getProduct = exports.getProduct = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(productId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _trolleySmartParseServerCommon.ProductPriceService.read(productId, (0, _immutable.Map)({ include_store: true, include_tags: true, include_storeProduct: true }), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'Product',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
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
        return _.getIn(['storeProduct', 'imageUrl']);
      }
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['storeProduct', 'barcode']);
      }
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['storeProduct', 'size']);
      }
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('productPageUrl');
      }
    },
    specialType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['priceDetails', 'specialType']);
      }
    },
    priceToDisplay: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('priceToDisplay');
      }
    },
    saving: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('saving');
      }
    },
    savingPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('savingPercentage');
      }
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['priceDetails', 'currentPrice']);
      }
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['priceDetails', 'wasPrice']);
      }
    },
    multiBuy: {
      type: _MultiBuy2.default,
      resolve: function resolve(_) {
        return _.getIn(['priceDetails', 'multiBuyInfo']);
      }
    },
    unitPrice: {
      type: _UnitPrice2.default,
      resolve: function resolve(_) {
        return _.getIn(['priceDetails', 'unitPrice']);
      }
    },
    offerEndDate: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        var offerEndDate = _.get('offerEndDate');

        return offerEndDate ? offerEndDate.toISOString() : undefined;
      }
    },
    comments: {
      type: _graphql.GraphQLString,
      resolve: function resolve() {
        return '';
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