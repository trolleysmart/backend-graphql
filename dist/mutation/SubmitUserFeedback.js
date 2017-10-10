'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'SubmitUserFeedback',
  inputFields: {
    feedback: { type: _graphql.GraphQLString }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, request) {
      var feedback = _ref2.feedback;
      var sessionToken, userLoaderBySessionToken, user, acl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sessionToken = request.headers.authorization;
              userLoaderBySessionToken = (0, _loader.createUserLoaderBySessionToken)();
              _context.next = 4;
              return userLoaderBySessionToken.load(sessionToken);

            case 4:
              user = _context.sent;
              acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
              return _context.abrupt('return', new _trolleySmartParseServerCommon.UserFeedbackService().create((0, _immutable.Map)({ userId: user.id, feedback: _immutable2.default.fromJS(JSON.parse(feedback)) }), acl, sessionToken));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});