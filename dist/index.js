'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagLoaderById = exports.tagLoaderByKey = exports.storeLoaderByKey = exports.storeLoaderById = exports.createUserDefaultShoppingListLoader = exports.getRootSchema = undefined;

var _loaders = require('./loaders');

Object.defineProperty(exports, 'createUserDefaultShoppingListLoader', {
  enumerable: true,
  get: function get() {
    return _loaders.createUserDefaultShoppingListLoader;
  }
});
Object.defineProperty(exports, 'storeLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.storeLoaderById;
  }
});
Object.defineProperty(exports, 'storeLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loaders.storeLoaderByKey;
  }
});
Object.defineProperty(exports, 'tagLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loaders.tagLoaderByKey;
  }
});
Object.defineProperty(exports, 'tagLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.tagLoaderById;
  }
});

var _RootSchema = require('./RootSchema');

var _RootSchema2 = _interopRequireDefault(_RootSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getRootSchema = _RootSchema2.default;