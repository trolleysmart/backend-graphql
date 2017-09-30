'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _interface = require('../interface');

var _TagConnection = require('./TagConnection');

var _TagConnection2 = _interopRequireDefault(_TagConnection);

var _StoreConnection = require('./StoreConnection');

var _StoreConnection2 = _interopRequireDefault(_StoreConnection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

exports.default = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      },
    },
    tags: {
      type: _TagConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString,
        },
        level: {
          type: _graphql.GraphQLInt,
        },
        forDisplay: {
          type: _graphql.GraphQLBoolean,
        },
      }),
      resolve: (function() {
        var _ref = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_, args, request) {
            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      return _context.abrupt('return', (0, _TagConnection.getTags)(_immutable2.default.fromJS(args), request.headers.authorization));

                    case 1:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              undefined,
            );
          }),
        );

        return function resolve(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      })(),
    },
    stores: {
      type: _StoreConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        name: {
          type: _graphql.GraphQLString,
        },
      }),
      resolve: (function() {
        var _ref2 = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_, args, request) {
            return regeneratorRuntime.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      return _context2.abrupt(
                        'return',
                        (0, _StoreConnection.getStores)(_immutable2.default.fromJS(args), request.headers.authorization),
                      );

                    case 1:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              undefined,
            );
          }),
        );

        return function resolve(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      })(),
    },
  },
  interfaces: [_interface.NodeInterface],
});