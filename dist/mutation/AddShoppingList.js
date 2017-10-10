'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _ShoppingListHelper = require('./ShoppingListHelper');

var _loader = require('../loader');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddShoppingList',
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
    },
    shoppingList: {
      type: _type.ShoppingListConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('shoppingList');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, request) {
      var name = _ref2.name;
      var sessionToken, userLoaderBySessionToken, shoppingListId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sessionToken = request.headers.authorization;
              userLoaderBySessionToken = (0, _loader.createUserLoaderBySessionToken)();
              _context.next = 5;
              return (0, _ShoppingListHelper.addShoppingList)(name, userLoaderBySessionToken, sessionToken);

            case 5:
              shoppingListId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 9;
              return (0, _type.getShoppingLists)((0, _immutable.Map)({ shoppingListIds: _immutable.List.of(shoppingListId) }), userLoaderBySessionToken, sessionToken);

            case 9:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                shoppingList: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 14:
              _context.prev = 14;
              _context.t3 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t3 instanceof Error ? _context.t3.message : _context.t3 }));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 14]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});