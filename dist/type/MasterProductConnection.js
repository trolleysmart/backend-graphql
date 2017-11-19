'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMasterProducts = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _MasterProduct = require('./MasterProduct');

var _MasterProduct2 = _interopRequireDefault(_MasterProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _immutable.Map)({
              include_tags: true,
              conditions: (0, _immutable.Map)({
                contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
                contains_descriptions: (0, _Common.convertStringArgumentToSet)(searchArgs.get('description'))
              }).merge(searchArgs.has('tagIds') ? (0, _immutable.Map)({ tagIds: searchArgs.get('tagIds') }) : (0, _immutable.Map)())
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getCriteria(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getMasterProductPriceCountMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = new _trolleySmartParseServerCommon.MasterProductService();
            _context2.t1 = addSortOptionToCriteria;
            _context2.next = 4;
            return getCriteria(searchArgs);

          case 4:
            _context2.t2 = _context2.sent;
            _context2.t3 = searchArgs.get('sortOption');
            _context2.t4 = (0, _context2.t1)(_context2.t2, _context2.t3);
            _context2.t5 = sessionToken;
            return _context2.abrupt('return', _context2.t0.count.call(_context2.t0, _context2.t4, _context2.t5));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMasterProductPriceCountMatchCriteria(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getMasterProductPriceMatchCriteria = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = new _trolleySmartParseServerCommon.MasterProductService();
            _context3.t1 = addSortOptionToCriteria;
            _context3.next = 4;
            return getCriteria(searchArgs);

          case 4:
            _context3.t2 = _context3.sent;
            _context3.t3 = searchArgs.get('sortOption');
            _context3.t4 = limit;
            _context3.t5 = skip;
            _context3.t6 = (0, _context3.t1)(_context3.t2, _context3.t3).set('limit', _context3.t4).set('skip', _context3.t5);
            _context3.t7 = sessionToken;
            return _context3.abrupt('return', _context3.t0.search.call(_context3.t0, _context3.t6, _context3.t7));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getMasterProductPriceMatchCriteria(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var getMasterProducts = exports.getMasterProducts = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(searchArgs, dataLoaders, sessionToken) {
    var finalSearchArgs, count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, productPriceItems, indexedMasterProductPriceItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = searchArgs;

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context4.next = 13;
              break;
            }

            _context4.t2 = _immutable.Map;
            _context4.t3 = _immutable2.default;
            _context4.next = 6;
            return dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 6:
            _context4.t4 = _context4.sent;

            _context4.t5 = function (tag) {
              return tag.get('id');
            };

            _context4.t6 = _context4.t3.fromJS.call(_context4.t3, _context4.t4).map(_context4.t5);
            _context4.t7 = {
              tagIds: _context4.t6
            };
            _context4.t1 = (0, _context4.t2)(_context4.t7);
            _context4.next = 14;
            break;

          case 13:
            _context4.t1 = (0, _immutable.Map)();

          case 14:
            _context4.t8 = _context4.t1;
            finalSearchArgs = _context4.t0.merge.call(_context4.t0, _context4.t8);
            _context4.next = 18;
            return getMasterProductPriceCountMatchCriteria(finalSearchArgs, sessionToken);

          case 18:
            count = _context4.sent;
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(finalSearchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context4.next = 22;
            return getMasterProductPriceMatchCriteria(finalSearchArgs, sessionToken, limit, skip);

          case 22:
            productPriceItems = _context4.sent;
            indexedMasterProductPriceItems = productPriceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedMasterProductPriceItems.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context4.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 28:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getMasterProducts(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'MasterProduct',
  nodeType: _MasterProduct2.default
});