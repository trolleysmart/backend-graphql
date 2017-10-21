'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDefaultShoppingList = exports.getUserDefaultShoppingListId = exports.getShoppingList = exports.createUserDefaultShoppingList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _interface = require('../interface');

var _ShoppingListItemConnection = require('./ShoppingListItemConnection');

var _ShoppingListItemConnection2 = _interopRequireDefault(_ShoppingListItemConnection);

var _mutation = require('../mutation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createUserDefaultShoppingList = exports.createUserDefaultShoppingList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dataLoaders, sessionToken) {
    var shoppingListId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mutation.addShoppingList)('My List', dataLoaders, sessionToken);

          case 2:
            shoppingListId = _context.sent;
            _context.next = 5;
            return (0, _mutation.setUserDefaultShoppingList)(shoppingListId, dataLoaders, sessionToken);

          case 5:
            return _context.abrupt('return', shoppingListId);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createUserDefaultShoppingList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getShoppingList = exports.getShoppingList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(shoppingListId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().read(shoppingListId, null, sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getShoppingList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserDefaultShoppingListId = exports.getUserDefaultShoppingListId = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dataLoaders, sessionToken) {
    var userId, defaultShoppingLists;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return dataLoaders.get('userLoaderBySessionToken').load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return new _trolleySmartParseServerCommon.DefaultShoppingListService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ userId: userId }) }), sessionToken);

          case 5:
            defaultShoppingLists = _context3.sent;

            if (!defaultShoppingLists.isEmpty()) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', createUserDefaultShoppingList(dataLoaders, sessionToken));

          case 10:
            if (!(defaultShoppingLists.count() === 1)) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt('return', defaultShoppingLists.first().get('shoppingListId'));

          case 12:
            throw new Error('Multiple default shopping lists found.');

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUserDefaultShoppingListId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getUserDefaultShoppingList = exports.getUserDefaultShoppingList = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dataLoaders, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = getShoppingList;
            _context4.next = 3;
            return getUserDefaultShoppingListId(dataLoaders, sessionToken);

          case 3:
            _context4.t1 = _context4.sent;
            _context4.t2 = sessionToken;
            return _context4.abrupt('return', (0, _context4.t0)(_context4.t1, _context4.t2));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getUserDefaultShoppingList(_x7, _x8) {
    return _ref4.apply(this, arguments);
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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, request) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return (0, _ShoppingListItemConnection.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), _.get('id'), request.headers.authorization);

                case 2:
                  return _context5.abrupt('return', _context5.sent.count);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x9, _x10, _x11) {
          return _ref5.apply(this, arguments);
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
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, request) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', (0, _ShoppingListItemConnection.getShoppingListItems)(_immutable2.default.fromJS(args), _.get('id'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x12, _x13, _x14) {
          return _ref6.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});