'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStore = exports.getAllStoresToFilterBy = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _OpeningHours = require('./OpeningHours');

var _OpeningHours2 = _interopRequireDefault(_OpeningHours);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _interface = require('../interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getAllStoresToFilterByUsingId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(storeIds, dataLoaders) {
    var storesToFilterBy, storeLoaderById, stores, storesWithParentStores, storesWithParentToAdd;
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
            storeLoaderById = dataLoaders.storeLoaderById;
            _context.t0 = _immutable2.default;
            _context.next = 7;
            return storeLoaderById.loadMany(storeIds.toJS());

          case 7:
            _context.t1 = _context.sent;
            stores = _context.t0.fromJS.call(_context.t0, _context.t1);


            storesToFilterBy = storesToFilterBy.concat(stores);

            storesWithParentStores = stores.filter(function (store) {
              return store.get('parentStoreId');
            });

            if (storesWithParentStores.isEmpty()) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return getAllStoresToFilterByUsingId(storesWithParentStores.map(function (store) {
              return store.get('parentStoreId');
            }), dataLoaders);

          case 14:
            storesWithParentToAdd = _context.sent;


            storesToFilterBy = storesToFilterBy.concat(storesWithParentToAdd);

          case 16:
            return _context.abrupt('return', storesToFilterBy);

          case 17:
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
    var storesToFilterBy, storeLoaderByKey, stores, storesWithParentStores, storesWithParentToAdd;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            storesToFilterBy = (0, _immutable.List)();
            storeLoaderByKey = dataLoaders.storeLoaderByKey;
            _context2.t0 = _immutable2.default;
            _context2.next = 5;
            return storeLoaderByKey.loadMany(storeKeys.toJS());

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

var getStore = exports.getStore = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(storeId, dataLoaders) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', dataLoaders.storeLoaderById.load(storeId));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getStore(_x5, _x6) {
    return _ref3.apply(this, arguments);
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
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref5) {
          var dataLoaders = _ref5.dataLoaders;
          var storeLoaderById, configLoader, storeKey, productSearchConfig;
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
                  storeLoaderById = dataLoaders.storeLoaderById, configLoader = dataLoaders.configLoader;
                  _context4.next = 5;
                  return storeLoaderById.load(_.get('id'));

                case 5:
                  storeKey = _context4.sent.get('key');
                  _context4.next = 8;
                  return configLoader.load('productSearch');

                case 8:
                  productSearchConfig = _context4.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context4.next = 11;
                    break;
                  }

                  return _context4.abrupt('return', '');

                case 11:
                  return _context4.abrupt('return', _.get('imageUrl'));

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    openingHours: {
      type: _OpeningHours2.default,
      resolve: function resolve(_) {
        var from = _.get('openFrom');
        var until = _.get('openUntil');

        if (!from || !until) {
          return null;
        }

        return (0, _immutable.Map)({ from: from, until: until });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
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
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref7) {
          var dataLoaders = _ref7.dataLoaders;
          var storeLoaderById, configLoader, storeKey, productSearchConfig;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (_.has('id')) {
                    _context5.next = 2;
                    break;
                  }

                  return _context5.abrupt('return', '');

                case 2:
                  storeLoaderById = dataLoaders.storeLoaderById, configLoader = dataLoaders.configLoader;
                  _context5.next = 5;
                  return storeLoaderById.load(_.get('id'));

                case 5:
                  storeKey = _context5.sent.get('key');
                  _context5.next = 8;
                  return configLoader.load('productSearch');

                case 8:
                  productSearchConfig = _context5.sent;

                  if (!productSearchConfig.get('storesKeyToExcludeStoreLogos').find(function (key) {
                    return key.localeCompare(storeKey) === 0;
                  })) {
                    _context5.next = 11;
                    break;
                  }

                  return _context5.abrupt('return', '');

                case 11:
                  return _context5.abrupt('return', _.get('imageUrl'));

                case 12:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    geoLocation: {
      type: _GeoLocation2.default,
      resolve: function resolve(_) {
        var geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return (0, _immutable.Map)({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      }
    },
    openingHours: {
      type: _OpeningHours2.default,
      resolve: function resolve(_) {
        var from = _.get('openFrom');
        var until = _.get('openUntil');

        if (!from || !until) {
          return null;
        }

        return (0, _immutable.Map)({ from: from, until: until });
      }
    },
    phones: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Phone2.default)),
      resolve: function resolve(_) {
        var phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      }
    },
    parentStore: {
      type: ParentStore,
      resolve: function resolve(_, args, _ref8) {
        var dataLoaders = _ref8.dataLoaders;

        var parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return dataLoaders.storeLoaderById.load(parentStoreId);
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