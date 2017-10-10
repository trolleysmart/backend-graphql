'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStapleItems = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _loader = require('../loader');

var _StapleItem = require('./StapleItem');

var _StapleItem2 = _interopRequireDefault(_StapleItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, userId) {
  return (0, _immutable.Map)({
    include_tags: true,
    orderByFieldAscending: 'name',
    conditions: (0, _immutable.Map)({
      userId: userId,
      contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
      tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
      popular: searchArgs.has('popular') ? searchArgs.get('popular') : undefined
    })
  });
};

var getStapleItemsCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, userId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.StapleItemService().count(getCriteria(searchArgs, userId), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getStapleItemsCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getStapleItemsMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, userId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.StapleItemService().search(getCriteria(searchArgs, userId).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getStapleItemsMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getStapleItems = exports.getStapleItems = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, userLoaderBySessionToken, sessionToken) {
    var userId, finalSearchArgs, count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, stapleItems, indexedStapleItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.t0 = searchArgs;

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context3.next = 16;
              break;
            }

            _context3.t2 = _immutable.Map;
            _context3.t3 = _immutable2.default;
            _context3.next = 9;
            return _loader.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 9:
            _context3.t4 = _context3.sent;

            _context3.t5 = function (tag) {
              return tag.get('id');
            };

            _context3.t6 = _context3.t3.fromJS.call(_context3.t3, _context3.t4).map(_context3.t5);
            _context3.t7 = {
              tagIds: _context3.t6
            };
            _context3.t1 = (0, _context3.t2)(_context3.t7);
            _context3.next = 17;
            break;

          case 16:
            _context3.t1 = (0, _immutable.Map)();

          case 17:
            _context3.t8 = _context3.t1;
            finalSearchArgs = _context3.t0.merge.call(_context3.t0, _context3.t8);
            _context3.next = 21;
            return getStapleItemsCountMatchCriteria(finalSearchArgs, userId, sessionToken);

          case 21:
            count = _context3.sent;
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(finalSearchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context3.next = 25;
            return getStapleItemsMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);

          case 25:
            stapleItems = _context3.sent;
            indexedStapleItems = stapleItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedStapleItems.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context3.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 31:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getStapleItems(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'StapleItem',
  nodeType: _StapleItem2.default
});