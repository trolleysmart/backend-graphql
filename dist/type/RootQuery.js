'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _Viewer = require('./Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _interface = require('../interface');

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: _User2.default,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, request) {
          var configLoader, userLoaderBySessionToken, userId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  configLoader = (0, _loader.createConfigLoader)();
                  userLoaderBySessionToken = (0, _loader.createUserLoaderBySessionToken)();
                  _context.next = 4;
                  return userLoaderBySessionToken.load(request.headers.authorization);

                case 4:
                  userId = _context.sent.id;
                  return _context.abrupt('return', (0, _immutable.Map)({ id: userId, dataLoaders: (0, _immutable.Map)({ configLoader: configLoader, userLoaderBySessionToken: userLoaderBySessionToken }) }));

                case 6:
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
    viewer: {
      type: _Viewer2.default,
      resolve: function resolve() {
        return (0, _immutable.Map)({ id: 'ViewerId' });
      }
    },
    node: _interface.NodeField
  }
});