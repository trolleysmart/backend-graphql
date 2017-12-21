'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMasterProducts = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@trolleysmart/parse-server-common');

var _MasterProduct = require('./MasterProduct');

var _MasterProduct2 = _interopRequireDefault(_MasterProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs) {
  return (0, _immutable.Map)({
    include_tags: true,
    ids: searchArgs.has('masterProductIds') ? searchArgs.get('masterProductIds') : undefined,
    conditions: (0, _immutable.Map)({
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('description'))
    }).merge(searchArgs.has('tagIds') ? (0, _immutable.Map)({ tagIds: searchArgs.get('tagIds') }) : (0, _immutable.Map)())
  });
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'description');
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'description');
  }

  if (sortOption && sortOption.localeCompare('BarcodeDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'barcode');
  }

  if (sortOption && sortOption.localeCompare('BarcodeAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'barcode');
  }

  if (sortOption && sortOption.localeCompare('SizeDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'size');
  }

  if (sortOption && sortOption.localeCompare('SizeAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'size');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getMasterProductPriceCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.MasterProductService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMasterProductPriceCountMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getMasterProductPriceMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.MasterProductService().search(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMasterProductPriceMatchCriteria(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getMasterProducts = exports.getMasterProducts = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var finalSearchArgs, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, productPriceItems, indexedMasterProductPriceItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = searchArgs;

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context3.next = 13;
              break;
            }

            _context3.t2 = _immutable.Map;
            _context3.t3 = _immutable2.default;
            _context3.next = 6;
            return dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 6:
            _context3.t4 = _context3.sent;

            _context3.t5 = function (tag) {
              return tag.get('id');
            };

            _context3.t6 = _context3.t3.fromJS.call(_context3.t3, _context3.t4).map(_context3.t5);
            _context3.t7 = {
              tagIds: _context3.t6
            };
            _context3.t1 = (0, _context3.t2)(_context3.t7);
            _context3.next = 14;
            break;

          case 13:
            _context3.t1 = (0, _immutable.Map)();

          case 14:
            _context3.t8 = _context3.t1;
            finalSearchArgs = _context3.t0.merge.call(_context3.t0, _context3.t8);
            _context3.next = 18;
            return getMasterProductPriceCountMatchCriteria(finalSearchArgs, sessionToken);

          case 18:
            count = _context3.sent;
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 22;
            return getMasterProductPriceMatchCriteria(finalSearchArgs, sessionToken, limit, skip);

          case 22:
            productPriceItems = _context3.sent;
            indexedMasterProductPriceItems = productPriceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedMasterProductPriceItems.map(function (indexedItem) {
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

          case 28:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getMasterProducts(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'MasterProduct',
  nodeType: _MasterProduct2.default
});