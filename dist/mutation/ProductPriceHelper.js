'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getProductPriceById = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.ProductPriceService().read(id, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getProductPriceById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addProductPriceToShoppingList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productPriceId, userId, shoppingListId, acl, sessionToken) {
    var productPrice;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getProductPriceById(productPriceId, sessionToken);

          case 2:
            productPrice = _context2.sent;
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.ShoppingListItemService().create((0, _immutable.Map)({
              name: productPrice.get('name'),
              description: productPrice.get('description'),
              isPurchased: false,
              shoppingListId: shoppingListId,
              addedByUserId: userId,
              productPriceId: productPriceId,
              storeId: productPrice.get('storeId'),
              tagIds: productPrice.get('tagIds')
            }), acl, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addProductPriceToShoppingList(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var addProductPricesToShoppingList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(productPriceIds, dataLoaders, shoppingListId, sessionToken) {
    var user, acl, productPriceIdsWithoutDuplicate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!productPriceIds.isEmpty()) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', (0, _immutable.List)());

          case 2:
            _context4.next = 4;
            return dataLoaders.get('userLoaderBySessionToken').load(sessionToken);

          case 4:
            user = _context4.sent;
            acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
            productPriceIdsWithoutDuplicate = productPriceIds.groupBy(function (_) {
              return _;
            }).map(function (_) {
              return _.first();
            }).valueSeq();
            _context4.t0 = _immutable2.default;
            _context4.next = 10;
            return Promise.all(productPriceIdsWithoutDuplicate.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(productPriceId) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt('return', addProductPriceToShoppingList(productPriceId, user.id, shoppingListId, acl, sessionToken));

                      case 1:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x12) {
                return _ref4.apply(this, arguments);
              };
            }()).toArray());

          case 10:
            _context4.t1 = _context4.sent;
            return _context4.abrupt('return', _context4.t0.fromJS.call(_context4.t0, _context4.t1));

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function addProductPricesToShoppingList(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = addProductPricesToShoppingList;