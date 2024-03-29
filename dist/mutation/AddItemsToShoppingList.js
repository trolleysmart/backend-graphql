'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _ShoppingListHelper = require('./ShoppingListHelper');

var _ProductPriceHelper = require('./ProductPriceHelper');

var _ProductPriceHelper2 = _interopRequireDefault(_ProductPriceHelper);

var _StapleItemHelper = require('./StapleItemHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddItemsToShoppingList',
  inputFields: {
    shoppingListId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    productPriceIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
    stapleItemIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
    newStapleItemNames: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLString)) }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
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
      var shoppingListId = _ref2.shoppingListId,
          productPriceIds = _ref2.productPriceIds,
          stapleItemIds = _ref2.stapleItemIds,
          newStapleItemNames = _ref2.newStapleItemNames;
      var sessionToken = _ref3.sessionToken,
          dataLoaders = _ref3.dataLoaders;
      var finalProductPriceIds, finalStapleItemIds, newShoppingListItemIds, shoppingListItems, shoppingListItemsToReturn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _ShoppingListHelper.getShoppingListById)(shoppingListId, sessionToken);

            case 3:
              finalProductPriceIds = productPriceIds ? _immutable2.default.fromJS(productPriceIds) : (0, _immutable.List)();
              finalStapleItemIds = stapleItemIds ? _immutable2.default.fromJS(stapleItemIds) : (0, _immutable.List)();
              _context.t0 = _immutable2.default;
              _context.next = 8;
              return Promise.all([(0, _ProductPriceHelper2.default)(finalProductPriceIds, dataLoaders, shoppingListId, sessionToken), (0, _StapleItemHelper.addStapleItemsToShoppingList)(finalStapleItemIds, dataLoaders, shoppingListId, sessionToken), (0, _StapleItemHelper.addNewStapleItemsToShoppingList)(newStapleItemNames ? _immutable2.default.fromJS(newStapleItemNames) : (0, _immutable.List)(), dataLoaders, shoppingListId, sessionToken)]);

            case 8:
              _context.t1 = _context.sent[2];
              newShoppingListItemIds = _context.t0.fromJS.call(_context.t0, _context.t1);
              _context.next = 12;
              return (0, _type.getShoppingListItems)((0, _immutable.Map)({ first: 1000 }), shoppingListId, dataLoaders, sessionToken);

            case 12:
              shoppingListItems = _context.sent.edges;
              shoppingListItemsToReturn = shoppingListItems.filter(function (shoppingListItem) {
                return newShoppingListItemIds.find(function (id) {
                  return id.localeCompare(shoppingListItem.node.get('id')) === 0;
                });
              }).concat(shoppingListItems.filter(function (shoppingListItem) {
                return finalProductPriceIds.find(function (id) {
                  return id.localeCompare(shoppingListItem.node.get('productPriceId')) === 0;
                });
              })).concat(shoppingListItems.filter(function (shoppingListItem) {
                return finalStapleItemIds.find(function (id) {
                  return id.localeCompare(shoppingListItem.node.get('stapleItemId')) === 0;
                });
              }));
              return _context.abrupt('return', (0, _immutable.Map)({ shoppingListItems: shoppingListItemsToReturn }));

            case 17:
              _context.prev = 17;
              _context.t2 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t2 instanceof Error ? _context.t2.message : _context.t2 }));

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 17]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});