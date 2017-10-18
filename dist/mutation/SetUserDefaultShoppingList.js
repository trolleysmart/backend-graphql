'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _ShoppingListHelper = require('./ShoppingListHelper');

var _type = require('../type');

var _loader = require('../loader');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'SetUserDefaultShoppingList',
  inputFields: {
    shoppingListId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString
    },
    shoppingListItems: {
      type: new _graphql.GraphQLList(_type.ShoppingListItemConnection.edgeType),
      resolve: function resolve(_) {
        return _.get('shoppingListItems');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, request) {
      var shoppingListId = _ref2.shoppingListId;
      var sessionToken, userLoaderBySessionToken, shoppingListItems;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sessionToken = request.headers.authorization;
              userLoaderBySessionToken = (0, _loader.createUserLoaderBySessionToken)();
              _context.next = 5;
              return (0, _ShoppingListHelper.setUserDefaultShoppingList)(shoppingListId, userLoaderBySessionToken, sessionToken);

            case 5:
              _context.next = 7;
              return (0, _type.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), shoppingListId, sessionToken);

            case 7:
              shoppingListItems = _context.sent.edges;
              return _context.abrupt('return', (0, _immutable.Map)({ shoppingListItems: shoppingListItems }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t0 instanceof Error ? _context.t0.message : _context.t0 }));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});