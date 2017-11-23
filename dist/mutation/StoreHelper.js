'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStore = exports.addStoreForProvidedUser = undefined;

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addStoreForProvidedUser = exports.addStoreForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, address, user, sessionToken) {
    var acl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
            return _context.abrupt('return', new _trolleySmartParseServerCommon.StoreService().create((0, _immutable.Map)({
              key: (0, _v2.default)(),
              name: name,
              address: address,
              forDisplay: true,
              ownedByUser: user,
              status: 'I'
            }), acl, sessionToken));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addStoreForProvidedUser(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var addStore = exports.addStore = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, address, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', addStoreForProvidedUser(name, address, user, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addStore(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();