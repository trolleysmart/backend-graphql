'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getStores = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

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

var StoreConnection = (0, _graphqlRelay.connectionDefinitions)({
  name: 'StoreType',
  nodeType: _Store2.default,
});

var getCriteria = function getCriteria(searchArgs) {
  return (0, _immutable.Map)({
    include_parentStore: true,
    orderByFieldAscending: 'name',
    conditions: (0, _immutable.Map)({
      contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
    }),
  });
};

var getStoresCountMatchCriteria = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(searchArgs, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                return _context.abrupt('return', new _trolleySmartParseServerCommon.StoreService().count(getCriteria(searchArgs), sessionToken));

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

  return function getStoresCountMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var getStoresMatchCriteria = (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(searchArgs, sessionToken, limit, skip) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                return _context2.abrupt(
                  'return',
                  new _trolleySmartParseServerCommon.StoreService().search(
                    getCriteria(searchArgs)
                      .set('limit', limit)
                      .set('skip', skip),
                    sessionToken,
                  ),
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

  return function getStoresMatchCriteria(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

var getStores = (exports.getStores = (function() {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(searchArgs, sessionToken) {
      var count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, stores, indexedStores, edges, firstEdge, lastEdge;

      return regeneratorRuntime.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return getStoresCountMatchCriteria(searchArgs, sessionToken);

              case 2:
                count = _context3.sent;
                (_getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(searchArgs, count, 10, 1000)),
                  (limit = _getLimitAndSkipValue.limit),
                  (skip = _getLimitAndSkipValue.skip),
                  (hasNextPage = _getLimitAndSkipValue.hasNextPage),
                  (hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage);
                _context3.next = 6;
                return getStoresMatchCriteria(searchArgs, sessionToken, limit, skip);

              case 6:
                stores = _context3.sent;
                indexedStores = stores.zip((0, _immutable.Range)(skip, skip + limit));
                edges = indexedStores.map(function(indexedItem) {
                  return {
                    node: indexedItem[0],
                    cursor: indexedItem[1] + 1,
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
                    hasNextPage: hasNextPage,
                  },
                });

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee3,
        undefined,
      );
    }),
  );

  return function getStores(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})());

exports.default = StoreConnection;
