'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSessionTokenAndUserIdKeyCombination = undefined;

var _immutable = require('immutable');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _mutation = require('../mutation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sessionTokenAndUserIdSeparator = '76ae3866-6977-411c-8443-d711ba8b86d3';

var createUserDefaultShoppingList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, sessionToken) {
    var shoppingListId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mutation.addShoppingListForProvidedUser)('My List', user, sessionToken);

          case 2:
            shoppingListId = _context.sent;
            _context.next = 5;
            return (0, _mutation.setUserDefaultShoppingListForProvidedUser)(shoppingListId, user, sessionToken);

          case 5:
            return _context.abrupt('return', shoppingListId);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createUserDefaultShoppingList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getSessionTokenAndUserIdFromKeyCombination = function getSessionTokenAndUserIdFromKeyCombination(key) {
  var results = key.split(sessionTokenAndUserIdSeparator);

  return {
    sessionToken: results[0],
    userId: results[1]
  };
};

var createSessionTokenAndUserIdKeyCombination = exports.createSessionTokenAndUserIdKeyCombination = function createSessionTokenAndUserIdKeyCombination(sessionToken, userId) {
  return sessionToken + sessionTokenAndUserIdSeparator + userId;
};

var createUserDefaultShoppingListLoader = function createUserDefaultShoppingListLoader() {
  return new _dataloader2.default(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(keys) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', Promise.all(keys.map(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
                  var _getSessionTokenAndUs, sessionToken, userId, defaultShoppingLists, user;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _getSessionTokenAndUs = getSessionTokenAndUserIdFromKeyCombination(key), sessionToken = _getSessionTokenAndUs.sessionToken, userId = _getSessionTokenAndUs.userId;
                          _context2.next = 3;
                          return new _trolleySmartParseServerCommon.DefaultShoppingListService().search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ userId: userId }) }), sessionToken);

                        case 3:
                          defaultShoppingLists = _context2.sent;

                          if (!defaultShoppingLists.isEmpty()) {
                            _context2.next = 11;
                            break;
                          }

                          _context2.next = 7;
                          return _microBusinessParseServerCommon.UserService.getUserForProvidedSessionToken(sessionToken);

                        case 7:
                          user = _context2.sent;
                          return _context2.abrupt('return', createUserDefaultShoppingList(user, sessionToken));

                        case 11:
                          if (!(defaultShoppingLists.count() === 1)) {
                            _context2.next = 13;
                            break;
                          }

                          return _context2.abrupt('return', defaultShoppingLists.first().get('shoppingListId'));

                        case 13:
                          throw new Error('Multiple default shopping lists found.');

                        case 14:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x4) {
                  return _ref3.apply(this, arguments);
                };
              }())));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.default = createUserDefaultShoppingListLoader;