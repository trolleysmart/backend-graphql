'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyProducts = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _MyProduct = require('./MyProduct');

var _MyProduct2 = _interopRequireDefault(_MyProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId) {
  return (0, _immutable.Map)({
    include_tags: true,
    ids: searchArgs.has('myProductIds') ? searchArgs.get('myProductIds') : undefined,
    conditions: (0, _immutable.Map)({
      contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
      contains_descriptions: (0, _Common.convertStringArgumentToSet)(searchArgs.get('description')),
      ownedByUserId: ownedByUserId
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

var getMyProductPriceCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, dataLoaders, sessionToken) {
    var userId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context.sent.id;
            return _context.abrupt('return', new _trolleySmartParseServerCommon.MyProductService().count(addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption')), sessionToken));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMyProductPriceCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getMyProductPriceMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, dataLoaders, sessionToken, limit, skip) {
    var userId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context2.sent.id;
            return _context2.abrupt('return', new _trolleySmartParseServerCommon.MyProductService().search(addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMyProductPriceMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getMyProducts = exports.getMyProducts = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var finalSearchArgs, count, _getLimitAndSkipValue, limit, skip, hasNextPage, hasPreviousPage, productPriceItems, indexedMyProductPriceItems, edges, firstEdge, lastEdge;

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
            return getMyProductPriceCountMatchCriteria(finalSearchArgs, dataLoaders, sessionToken);

          case 18:
            count = _context3.sent;
            _getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(finalSearchArgs, count, 10, 1000), limit = _getLimitAndSkipValue.limit, skip = _getLimitAndSkipValue.skip, hasNextPage = _getLimitAndSkipValue.hasNextPage, hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage;
            _context3.next = 22;
            return getMyProductPriceMatchCriteria(finalSearchArgs, dataLoaders, sessionToken, limit, skip);

          case 22:
            productPriceItems = _context3.sent;
            indexedMyProductPriceItems = productPriceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedMyProductPriceItems.map(function (indexedItem) {
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

  return function getMyProducts(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'MyProduct',
  nodeType: _MyProduct2.default
});