'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _MasterProductHelper = require('./MasterProductHelper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddMasterProduct',
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    description: { type: _graphql.GraphQLString },
    barcode: { type: _graphql.GraphQLString },
    size: { type: _graphql.GraphQLString }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
    },
    masterProduct: {
      type: _type.MasterProductConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('masterProduct');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var name = _ref2.name,
          description = _ref2.description,
          barcode = _ref2.barcode,
          size = _ref2.size;
      var sessionToken = _ref3.sessionToken,
          dataLoaders = _ref3.dataLoaders;
      var masterProductId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _MasterProductHelper.addMasterProduct)(name, description, barcode, size, sessionToken);

            case 3:
              masterProductId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 7;
              return (0, _type.getMasterProducts)((0, _immutable.Map)({ masterProductIds: _immutable.List.of(masterProductId) }), dataLoaders, sessionToken);

            case 7:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                masterProduct: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 12:
              _context.prev = 12;
              _context.t3 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t3 instanceof Error ? _context.t3.message : _context.t3 }));

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 12]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});