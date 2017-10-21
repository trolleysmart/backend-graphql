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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var dataLoaders = _ref2.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_.get('stapleItemId')) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', _.get('description'));

                case 2:
                  if (_.has('storeId')) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt('return', '');

                case 4:
                  _context.next = 6;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 6:
                  storeKey = _context.sent.get('key');
                  _context.next = 9;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 9:
                  productSearchConfig = _context.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsDescriptions').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context.next = 12;
                    break;
                  }

                  return _context.abrupt('return', '');

                case 12:
                  return _context.abrupt('return', _.get('description'));

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var dataLoaders = _ref4.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!_.get('stapleItemId')) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt('return', _.get('imageUrl'));

                case 2:
                  if (_.has('storeId')) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 4:
                  _context2.next = 6;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 6:
                  storeKey = _context2.sent.get('key');
                  _context2.next = 9;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 9:
                  productSearchConfig = _context2.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsImages').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context2.next = 12;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 12:
                  return _context2.abrupt('return', _.getIn(['productPrice', 'imageUrl']));

                case 13:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'barcode']) ? _.getIn(['productPrice', 'barcode']) : null;
      }
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'size']) ? _.getIn(['productPrice', 'size']) : null;
      }
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref6) {
          var dataLoaders = _ref6.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!_.get('stapleItemId')) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return', null);

                case 2:
                  if (_.has('storeId')) {
                    _context3.next = 4;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 4:
                  _context3.next = 6;
                  return dataLoaders.get('storeLoaderById').load(_.get('storeId'));

                case 6:
                  storeKey = _context3.sent.get('key');
                  _context3.next = 9;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 9:
                  productSearchConfig = _context3.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeProductsPageUrls').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context3.next = 12;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 12:
                  return _context3.abrupt('return', _.getIn(['productPrice', 'productPageUrl']));

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    specialType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'specialType']) ? _.getIn(['productPrice', 'specialType']) : null;
      }
    },
    priceToDisplay: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceToDisplay']) ? _.getIn(['productPrice', 'priceToDisplay']) : null;
      }
    },
    saving: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'saving']) ? _.getIn(['productPrice', 'saving']) : null;
      }
    },
    savingPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'savingPercentage']) ? _.getIn(['productPrice', 'savingPercentage']) : null;
      }
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'currentPrice']) ? _.getIn(['productPrice', 'priceDetails', 'currentPrice']) : null;
      }
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'wasprice']) ? _.getIn(['productPrice', 'priceDetails', 'wasPrice']) : null;
      }
    },
    multiBuy: {
      type: _MultiBuy2.default,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'multiBuyInfo']) ? _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']) : null;
      }
    },
    unitPrice: {
      type: _UnitPrice2.default,
      resolve: function resolve(_) {
        return _.hasIn(['productPrice', 'priceDetails', 'unitPrice']) ? _.getIn(['productPrice', 'priceDetails', 'unitPrice']) : null;
      }
    },
    offerEndDate: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        if (!_.hasIn(['productPrice', 'offerEndDate'])) {
          return null;
        }

        var offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : null;
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