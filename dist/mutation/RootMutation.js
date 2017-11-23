'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _AddItemsToShoppingList = require('./AddItemsToShoppingList');

var _AddItemsToShoppingList2 = _interopRequireDefault(_AddItemsToShoppingList);

var _AddMasterProduct = require('./AddMasterProduct');

var _AddMasterProduct2 = _interopRequireDefault(_AddMasterProduct);

var _AddMyProduct = require('./AddMyProduct');

var _AddMyProduct2 = _interopRequireDefault(_AddMyProduct);

var _AddShoppingList = require('./AddShoppingList');

var _AddShoppingList2 = _interopRequireDefault(_AddShoppingList);

var _AddStore = require('./AddStore');

var _AddStore2 = _interopRequireDefault(_AddStore);

var _RemoveItemsFromShoppingList = require('./RemoveItemsFromShoppingList');

var _RemoveItemsFromShoppingList2 = _interopRequireDefault(_RemoveItemsFromShoppingList);

var _RemoveShoppingList = require('./RemoveShoppingList');

var _RemoveShoppingList2 = _interopRequireDefault(_RemoveShoppingList);

var _SubmitUserFeedback = require('./SubmitUserFeedback');

var _SubmitUserFeedback2 = _interopRequireDefault(_SubmitUserFeedback);

var _SetUserDefaultShoppingList = require('./SetUserDefaultShoppingList');

var _SetUserDefaultShoppingList2 = _interopRequireDefault(_SetUserDefaultShoppingList);

var _UpdateShoppingList = require('./UpdateShoppingList');

var _UpdateShoppingList2 = _interopRequireDefault(_UpdateShoppingList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItemsToShoppingList: _AddItemsToShoppingList2.default,
    addShoppingList: _AddShoppingList2.default,
    addMasterProduct: _AddMasterProduct2.default,
    addMyProduct: _AddMyProduct2.default,
    addStore: _AddStore2.default,
    removeItemsFromShoppingList: _RemoveItemsFromShoppingList2.default,
    removeShoppingList: _RemoveShoppingList2.default,
    setUserDefaultShoppingList: _SetUserDefaultShoppingList2.default,
    submitUserFeedback: _SubmitUserFeedback2.default,
    updateShoppingList: _UpdateShoppingList2.default
  }
});