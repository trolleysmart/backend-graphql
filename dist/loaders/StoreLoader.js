'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeLoaderByKey = exports.storeLoaderById = undefined;

var _immutable = require('immutable');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _parseServerCommon = require('@trolleysmart/parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(key) {
  return (0, _immutable.Map)({
    include_parentStore: true,
    conditions: (0, _immutable.Map)({
      key: key
    })
  });
};

var storeLoaderById = exports.storeLoaderById = new _dataloader2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ids) {
    var storeService;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            storeService = new _parseServerCommon.StoreService();
            return _context2.abrupt('return', Promise.all(ids.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt('return', storeService.read(id, (0, _immutable.Map)({ include_parentStore: true })));

                      case 1:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }())));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var storeLoaderByKey = exports.storeLoaderByKey = new _dataloader2.default(function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(keys) {
    var storeService;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            storeService = new _parseServerCommon.StoreService();
            return _context4.abrupt('return', Promise.all(keys.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
                var stores;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return storeService.search(getCriteria(key));

                      case 2:
                        stores = _context3.sent;

                        if (!stores.isEmpty()) {
                          _context3.next = 7;
                          break;
                        }

                        throw new Error('Store not found with provided key: ' + key);

                      case 7:
                        if (!(stores.count() > 1)) {
                          _context3.next = 9;
                          break;
                        }

                        throw new Error('Multiple store found with provided key: ' + key);

                      case 9:
                        return _context3.abrupt('return', stores.first());

                      case 10:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }())));

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());