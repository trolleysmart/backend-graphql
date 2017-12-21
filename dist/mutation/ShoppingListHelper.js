'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserDefaultShoppingList = exports.setUserDefaultShoppingListForProvidedUser = exports.removeShoppingList = exports.updateShoppingList = exports.addShoppingList = exports.addShoppingListForProvidedUser = exports.removeItemsFromShoppingList = exports.getShoppingListById = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@trolleysmart/parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getShoppingListItemById = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon2.ShoppingListItemService().read(id, null, sessionToken));

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
            return _context2.abrupt('return', new _parseServerCommon2.ShoppingListItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ productPriceId: productPriceId, shoppingListId: shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken));

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
            return _context3.abrupt('return', new _parseServerCommon2.ShoppingListItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ stapleItemId: stapleItemId, shoppingListId: shoppingListId, doesNotExist_removedByUser: true }) }), sessionToken));

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
            return _context4.abrupt('return', new _parseServerCommon2.ShoppingListService().read(id, null, sessionToken));

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
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(shoppingListItemIds, dataLoaders, shoppingListId, sessionToken) {
    var shoppingListItemsPromises, allShoppingListItems, shoppingListItems, productPriceIds, stapleItemIds, shoppingListItemService, itemsToRemovePromises, itemsToRemove, userId, _itemsToRemovePromises, _itemsToRemove, _userId;

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
            shoppingListItemsPromises = shoppingListItemIds.map(function (id) {
              return getShoppingListItemById(id, sessionToken);
            }).toArray();
            _context5.t0 = _immutable2.default;
            _context5.next = 6;
            return Promise.all(shoppingListItemsPromises);

          case 6:
            _context5.t1 = _context5.sent;
            allShoppingListItems = _context5.t0.fromJS.call(_context5.t0, _context5.t1);
            shoppingListItems = allShoppingListItems.filter(function (item) {
              return item.get('shoppingListId').localeCompare(shoppingListId) === 0;
            });
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
            shoppingListItemService = new _parseServerCommon2.ShoppingListItemService();

            if (productPriceIds.isEmpty()) {
              _context5.next = 25;
              break;
            }

            itemsToRemovePromises = productPriceIds.map(function (productPriceId) {
              return getAllShoppingListItemsContainProvidedProductPrice(productPriceId, shoppingListId, sessionToken);
            }).toArray();
            _context5.t2 = _immutable2.default;
            _context5.next = 17;
            return Promise.all(itemsToRemovePromises);

          case 17:
            _context5.t3 = _context5.sent;

            _context5.t4 = function (_) {
              return _;
            };

            itemsToRemove = _context5.t2.fromJS.call(_context5.t2, _context5.t3).flatMap(_context5.t4);
            _context5.next = 22;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 22:
            userId = _context5.sent.id;
            _context5.next = 25;
            return Promise.all(itemsToRemove.map(function (item) {
              return shoppingListItemService.update(item.set('removedByUserId', userId), sessionToken);
            }).toArray());

          case 25:
            if (stapleItemIds.isEmpty()) {
              _context5.next = 38;
              break;
            }

            _itemsToRemovePromises = stapleItemIds.map(function (stapleItemId) {
              return getAllShoppingListItemsContainProvidedStapleItem(stapleItemId, shoppingListId, sessionToken);
            }).toArray();
            _context5.t5 = _immutable2.default;
            _context5.next = 30;
            return Promise.all(_itemsToRemovePromises);

          case 30:
            _context5.t6 = _context5.sent;

            _context5.t7 = function (_) {
              return _;
            };

            _itemsToRemove = _context5.t5.fromJS.call(_context5.t5, _context5.t6).flatMap(_context5.t7);
            _context5.next = 35;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 35:
            _userId = _context5.sent.id;
            _context5.next = 38;
            return Promise.all(_itemsToRemove.map(function (item) {
              return shoppingListItemService.update(item.set('removedByUserId', _userId), sessionToken);
            }).toArray());

          case 38:
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

var addShoppingListForProvidedUser = exports.addShoppingListForProvidedUser = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name, user, sessionToken) {
    var acl;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            acl = _parseServerCommon.ParseWrapperService.createACL(user);
            return _context6.abrupt('return', new _parseServerCommon2.ShoppingListService().create((0, _immutable.Map)({ name: name, user: user, status: 'A' }), acl, sessionToken));

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function addShoppingListForProvidedUser(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var addShoppingList = exports.addShoppingList = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(name, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context7.sent;
            return _context7.abrupt('return', addShoppingListForProvidedUser(name, user, sessionToken));

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function addShoppingList(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();

var updateShoppingList = exports.updateShoppingList = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(shoppingListId, name, sessionToken) {
    var shoppingListService, shoppingList;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            shoppingListService = new _parseServerCommon2.ShoppingListService();
            _context8.next = 3;
            return shoppingListService.read(shoppingListId, null, sessionToken);

          case 3:
            shoppingList = _context8.sent;

            if (name) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt('return', shoppingList);

          case 6:
            return _context8.abrupt('return', shoppingListService.update(shoppingList.set('name', name), sessionToken));

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function updateShoppingList(_x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();

var removeShoppingList = exports.removeShoppingList = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(shoppingListId, sessionToken) {
    var shoppingListService, shoppingList;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            shoppingListService = new _parseServerCommon2.ShoppingListService();
            _context9.next = 3;
            return shoppingListService.read(shoppingListId, null, sessionToken);

          case 3:
            shoppingList = _context9.sent;
            return _context9.abrupt('return', shoppingListService.update(shoppingList.set('status', 'I'), sessionToken));

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function removeShoppingList(_x24, _x25) {
    return _ref9.apply(this, arguments);
  };
}();

var setUserDefaultShoppingListForProvidedUser = exports.setUserDefaultShoppingListForProvidedUser = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(shoppingListId, user, sessionToken) {
    var defaultShoppingListService, defaultShoppingLists;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            defaultShoppingListService = new _parseServerCommon2.DefaultShoppingListService();
            _context10.next = 3;
            return defaultShoppingListService.search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ userId: user.id }) }), sessionToken);

          case 3:
            defaultShoppingLists = _context10.sent;

            if (!defaultShoppingLists.isEmpty()) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt('return', defaultShoppingListService.create((0, _immutable.Map)({ user: user, shoppingListId: shoppingListId }), _parseServerCommon.ParseWrapperService.createACL(user), sessionToken));

          case 8:
            if (!(defaultShoppingLists.count() === 1)) {
              _context10.next = 10;
              break;
            }

            return _context10.abrupt('return', defaultShoppingListService.update(defaultShoppingLists.first().set('shoppingListId', shoppingListId), sessionToken));

          case 10:
            throw new Error('Multiple default shopping lists found.');

          case 11:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function setUserDefaultShoppingListForProvidedUser(_x26, _x27, _x28) {
    return _ref10.apply(this, arguments);
  };
}();

var setUserDefaultShoppingList = exports.setUserDefaultShoppingList = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(shoppingListId, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context11.sent;
            return _context11.abrupt('return', setUserDefaultShoppingListForProvidedUser(shoppingListId, user, sessionToken));

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function setUserDefaultShoppingList(_x29, _x30, _x31) {
    return _ref11.apply(this, arguments);
  };
}();