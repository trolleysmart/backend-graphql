'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProducts = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@trolleysmart/parse-server-common');

var _Product = require('./Product');

var _Product2 = _interopRequireDefault(_Product);

var _Store = require('./Store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, dataLoaders) {
    var productSearchConfig;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dataLoaders.configLoader.load('productSearch');

          case 2:
            productSearchConfig = _context.sent;
            return _context.abrupt('return', (0, _immutable.Map)({
              include_store: true,
              include_tags: true,
              include_storeProduct: true,
              ids: searchArgs.has('productIds') ? searchArgs.get('productIds') : undefined,
              conditions: (0, _immutable.Map)({
                contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
                contains_descriptions: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
                status: 'A'
              }).merge(productSearchConfig.get('returnCrawledProducts') ? (0, _immutable.Map)() : (0, _immutable.Map)({ createdByCrawler: false })).merge(productSearchConfig.get('returnUnauthorizedProductToDisplay') ? (0, _immutable.Map)() : (0, _immutable.Map)({ authorizedToDisplay: true })).merge(productSearchConfig.get('returnProductsOnSpecialOnly') ? (0, _immutable.Map)({ special: true }) : (0, _immutable.Map)()).merge(!productSearchConfig.get('returnProductsOnSpecialOnly') && searchArgs.has('special') ? (0, _immutable.Map)({ special: searchArgs.get('special') }) : (0, _immutable.Map)()).merge(searchArgs.has('tagIds') ? (0, _immutable.Map)({ tagIds: searchArgs.get('tagIds') }) : (0, _immutable.Map)()).merge(searchArgs.has('storeIds') ? (0, _immutable.Map)({ storeIds: searchArgs.get('storeIds') }) : (0, _immutable.Map)())
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, dataLoaders, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = new _parseServerCommon.ProductPriceService();
            _context2.t1 = addSortOptionToCriteria;
            _context2.next = 4;
            return getCriteria(searchArgs, dataLoaders);

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

  return function getProductPriceCountMatchCriteria(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getProductPriceMatchCriteria = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = new _parseServerCommon.ProductPriceService();
            _context3.t1 = addSortOptionToCriteria;
            _context3.next = 4;
            return getCriteria(searchArgs, dataLoaders);

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

  return function getProductPriceMatchCriteria(_x6, _x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var getProducts = exports.getProducts = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(searchArgs, dataLoaders, sessionToken) {
    var finalSearchArgs, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, productPriceItems, indexedProductPriceItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t1 = searchArgs;

            if (!(searchArgs.has('storeKeys') && searchArgs.get('storeKeys'))) {
              _context4.next = 11;
              break;
            }

            _context4.t3 = _immutable.Map;
            _context4.next = 5;
            return (0, _Store.getAllStoresToFilterBy)(searchArgs.get('storeKeys'), dataLoaders);

          case 5:
            _context4.t4 = function (store) {
              return store.get('id');
            };

            _context4.t5 = _context4.sent.map(_context4.t4);
            _context4.t6 = {
              storeIds: _context4.t5
            };
            _context4.t2 = (0, _context4.t3)(_context4.t6);
            _context4.next = 12;
            break;

          case 11:
            _context4.t2 = (0, _immutable.Map)();

          case 12:
            _context4.t7 = _context4.t2;
            _context4.t0 = _context4.t1.merge.call(_context4.t1, _context4.t7);

            if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
              _context4.next = 26;
              break;
            }

            _context4.t9 = _immutable.Map;
            _context4.t10 = _immutable2.default;
            _context4.next = 19;
            return dataLoaders.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

          case 19:
            _context4.t11 = _context4.sent;

            _context4.t12 = function (tag) {
              return tag.get('id');
            };

            _context4.t13 = _context4.t10.fromJS.call(_context4.t10, _context4.t11).map(_context4.t12);
            _context4.t14 = {
              tagIds: _context4.t13
            };
            _context4.t8 = (0, _context4.t9)(_context4.t14);
            _context4.next = 27;
            break;

          case 26:
            _context4.t8 = (0, _immutable.Map)();

          case 27:
            _context4.t15 = _context4.t8;
            finalSearchArgs = _context4.t0.merge.call(_context4.t0, _context4.t15);
            _context4.next = 31;
            return getProductPriceCountMatchCriteria(finalSearchArgs, dataLoaders, sessionToken);

          case 31:
            count = _context4.sent;
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context4.next = 35;
            return getProductPriceMatchCriteria(finalSearchArgs, dataLoaders, sessionToken, limit, skip);

          case 35:
            productPriceItems = _context4.sent;
            indexedProductPriceItems = productPriceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedProductPriceItems.map(function (indexedItem) {
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

          case 41:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getProducts(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Product',
  nodeType: _Product2.default
});