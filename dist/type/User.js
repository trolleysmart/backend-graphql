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

var _ShoppingList = require('./ShoppingList');

var _ShoppingList2 = _interopRequireDefault(_ShoppingList);

var _ShoppingListConnection = require('./ShoppingListConnection');

var _ShoppingListConnection2 = _interopRequireDefault(_ShoppingListConnection);

var _ShoppingListItemConnection = require('./ShoppingListItemConnection');

var _ShoppingListItemConnection2 = _interopRequireDefault(_ShoppingListItemConnection);

var _Product = require('./Product');

var _Product2 = _interopRequireDefault(_Product);

var _ProductConnection = require('./ProductConnection');

var _ProductConnection2 = _interopRequireDefault(_ProductConnection);

var _StapleItemConnection = require('./StapleItemConnection');

var _StapleItemConnection2 = _interopRequireDefault(_StapleItemConnection);

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
      type: _ShoppingListConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        shoppingListIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        }
      }),
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, request) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _ShoppingListConnection.getShoppingLists)(_immutable2.default.fromJS(args), _.get('dataLoaders'), request.headers.authorization));

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
    defaultShoppingList: {
      type: _ShoppingList2.default,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, request) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _ShoppingList.getUserDefaultShoppingList)(_.get('dataLoaders'), request.headers.authorization));

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
    shoppingList: {
      type: _ShoppingList2.default,
      args: {
        shoppingListId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref4, request) {
          var shoppingListId = _ref4.shoppingListId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _ShoppingList.getShoppingList)(shoppingListId, request.headers.authorization));

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
    defaultShoppingListItems: {
      type: _ShoppingListItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, request) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _ShoppingListItemConnection.getUserDefaultShoppingListItems)(_immutable2.default.fromJS(args), _.get('dataLoaders'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    shoppingListItems: {
      type: _ShoppingListItemConnection2.default.connectionType,
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
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, request) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', (0, _ShoppingListItemConnection.getShoppingListItems)(_immutable2.default.fromJS(args), args.shoppingListId, request.headers.authorization));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    stapleItems: {
      type: _StapleItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString
        },
        tagKeys: {
          type: new _graphql.GraphQLList(_graphql.GraphQLString)
        }
      }),
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, request) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', (0, _StapleItemConnection.getStapleItems)(_immutable2.default.fromJS(args), _.get('dataLoaders'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x16, _x17, _x18) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    products: {
      type: _ProductConnection2.default.connectionType,
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
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args, request) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', (0, _ProductConnection.getProducts)(_immutable2.default.fromJS(args), _.get('dataLoaders'), request.headers.authorization));

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x19, _x20, _x21) {
          return _ref8.apply(this, arguments);
        };
      }()
    },
    product: {
      type: _Product2.default,
      args: {
        productId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref10, request) {
          var productId = _ref10.productId;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt('return', (0, _Product.getProduct)(productId, request.headers.authorization));

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x22, _x23, _x24) {
          return _ref9.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});