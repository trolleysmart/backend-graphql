'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _ShoppingListHelper = require('./ShoppingListHelper');

var _type = require('../type');

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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var shoppingListId = _ref2.shoppingListId;
      var request = _ref3.request,
          dataLoaders = _ref3.dataLoaders;
      var sessionToken, shoppingListItems;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sessionToken = request.headers.authorization;
              _context.next = 4;
              return (0, _ShoppingListHelper.setUserDefaultShoppingList)(shoppingListId, dataLoaders, sessionToken);

            case 4:
              _context.next = 6;
              return (0, _type.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), shoppingListId, sessionToken);

            case 6:
              shoppingListItems = _context.sent.edges;
              return _context.abrupt('return', (0, _immutable.Map)({ shoppingListItems: shoppingListItems }));

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t0 instanceof Error ? _context.t0.message : _context.t0 }));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 10]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});