'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _AddShoppingList = require('./AddShoppingList');

var _AddShoppingList2 = _interopRequireDefault(_AddShoppingList);

var _UpdateShoppingList = require('./UpdateShoppingList');

var _UpdateShoppingList2 = _interopRequireDefault(_UpdateShoppingList);

var _RemoveShoppingList = require('./RemoveShoppingList');

var _RemoveShoppingList2 = _interopRequireDefault(_RemoveShoppingList);

var _AddItemsToShoppingList = require('./AddItemsToShoppingList');

var _AddItemsToShoppingList2 = _interopRequireDefault(_AddItemsToShoppingList);

var _RemoveItemsFromShoppingList = require('./RemoveItemsFromShoppingList');

var _RemoveItemsFromShoppingList2 = _interopRequireDefault(_RemoveItemsFromShoppingList);

var _SubmitUserFeedback = require('./SubmitUserFeedback');

var _SubmitUserFeedback2 = _interopRequireDefault(_SubmitUserFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addShoppingList: _AddShoppingList2.default,
    removeShoppingList: _RemoveShoppingList2.default,
    updateShoppingList: _UpdateShoppingList2.default,
    addItemsToShoppingList: _AddItemsToShoppingList2.default,
    removeItemsFromShoppingList: _RemoveItemsFromShoppingList2.default,
    submitUserFeedback: _SubmitUserFeedback2.default
  }
});