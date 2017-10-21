'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _interface = require('../interface');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ParentStore = new _graphql.GraphQLObjectType({
  name: 'ParentStore',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('key');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var dataLoaders = _ref2.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_.has('id')) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', '');

                case 2:
                  _context.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('id'));

                case 4:
                  storeKey = _context.sent.get('key');
                  _context.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt('return', '');

                case 10:
                  return _context.abrupt('return', _.get('imageUrl'));

                case 11:
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
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Store',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('key');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
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
                  if (_.has('id')) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 2:
                  _context2.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('id'));

                case 4:
                  storeKey = _context2.sent.get('key');
                  _context2.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context2.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context2.next = 10;
                    break;
                  }

                  return _context2.abrupt('return', '');

                case 10:
                  return _context2.abrupt('return', _.get('imageUrl'));

                case 11:
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
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    parentStore: {
      type: ParentStore,
      resolve: function resolve(_, args, _ref5) {
        var dataLoaders = _ref5.dataLoaders;

        var parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return dataLoaders.get('storeLoaderById').load(parentStoreId);
        }

        var parentStore = _.get('parentStore');

        if (parentStore) {
          return parentStore;
        }

        return null;
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});