'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllStoresToFilterBy = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _interface = require('../interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getAllStoresToFilterByUsingId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(storeIds, dataLoaders) {
    var storesToFilterBy, stores, storesWithParentStores, storesWithParentToAdd;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!storeIds.isEmpty()) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', (0, _immutable.List)());

          case 2:
            storesToFilterBy = (0, _immutable.List)();
            _context.t0 = _immutable2.default;
            _context.next = 6;
            return dataLoaders.get('storeLoaderById').loadMany(storeIds.toJS());

          case 6:
            _context.t1 = _context.sent;
            stores = _context.t0.fromJS.call(_context.t0, _context.t1);


            storesToFilterBy = storesToFilterBy.concat(stores);

            storesWithParentStores = stores.filter(function (store) {
              return store.get('parentStoreId');
            });

            if (storesWithParentStores.isEmpty()) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return getAllStoresToFilterByUsingId(storesWithParentStores.map(function (store) {
              return store.get('parentStoreId');
            }), dataLoaders);

          case 13:
            storesWithParentToAdd = _context.sent;


            storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);

          case 15:
            return _context.abrupt('return', storesToFilterBy);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getAllStoresToFilterByUsingId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAllStoresToFilterBy = exports.getAllStoresToFilterBy = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(storeKeys, dataLoaders) {
    var storesToFilterBy, stores, storesWithParentStores, storesWithParentToAdd;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(storeKeys);

            storesToFilterBy = (0, _immutable.List)();
            _context2.t0 = _immutable2.default;
            _context2.next = 5;
            return dataLoaders.get('storeLoaderByKey').loadMany(storeKeys.toJS());

          case 5:
            _context2.t1 = _context2.sent;
            stores = _context2.t0.fromJS.call(_context2.t0, _context2.t1);


            storesToFilterBy = storesToFilterBy.concat(stores);

            storesWithParentStores = stores.filter(function (store) {
              return store.get('parentStoreId');
            });

            if (storesWithParentStores.isEmpty()) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return getAllStoresToFilterByUsingId(storesWithParentStores.map(function (store) {
              return store.get('parentStoreId');
            }), dataLoaders);

          case 12:
            storesWithParentToAdd = _context2.sent;


            storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);

          case 14:
            return _context2.abrupt('return', storesToFilterBy);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllStoresToFilterBy(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

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
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref4) {
          var dataLoaders = _ref4.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (_.has('id')) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return', '');

                case 2:
                  _context3.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('id'));

                case 4:
                  storeKey = _context3.sent.get('key');
                  _context3.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context3.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
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

        return function resolve(_x5, _x6, _x7) {
          return _ref3.apply(this, arguments);
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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref6) {
          var dataLoaders = _ref6.dataLoaders;
          var storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (_.has('id')) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 2:
                  _context4.next = 4;
                  return dataLoaders.get('storeLoaderById').load(_.get('id'));

                case 4:
                  storeKey = _context4.sent.get('key');
                  _context4.next = 7;
                  return dataLoaders.get('configLoader').load('productSearch');

                case 7:
                  productSearchConfig = _context4.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 10:
                  return _context4.abrupt('return', _.get('imageUrl'));

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref5.apply(this, arguments);
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
      resolve: function resolve(_, args, _ref7) {
        var dataLoaders = _ref7.dataLoaders;

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