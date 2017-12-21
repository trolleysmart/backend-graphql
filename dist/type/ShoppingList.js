'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDefaultShoppingList = exports.getShoppingList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _parseServerCommon = require('@trolleysmart/parse-server-common');

var _interface = require('../interface');

var _ShoppingListItemConnection = require('./ShoppingListItemConnection');

var _ShoppingListItemConnection2 = _interopRequireDefault(_ShoppingListItemConnection);

var _loaders = require('../loaders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getShoppingList = exports.getShoppingList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(shoppingListId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.ShoppingListService().read(shoppingListId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getShoppingList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getUserDefaultShoppingList = exports.getUserDefaultShoppingList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataLoaders, sessionToken) {
    var userDefaultShoppingListLoader, userLoaderBySessionToken, userId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userDefaultShoppingListLoader = dataLoaders.userDefaultShoppingListLoader, userLoaderBySessionToken = dataLoaders.userLoaderBySessionToken;
            _context2.next = 3;
            return userLoaderBySessionToken.load(sessionToken);

          case 3:
            userId = _context2.sent.id;
            _context2.t0 = getShoppingList;
            _context2.next = 7;
            return userDefaultShoppingListLoader.load((0, _loaders.createSessionTokenAndUserIdKeyCombination)(sessionToken, userId));

          case 7:
            _context2.t1 = _context2.sent;
            _context2.t2 = sessionToken;
            return _context2.abrupt('return', (0, _context2.t0)(_context2.t1, _context2.t2));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getUserDefaultShoppingList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'ShoppingList',
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
    totalItemsCount: {
      type: _graphql.GraphQLInt,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref4) {
          var sessionToken = _ref4.sessionToken,
              dataLoaders = _ref4.dataLoaders;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return (0, _ShoppingListItemConnection.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), _.get('id'), dataLoaders, sessionToken);

                case 2:
                  return _context3.abrupt('return', _context3.sent.count);

                case 3:
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
    shoppingListItems: {
      type: _ShoppingListItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        addedByUserId: {
          type: _graphql.GraphQLID
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        storeKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        }
      }),
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref6) {
          var sessionToken = _ref6.sessionToken,
              dataLoaders = _ref6.dataLoaders;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _ShoppingListItemConnection.getShoppingListItems)(_immutable2.default.fromJS(args), _.get('id'), dataLoaders, sessionToken));

                case 1:
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
    }
  },
  interfaces: [_interface.NodeInterface]
});