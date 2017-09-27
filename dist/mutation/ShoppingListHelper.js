'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeShoppingList = exports.updateShoppingList = exports.addShoppingList = exports.removeItemsFromShoppingList = exports.getShoppingListById = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getShoppingListItemById = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListItemService().read(id, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getShoppingListItemById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAllShoppingListItemsContainProvidedProductPrice = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productPriceId, shoppingListId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ productPriceId: productPriceId, shoppingListId: shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllShoppingListItemsContainProvidedProductPrice(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getAllShoppingListItemsContainProvidedStapleItem = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(stapleItemId, shoppingListId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ stapleItemId: stapleItemId, shoppingListId: shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAllShoppingListItemsContainProvidedStapleItem(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var getShoppingListById = exports.getShoppingListById = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().read(id, null, sessionToken));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getShoppingListById(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var removeItemsFromShoppingList = exports.removeItemsFromShoppingList = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(shoppingListItemIds, userId, shoppingListId, sessionToken) {
    var shoppingListItems, productPriceIds, stapleItemIds, shoppingListItemService, itemsToRemove, _itemsToRemove;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!shoppingListItemIds.isEmpty()) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return');

          case 2:
            _context5.t0 = _immutable2.default;
            _context5.next = 5;
            return Promise.all(shoppingListItemIds.map(function (id) {
              return getShoppingListItemById(id, sessionToken);
            }).toArray());

          case 5:
            _context5.t1 = _context5.sent;

            _context5.t2 = function (shoppingListItem) {
              return shoppingListItem.get('shoppingListId').localeCompare(shoppingListId) === 0;
            };

            shoppingListItems = _context5.t0.fromJS.call(_context5.t0, _context5.t1).filter(_context5.t2);
            productPriceIds = shoppingListItems.filter(function (_) {
              return _.get('productPriceId');
            }).map(function (_) {
              return _.get('productPriceId');
            }).groupBy(function (_) {
              return _;
            }).map(function (_) {
              return _.first();
            }).valueSeq().toList();
            stapleItemIds = shoppingListItems.filter(function (_) {
              return _.get('stapleItemId');
            }).map(function (_) {
              return _.get('stapleItemId');
            }).groupBy(function (_) {
              return _;
            }).map(function (_) {
              return _.first();
            }).valueSeq().toList();
            shoppingListItemService = new _trolleySmartParseServerCommon.ShoppingListItemService();

            if (productPriceIds.isEmpty()) {
              _context5.next = 20;
              break;
            }

            _context5.t3 = _immutable2.default;
            _context5.next = 15;
            return Promise.all(productPriceIds.map(function (productPriceId) {
              return getAllShoppingListItemsContainProvidedProductPrice(productPriceId, shoppingListId, sessionToken);
            }).toArray());

          case 15:
            _context5.t4 = _context5.sent;

            _context5.t5 = function (_) {
              return _;
            };

            itemsToRemove = _context5.t3.fromJS.call(_context5.t3, _context5.t4).flatMap(_context5.t5);
            _context5.next = 20;
            return Promise.all(itemsToRemove.map(function (item) {
              return shoppingListItemService.update(item.set('removedByUserId', userId), sessionToken);
            }).toArray());

          case 20:
            if (stapleItemIds.isEmpty()) {
              _context5.next = 29;
              break;
            }

            _context5.t6 = _immutable2.default;
            _context5.next = 24;
            return Promise.all(stapleItemIds.map(function (stapleItemId) {
              return getAllShoppingListItemsContainProvidedStapleItem(stapleItemId, shoppingListId, sessionToken);
            }).toArray());

          case 24:
            _context5.t7 = _context5.sent;

            _context5.t8 = function (_) {
              return _;
            };

            _itemsToRemove = _context5.t6.fromJS.call(_context5.t6, _context5.t7).flatMap(_context5.t8);
            _context5.next = 29;
            return Promise.all(_itemsToRemove.map(function (item) {
              return shoppingListItemService.update(item.set('removedByUserId', userId), sessionToken);
            }).toArray());

          case 29:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function removeItemsFromShoppingList(_x11, _x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

var addShoppingList = exports.addShoppingList = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name, user, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListService().create((0, _immutable.Map)({ name: name, user: user, status: 'A' }), _microBusinessParseServerCommon.ParseWrapperService.createACL(user), sessionToken));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function addShoppingList(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var updateShoppingList = exports.updateShoppingList = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(shoppingListId, name, sessionToken) {
    var shoppingListService, shoppingList;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            shoppingListService = new _trolleySmartParseServerCommon.ShoppingListService();
            _context7.next = 3;
            return shoppingListService.read(shoppingListId, null, sessionToken);

          case 3:
            shoppingList = _context7.sent;

            if (name) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt('return', shoppingList);

          case 6:
            return _context7.abrupt('return', shoppingListService.update(shoppingList.set('name', name), sessionToken));

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function updateShoppingList(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();

var removeShoppingList = exports.removeShoppingList = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(shoppingListId, sessionToken) {
    var shoppingListService, shoppingList;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            shoppingListService = new _trolleySmartParseServerCommon.ShoppingListService();
            _context8.next = 3;
            return shoppingListService.read(shoppingListId, null, sessionToken);

          case 3:
            shoppingList = _context8.sent;
            return _context8.abrupt('return', shoppingListService.update(shoppingList.set('status', 'I'), sessionToken));

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function removeShoppingList(_x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}();