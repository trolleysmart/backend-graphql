'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShoppingLists = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _interface = require('../interface');

var _ShoppingListItem = require('./ShoppingListItem');

var _ShoppingListItem2 = _interopRequireDefault(_ShoppingListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ShoppingListType = new _graphql.GraphQLObjectType({
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
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, request) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _ShoppingListItem.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), _.get('id'), request.headers.authorization);

                case 2:
                  return _context.abrupt('return', _context.sent.count);

                case 3:
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
    shoppingListItems: {
      type: _ShoppingListItem2.default.ShoppingListItemConnectionDefinition.connectionType,
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, request) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _ShoppingListItem.getShoppingListItems)(_immutable2.default.fromJS(args), _.get('id'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});

var ShoppingListConnectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ShoppingList',
  nodeType: ShoppingListType
});

var getCriteria = function getCriteria(searchArgs, userId) {
  return (0, _immutable.Map)({
    ids: searchArgs.has('shoppingListIds') ? searchArgs.get('shoppingListIds') : undefined,
    orderByFieldAscending: 'name',
    conditions: (0, _immutable.Map)({
      userId: userId,
      contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
      status: 'A'
    })
  });
};

var getShoppingListCountMatchCriteria = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, userId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().count(getCriteria(searchArgs, userId), sessionToken));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getShoppingListCountMatchCriteria(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var getShoppingListMatchCriteria = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(searchArgs, userId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().search(getCriteria(searchArgs, userId).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getShoppingListMatchCriteria(_x10, _x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

var getShoppingLists = exports.getShoppingLists = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(searchArgs, userId, sessionToken) {
    var count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, shoppingLists, indexedShoppingLists, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getShoppingListCountMatchCriteria(searchArgs, userId, sessionToken);

          case 2:
            count = _context5.sent;
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(searchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context5.next = 6;
            return getShoppingListMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

          case 6:
            shoppingLists = _context5.sent;
            indexedShoppingLists = shoppingLists.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedShoppingLists.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context5.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getShoppingLists(_x15, _x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = { ShoppingListType: ShoppingListType, ShoppingListConnectionDefinition: ShoppingListConnectionDefinition };