'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagLoaderById = exports.tagLoaderByKey = exports.storeLoaderByKey = exports.storeLoaderById = exports.createUserLoaderBySessionToken = exports.createUserDefaultShoppingListLoader = exports.createConfigLoader = exports.getRootSchema = undefined;

var _loader = require('./loader');

Object.defineProperty(exports, 'createConfigLoader', {
  enumerable: true,
  get: function get() {
    return _loader.createConfigLoader;
  }
});
Object.defineProperty(exports, 'createUserDefaultShoppingListLoader', {
  enumerable: true,
  get: function get() {
    return _loader.createUserDefaultShoppingListLoader;
  }
});
Object.defineProperty(exports, 'createUserLoaderBySessionToken', {
  enumerable: true,
  get: function get() {
    return _loader.createUserLoaderBySessionToken;
  }
});
Object.defineProperty(exports, 'storeLoaderById', {
  enumerable: true,
  get: function get() {
    return _loader.storeLoaderById;
  }
});
Object.defineProperty(exports, 'storeLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loader.storeLoaderByKey;
  }
});
Object.defineProperty(exports, 'tagLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loader.tagLoaderByKey;
  }
});
Object.defineProperty(exports, 'tagLoaderById', {
  enumerable: true,
  get: function get() {
    return _loader.tagLoaderById;
  }
});

var _RootSchema = require('./RootSchema');

var _RootSchema2 = _interopRequireDefault(_RootSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getRootSchema = _RootSchema2.default;