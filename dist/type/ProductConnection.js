'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProducts = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _Product = require('./Product');

var _Product2 = _interopRequireDefault(_Product);

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ProductConnection = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Product',
  nodeType: _Product2.default
});

var getCriteria = function getCriteria(searchArgs) {
  return (0, _immutable.Map)({
    include_store: true,
    include_tags: true,
    include_storeProduct: true,
    conditions: (0, _immutable.Map)({
      contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
      contains_descriptions: (0, _Common.convertStringArgumentToSet)(searchArgs.get('description')),
      status: 'A',
      special: searchArgs.has('special') ? searchArgs.get('special') : undefined,
      tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
      storeIds: searchArgs.get('storeIds') ? searchArgs.get('storeIds') : undefined
    })
  });
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('PriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'priceToDisplay');
  }

  if (sortOption && sortOption.localeCompare('PriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'priceToDisplay');
  }

  if (sortOption && sortOption.localeCompare('SavingDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'saving');
  }

  if (sortOption && sortOption.localeCompare('SavingAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'saving');
  }

  if (sortOption && sortOption.localeCompare('SavingPercentageDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'savingPercentage');
  }

  if (sortOption && sortOption.localeCompare('SavingPercentageAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'savingPercentage');
  }

  if (sortOption && sortOption.localeCompare('OfferEndDateDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'offerEndDate');
  }

  if (sortOption && sortOption.localeCompare('OfferEndDateAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'offerEndDate');
  }

  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getProductPriceCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _trolleySmartParseServerCommon.ProductPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getProductPriceCountMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getProductPriceMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.ProductPriceService().search(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getProductPriceMatchCriteria(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getProducts = exports.getProducts = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, sessionToken) {
    var finalSearchArgs, count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, productPriceItems, indexedProductPriceItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t1 = searchArgs;

            if (!(searchArgs.has('storeKeys') && searchArgs.get('storeKeys'))) {
              _context3.next = 13;
              break;
            }

            _context3.t3 = _immutable.Map;
            _context3.t4 = _immutable2.default;
            _context3.next = 6;
            return _loader.storeLoaderByKey.loadMany(searchArgs.get('storeKeys').toJS());

          case 6:
            _context3.t5 = _context3.sent;

            _context3.t6 = function (store) {
              return store.get('id');
            };

            _context3.t7 = _context3.t4.fromJS.call(_context3.t4, _context3.t5).map(_context3.t6);
            _context3.t8 = {
              storeIds: _context3.t7
            };
            _context3.t2 = (0, _context3.t3)(_context3.t8);
            _context3.next = 14;
            break;

          case 13:
            _context3.t2 = (0, _immutable.Map)();

          case 14:
            _context3.t9 = _context3.t2;
            _context3.t0 = _context3.t1.merge.call(_context3.t1, _context3.t9);

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context3.next = 28;
              break;
            }

            _context3.t11 = _immutable.Map;
            _context3.t12 = _immutable2.default;
            _context3.next = 21;
            return _loader.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 21:
            _context3.t13 = _context3.sent;

            _context3.t14 = function (tag) {
              return tag.get('id');
            };

            _context3.t15 = _context3.t12.fromJS.call(_context3.t12, _context3.t13).map(_context3.t14);
            _context3.t16 = {
              tagIds: _context3.t15
            };
            _context3.t10 = (0, _context3.t11)(_context3.t16);
            _context3.next = 29;
            break;

          case 28:
            _context3.t10 = (0, _immutable.Map)();

          case 29:
            _context3.t17 = _context3.t10;
            finalSearchArgs = _context3.t0.merge.call(_context3.t0, _context3.t17);
            _context3.next = 33;
            return getProductPriceCountMatchCriteria(finalSearchArgs, sessionToken);

          case 33:
            count = _context3.sent;
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(finalSearchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context3.next = 37;
            return getProductPriceMatchCriteria(finalSearchArgs, sessionToken, limit, skip);

          case 37:
            productPriceItems = _context3.sent;
            indexedProductPriceItems = productPriceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedProductPriceItems.map(function (indexedItem) {
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

          case 43:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getProducts(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = ProductConnection;