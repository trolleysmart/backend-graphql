'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _interface = require('../interface');

var _ShoppingLists = require('./ShoppingLists');

var _ShoppingLists2 = _interopRequireDefault(_ShoppingLists);

var _ShoppingListItems = require('./ShoppingListItems');

var _ShoppingListItems2 = _interopRequireDefault(_ShoppingListItems);

var _Products = require('./Products');

var _Products2 = _interopRequireDefault(_Products);

var _StapleItems = require('./StapleItems');

var _StapleItems2 = _interopRequireDefault(_StapleItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    shoppingLists: {
      type: _ShoppingLists2.default.ShoppingListConnectionDefinition.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        shoppingListIds: {
          type: new _graphql.GraphQLList(_graphql.GraphQLID)
        }
      }),
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, request) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _ShoppingLists.getShoppingLists)(_immutable2.default.fromJS(args), _.get('id'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    shoppingListItems: {
      type: _ShoppingListItems2.default.ShoppingListItemConnectionDefinition.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        shoppingListId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        },
        name: {
          type: _graphql.GraphQLString
        },
        addedByUserId: {
          type: _graphql.GraphQLID
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        storeKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        }
      }),
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, request) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _ShoppingListItems.getShoppingListItems)(_immutable2.default.fromJS(args), args.shoppingListId, request.headers.authorization));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    stapleItems: {
      type: _StapleItems2.default.StapleItemConnectionDefinition.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        }
      }),
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, request) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _StapleItems.getStapleItems)(_immutable2.default.fromJS(args), _.get('id'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    products: {
      type: _Products2.default.ProductConnectionDefinition.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        description: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        storeKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        special: {
          type: _graphql.GraphQLBoolean
        }
      }),
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, request) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _Products.getProducts)(_immutable2.default.fromJS(args), request.headers.authorization));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});