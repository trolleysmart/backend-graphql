'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _ShoppingListHelper = require('./ShoppingListHelper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'RemoveShoppingList',
  inputFields: {
    shoppingListId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var shoppingListId = _ref2.shoppingListId;
      var sessionToken = _ref3.sessionToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _ShoppingListHelper.removeShoppingList)(shoppingListId, sessionToken);

            case 3:
              return _context.abrupt('return', (0, _immutable.Map)());

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t0 instanceof Error ? _context.t0.message : _context.t0 }));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});