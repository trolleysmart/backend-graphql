'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _ShoppingListHelper = require('./ShoppingListHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'RemoveItemsFromShoppingList',
  inputFields: {
    shoppingListId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    shoppingListItemIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, request) {
      var shoppingListId = _ref2.shoppingListId,
          shoppingListItemIds = _ref2.shoppingListItemIds;
      var sessionToken, userId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sessionToken = request.headers.authorization;

              // Trying to read the shopping list to make sure user has access to...

              _context.next = 4;
              return (0, _ShoppingListHelper.getShoppingListById)(shoppingListId, sessionToken);

            case 4:
              _context.next = 6;
              return _microBusinessParseServerCommon.UserService.getUserForProvidedSessionToken(sessionToken);

            case 6:
              userId = _context.sent.id;
              _context.next = 9;
              return (0, _ShoppingListHelper.removeItemsFromShoppingList)(shoppingListItemIds ? _immutable2.default.fromJS(shoppingListItemIds) : (0, _immutable.List)(), userId, shoppingListId, sessionToken);

            case 9:
              return _context.abrupt('return', (0, _immutable.Map)());

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t0 instanceof Error ? _context.t0.message : _context.t0 }));

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 12]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});