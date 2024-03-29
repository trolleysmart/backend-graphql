'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDefaultShoppingListItems = exports.getShoppingListItems = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@trolleysmart/parse-server-common');

var _ShoppingListItem = require('./ShoppingListItem');

var _ShoppingListItem2 = _interopRequireDefault(_ShoppingListItem);

var _Store = require('./Store');

var _loaders = require('../loaders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getShoppingListItemsMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, shoppingListId, sessionToken) {
    var shoppingListItems, criteria, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shoppingListItems = (0, _immutable.List)();
            criteria = (0, _immutable.Map)({
              include_productPrice: true,
              include_stapleItem: true,
              include_store: true,
              include_tags: true,
              conditions: (0, _immutable.Map)({
                shoppingListId: shoppingListId,
                addedByUserId: searchArgs.get('addedByUserId') ? searchArgs.get('addedByUserId') : undefined,
                contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
                doesNotExist_removedByUser: true,
                tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
                storeIds: searchArgs.get('storeIds') ? searchArgs.get('storeIds') : undefined
              })
            });
            _context.next = 4;
            return new _parseServerCommon.ShoppingListItemService().searchAll(criteria, sessionToken);

          case 4:
            result = _context.sent;
            _context.prev = 5;

            result.event.subscribe(function (info) {
              shoppingListItems = shoppingListItems.push(info);
            });

            _context.next = 9;
            return result.promise;

          case 9:
            _context.prev = 9;

            result.event.unsubscribeAll();
            return _context.finish(9);

          case 12:
            return _context.abrupt('return', shoppingListItems);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5,, 9, 12]]);
  }));

  return function getShoppingListItemsMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getShoppingListItems = exports.getShoppingListItems = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, shoppingListId, dataLoaders, sessionToken) {
    var finalSearchArgs, shoppingListItems, stapleItems, productPrices, allShoppingListItems, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, indexedList, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (shoppingListId) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', {
              edges: [],
              count: 0,
              pageInfo: {
                startCursor: 'cursor not available',
                endCursor: 'cursor not available',
                hasPreviousPage: false,
                hasNextPage: false
              }
            });

          case 2:
            _context2.t1 = searchArgs;

            if (!(searchArgs.has('storeKeys') && searchArgs.get('storeKeys'))) {
              _context2.next = 13;
              break;
            }

            _context2.t3 = _immutable.Map;
            _context2.next = 7;
            return (0, _Store.getAllStoresToFilterBy)(searchArgs.get('storeKeys'), dataLoaders);

          case 7:
            _context2.t4 = function (store) {
              return store.get('id');
            };

            _context2.t5 = _context2.sent.map(_context2.t4);
            _context2.t6 = {
              storeIds: _context2.t5
            };
            _context2.t2 = (0, _context2.t3)(_context2.t6);
            _context2.next = 14;
            break;

          case 13:
            _context2.t2 = (0, _immutable.Map)();

          case 14:
            _context2.t7 = _context2.t2;
            _context2.t0 = _context2.t1.merge.call(_context2.t1, _context2.t7);

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context2.next = 28;
              break;
            }

            _context2.t9 = _immutable.Map;
            _context2.t10 = _immutable2.default;
            _context2.next = 21;
            return dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 21:
            _context2.t11 = _context2.sent;

            _context2.t12 = function (tag) {
              return tag.get('id');
            };

            _context2.t13 = _context2.t10.fromJS.call(_context2.t10, _context2.t11).map(_context2.t12);
            _context2.t14 = {
              tagIds: _context2.t13
            };
            _context2.t8 = (0, _context2.t9)(_context2.t14);
            _context2.next = 29;
            break;

          case 28:
            _context2.t8 = (0, _immutable.Map)();

          case 29:
            _context2.t15 = _context2.t8;
            finalSearchArgs = _context2.t0.merge.call(_context2.t0, _context2.t15);
            _context2.next = 33;
            return getShoppingListItemsMatchCriteria(finalSearchArgs, shoppingListId, sessionToken);

          case 33:
            shoppingListItems = _context2.sent;
            stapleItems = shoppingListItems.filter(function (item) {
              return item.get('stapleItem');
            }).groupBy(function (item) {
              return item.get('stapleItemId');
            });
            productPrices = shoppingListItems.filter(function (item) {
              return item.get('productPrice');
            }).groupBy(function (item) {
              return item.get('productPriceId');
            });
            allShoppingListItems = stapleItems.keySeq().map(function (key) {
              var groupedStapleItems = stapleItems.get(key);

              return groupedStapleItems.first().merge((0, _immutable.Map)({ quantity: groupedStapleItems.count(), itemType: 'StapleItem' }));
            }).concat(productPrices.keySeq().map(function (key) {
              var groupedProductPrices = productPrices.get(key);

              return groupedProductPrices.first().merge((0, _immutable.Map)({ quantity: groupedProductPrices.count(), itemType: 'ProductPrice' }));
            }));
            count = allShoppingListItems.count();
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            indexedList = allShoppingListItems.skip(skip).take(limit).zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedList.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context2.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 44:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getShoppingListItems(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserDefaultShoppingListItems = exports.getUserDefaultShoppingListItems = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var userDefaultShoppingListLoader, userLoaderBySessionToken, userId, shoppingListId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userDefaultShoppingListLoader = dataLoaders.userDefaultShoppingListLoader, userLoaderBySessionToken = dataLoaders.userLoaderBySessionToken;
            _context3.next = 3;
            return userLoaderBySessionToken.load(sessionToken);

          case 3:
            userId = _context3.sent.id;
            _context3.next = 6;
            return userDefaultShoppingListLoader.load((0, _loaders.createSessionTokenAndUserIdKeyCombination)(sessionToken, userId));

          case 6:
            shoppingListId = _context3.sent;
            return _context3.abrupt('return', getShoppingListItems(searchArgs, shoppingListId, dataLoaders, sessionToken));

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUserDefaultShoppingListItems(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ShoppingListItem',
  nodeType: _ShoppingListItem2.default
});