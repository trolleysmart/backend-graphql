'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShoppingLists = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _ShoppingList = require('./ShoppingList');

var _ShoppingList2 = _interopRequireDefault(_ShoppingList);

var _mutation = require('../mutation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, userId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().count(getCriteria(searchArgs, userId), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getShoppingListCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getShoppingListMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, userId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().search(getCriteria(searchArgs, userId).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getShoppingListMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getShoppingLists = exports.getShoppingLists = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, userLoaderBySessionToken, sessionToken) {
    var userId, count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, shoppingLists, indexedShoppingLists, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return getShoppingListCountMatchCriteria(searchArgs, userId, sessionToken);

          case 5:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 16;
              break;
            }

            _context3.t0 = _mutation.setUserDefaultShoppingList;
            _context3.next = 10;
            return (0, _mutation.addShoppingList)('My List', userLoaderBySessionToken, sessionToken);

          case 10:
            _context3.t1 = _context3.sent;
            _context3.t2 = userLoaderBySessionToken;
            _context3.t3 = sessionToken;
            _context3.next = 15;
            return (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3);

          case 15:
            count = 1;

          case 16:
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(searchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context3.next = 19;
            return getShoppingListMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

          case 19:
            shoppingLists = _context3.sent;
            indexedShoppingLists = shoppingLists.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedShoppingLists.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context3.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getShoppingLists(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ShoppingList',
  nodeType: _ShoppingList2.default
});