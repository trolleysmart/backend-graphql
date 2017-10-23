'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createUserDefaultShoppingList = undefined;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _mutation = require('../mutation');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

var createUserDefaultShoppingList = (exports.createUserDefaultShoppingList = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(user, sessionToken) {
      var shoppingListId;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
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
        },
        _callee,
        undefined,
      );
    }),
  );

  return function createUserDefaultShoppingList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

var createUserDefaultShoppingListLoader = function createUserDefaultShoppingListLoader() {
  return new _dataloader2.default(
    (function() {
      var _ref2 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(sessionTokens) {
          return regeneratorRuntime.wrap(
            function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    return _context3.abrupt(
                      'return',
                      Promise.all(
                        sessionTokens.map(
                          (function() {
                            var _ref3 = _asyncToGenerator(
                              /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(sessionToken) {
                                var user, defaultShoppingLists;
                                return regeneratorRuntime.wrap(
                                  function _callee2$(_context2) {
                                    while (1) {
                                      switch ((_context2.prev = _context2.next)) {
                                        case 0:
                                          _context2.next = 2;
                                          return _microBusinessParseServerCommon.UserService.getUserForProvidedSessionToken(sessionToken);

                                        case 2:
                                          user = _context2.sent;
                                          _context2.next = 5;
                                          return new _trolleySmartParseServerCommon.DefaultShoppingListService().search(
                                            Map({ conditions: Map({ userId: user.id }) }),
                                            sessionToken,
                                          );

                                        case 5:
                                          defaultShoppingLists = _context2.sent;

                                          if (!defaultShoppingLists.isEmpty()) {
                                            _context2.next = 10;
                                            break;
                                          }

                                          return _context2.abrupt('return', createUserDefaultShoppingList(user, sessionToken));

                                        case 10:
                                          if (!(defaultShoppingLists.count() === 1)) {
                                            _context2.next = 12;
                                            break;
                                          }

                                          return _context2.abrupt('return', defaultShoppingLists.first().get('shoppingListId'));

                                        case 12:
                                          throw new Error('Multiple default shopping lists found.');

                                        case 13:
                                        case 'end':
                                          return _context2.stop();
                                      }
                                    }
                                  },
                                  _callee2,
                                  undefined,
                                );
                              }),
                            );

                            return function(_x4) {
                              return _ref3.apply(this, arguments);
                            };
                          })(),
                        ),
                      ),
                    );

                  case 1:
                  case 'end':
                    return _context3.stop();
                }
              }
            },
            _callee3,
            undefined,
          );
        }),
      );

      return function(_x3) {
        return _ref2.apply(this, arguments);
      };
    })(),
  );
};

exports.default = createUserDefaultShoppingListLoader;
