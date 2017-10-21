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
            return _context.abrupt('return', new _trolleySmartParseServerCommon.ProductPriceService().read(productId, (0, _immutable.Map)({ include_store: true, include_tags: true, include_storeProduct: true }), sessionToken));

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
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var dataLoaders = _ref3.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (_.has('storeId')) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 2:
                  _context2.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 4:
                  storeKey = _context2.sent;
                  _context2.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context2.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsDescriptions').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context2.next = 10;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 10:
                  return _context2.abrupt('return', _.get('description'));

                case 11:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var dataLoaders = _ref5.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (_.has('storeId')) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 2:
                  _context3.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 4:
                  storeKey = _context3.sent;
                  _context3.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context3.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsImages').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context3.next = 10;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 10:
                  return _context3.abrupt('return', _.get('imageUrl'));

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x6, _x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('barcode');
      }
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('size');
      }
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref7) {
          var dataLoaders = _ref7.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (_.has('storeId')) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 2:
                  _context4.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 4:
                  storeKey = _context4.sent;
                  _context4.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context4.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsPageUrls').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 10:
                  return _context4.abrupt('return', _.get('productPageUrl'));

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x9, _x10, _x11) {
          return _ref6.apply(this, arguments);
        };
      }()
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

        return offerEndDate ? offerEndDate.toISOString() : null;
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