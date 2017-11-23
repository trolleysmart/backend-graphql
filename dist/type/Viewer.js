'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _interface = require('../interface');

var _TagConnection = require('./TagConnection');

var _TagConnection2 = _interopRequireDefault(_TagConnection);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _StoreConnection = require('./StoreConnection');

var _StoreConnection2 = _interopRequireDefault(_StoreConnection);

var _MasterProduct = require('./MasterProduct');

var _MasterProduct2 = _interopRequireDefault(_MasterProduct);

var _MasterProductConnection = require('./MasterProductConnection');

var _MasterProductConnection2 = _interopRequireDefault(_MasterProductConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    tags: {
      type: _TagConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        tagIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        level: {
          type: _graphql.GraphQLInt
        },
        forDisplay: {
          type: _graphql.GraphQLBoolean
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var sessionToken = _ref2.sessionToken;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _TagConnection.getTags)(_immutable2.default.fromJS(args), sessionToken));

                case 1:
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
    store: {
      type: _Store2.default,
      args: {
        storeId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, _ref5) {
          var storeId = _ref4.storeId;
          var dataLoaders = _ref5.dataLoaders;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _Store.getStore)(storeId, dataLoaders));

                case 1:
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
    stores: {
      type: _StoreConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        storeIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        forDisplay: {
          type: _graphql.GraphQLBoolean
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref7) {
          var sessionToken = _ref7.sessionToken;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _StoreConnection.getStores)(_immutable2.default.fromJS(args), sessionToken));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    masterProducts: {
      type: _MasterProductConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        masterProductIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        description: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        }
      }),
      resolve: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref9) {
          var sessionToken = _ref9.sessionToken,
              dataLoaders = _ref9.dataLoaders;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _MasterProductConnection.getMasterProducts)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref8.apply(this, arguments);
        };
      }()
    },
    masterProduct: {
      type: _MasterProduct2.default,
      args: {
        masterProductId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref11, _ref12) {
          var masterProductId = _ref11.masterProductId;
          var sessionToken = _ref12.sessionToken;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', (0, _MasterProduct.getMasterProduct)(masterProductId, sessionToken));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref10.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});