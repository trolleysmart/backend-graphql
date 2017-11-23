'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMyProduct = exports.addMyProductForProvidedUser = undefined;

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addMyProductForProvidedUser = exports.addMyProductForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, description, barcode, productPageUrl, size, user, sessionToken) {
    var acl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
            return _context.abrupt('return', new _trolleySmartParseServerCommon.MyProductService().create((0, _immutable.Map)({
              name: name,
              description: description,
              barcode: barcode,
              productPageUrl: productPageUrl,
              size: size,
              ownedByUser: user
            }), acl, sessionToken));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addMyProductForProvidedUser(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

var addMyProduct = exports.addMyProduct = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, description, barcode, productPageUrl, size, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', addMyProductForProvidedUser(name, description, barcode, productPageUrl, size, user, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addMyProduct(_x8, _x9, _x10, _x11, _x12, _x13, _x14) {
    return _ref2.apply(this, arguments);
  };
}();