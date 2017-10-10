'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewStapleItemsToShoppingList = exports.addStapleItemsToShoppingList = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var removeNameInvalidCharacters = function removeNameInvalidCharacters(name) {
  if (name) {
    var trimmedName = name.trim();

    if (trimmedName.length === 0) {
      return trimmedName;
    }

    return _immutable2.default.fromJS(trimmedName.split(' ')).map(function (_) {
      return _.trim();
    }).filter(function (_) {
      return _.length > 0;
    }).reduce(function (reduction, value) {
      return reduction + ' ' + value;
    });
  }

  return '';
};

var getStapleItems = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, userId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.StapleItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ userId: userId, name: name }) }), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getStapleItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getStapleTemplateItems = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.StapleTemplateItemService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ name: name }) }), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getStapleTemplateItems(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getStapleItemById = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _trolleySmartParseServerCommon.StapleItemService().read(id, null, sessionToken));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getStapleItemById(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var addStapleItemToShoppingList = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(stapleItemId, userId, shoppingListId, acl, sessionToken) {
    var stapleItem;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getStapleItemById(stapleItemId, sessionToken);

          case 2:
            stapleItem = _context4.sent;
            return _context4.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListItemService().create((0, _immutable.Map)({
              name: stapleItem.get('name'),
              description: stapleItem.get('description'),
              imageUrl: stapleItem.get('imageUrl'),
              isPurchased: false,
              shoppingListId: shoppingListId,
              addedByUserId: userId,
              stapleItemId: stapleItemId,
              tagIds: stapleItem.get('tagIds')
            }), acl, sessionToken));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function addStapleItemToShoppingList(_x8, _x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var addStapleItemsToShoppingList = exports.addStapleItemsToShoppingList = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(stapleItemIds, userLoaderBySessionToken, shoppingListId, sessionToken) {
    var user, acl, stapleItemIdsWithoutDuplicate;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!stapleItemIds.isEmpty()) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', (0, _immutable.List)());

          case 2:
            _context6.next = 4;
            return userLoaderBySessionToken.load(sessionToken);

          case 4:
            user = _context6.sent;
            acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
            stapleItemIdsWithoutDuplicate = stapleItemIds.groupBy(function (_) {
              return _;
            }).map(function (_) {
              return _.first();
            }).valueSeq();
            _context6.t0 = _immutable2.default;
            _context6.next = 10;
            return Promise.all(stapleItemIdsWithoutDuplicate.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(stapleItemId) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt('return', addStapleItemToShoppingList(stapleItemId, user.id, shoppingListId, acl, sessionToken));

                      case 1:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x17) {
                return _ref6.apply(this, arguments);
              };
            }()).toArray());

          case 10:
            _context6.t1 = _context6.sent;
            return _context6.abrupt('return', _context6.t0.fromJS.call(_context6.t0, _context6.t1));

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function addStapleItemsToShoppingList(_x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

var addNewStapleItemsToShoppingList = exports.addNewStapleItemsToShoppingList = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(names, userLoaderBySessionToken, shoppingListId, sessionToken) {
    var trimmedNamesWithoutDuplicate, user, acl, stapleItemService;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!names.isEmpty()) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt('return', (0, _immutable.List)());

          case 2:
            trimmedNamesWithoutDuplicate = names.map(removeNameInvalidCharacters).groupBy(function (_) {
              return _.toLowerCase();
            }).map(function (_) {
              return _.first();
            }).valueSeq().filter(function (_) {
              return _.length > 0;
            });

            if (!trimmedNamesWithoutDuplicate.isEmpty()) {
              _context8.next = 5;
              break;
            }

            return _context8.abrupt('return', (0, _immutable.List)());

          case 5:
            _context8.next = 7;
            return userLoaderBySessionToken.load(sessionToken);

          case 7:
            user = _context8.sent;
            acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
            stapleItemService = new _trolleySmartParseServerCommon.StapleItemService();
            _context8.t0 = _immutable2.default;
            _context8.next = 13;
            return Promise.all(trimmedNamesWithoutDuplicate.map(function () {
              var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(name) {
                var stapleItems, stapleItemId, stapleTemplateItems, stapleTemplateItem;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return getStapleItems(name, user.id, sessionToken);

                      case 2:
                        stapleItems = _context7.sent;
                        stapleItemId = void 0;

                        if (!stapleItems.isEmpty()) {
                          _context7.next = 20;
                          break;
                        }

                        _context7.next = 7;
                        return getStapleTemplateItems(name, sessionToken);

                      case 7:
                        stapleTemplateItems = _context7.sent;

                        if (!stapleTemplateItems.isEmpty()) {
                          _context7.next = 14;
                          break;
                        }

                        _context7.next = 11;
                        return stapleItemService.create((0, _immutable.Map)({ userId: user.id, name: name, addedByUser: true }), acl, sessionToken);

                      case 11:
                        stapleItemId = _context7.sent;
                        _context7.next = 18;
                        break;

                      case 14:
                        stapleTemplateItem = stapleTemplateItems.first();
                        _context7.next = 17;
                        return stapleItemService.create((0, _immutable.Map)({
                          name: stapleTemplateItem.get('name'),
                          description: stapleTemplateItem.get('description'),
                          imageUrl: stapleTemplateItem.get('imageUrl'),
                          userId: user.id
                        }), acl, sessionToken);

                      case 17:
                        stapleItemId = _context7.sent;

                      case 18:
                        _context7.next = 21;
                        break;

                      case 20:
                        stapleItemId = stapleItems.first().get('id');

                      case 21:
                        return _context7.abrupt('return', addStapleItemToShoppingList(stapleItemId, user.id, shoppingListId, acl, sessionToken));

                      case 22:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x22) {
                return _ref8.apply(this, arguments);
              };
            }()).toArray());

          case 13:
            _context8.t1 = _context8.sent;
            return _context8.abrupt('return', _context8.t0.fromJS.call(_context8.t0, _context8.t1));

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function addNewStapleItemsToShoppingList(_x18, _x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();