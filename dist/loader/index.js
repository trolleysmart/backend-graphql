'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StoreLoader = require('./StoreLoader');

Object.defineProperty(exports, 'storeLoaderById', {
  enumerable: true,
  get: function get() {
    return _StoreLoader.storeLoaderById;
  }
});
Object.defineProperty(exports, 'storeLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _StoreLoader.storeLoaderByKey;
  }
});

var _TagLoader = require('./TagLoader');

Object.defineProperty(exports, 'tagLoaderById', {
  enumerable: true,
  get: function get() {
    return _TagLoader.tagLoaderById;
  }
});
Object.defineProperty(exports, 'tagLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _TagLoader.tagLoaderByKey;
  }
});