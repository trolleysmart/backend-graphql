'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getShoppingListItems = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _trolleySmartParseServerCommon = require('trolley-smart-parse-server-common');

var _Common = require('./Common');

var _interface = require('../interface');

var _MultiBuy = require('./MultiBuy');

var _MultiBuy2 = _interopRequireDefault(_MultiBuy);

var _UnitPrice = require('./UnitPrice');

var _UnitPrice2 = _interopRequireDefault(_UnitPrice);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Stores = require('./Stores');

var _Stores2 = _interopRequireDefault(_Stores);

var _loader = require('../loader');

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

var ShoppingListItemType = new _graphql.GraphQLObjectType({
  name: 'ShoppingListItem',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      },
    },
    itemType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('itemType');
      },
    },
    stapleItemId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('stapleItemId');
      },
    },
    productPriceId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('productPriceId');
      },
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      },
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      },
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('stapleItemId') ? _.get('imageUrl') : _.getIn(['productPrice', 'imageUrl']);
      },
    },
    barcode: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'barcode']);
      },
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'size']);
      },
    },
    productPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'productPageUrl']);
      },
    },
    specialType: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'specialType']);
      },
    },
    priceToDisplay: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceToDisplay']);
      },
    },
    saving: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'saving']);
      },
    },
    savingPercentage: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'savingPercentage']);
      },
    },
    currentPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'currentPrice']);
      },
    },
    wasPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'wasPrice']);
      },
    },
    multiBuy: {
      type: _MultiBuy2.default,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'multiBuyInfo']);
      },
    },
    unitPrice: {
      type: _UnitPrice2.default,
      resolve: function resolve(_) {
        return _.getIn(['productPrice', 'priceDetails', 'unitPrice']);
      },
    },
    offerEndDate: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        var offerEndDate = _.getIn(['productPrice', 'offerEndDate']);

        return offerEndDate ? offerEndDate.toISOString() : undefined;
      },
    },
    quantity: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('quantity');
      },
    },
    comments: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('comments');
      },
    },
    store: {
      type: _Stores2.default.StoreType,
      resolve: function resolve(_) {
        return _.get('store');
      },
    },
    tags: {
      type: new _graphql.GraphQLList(_Tag2.default),
      resolve: function resolve(_) {
        return _.get('tags');
      },
    },
  },
  interfaces: [_interface.NodeInterface],
});

var ShoppingListItemConnectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ShoppingListItem',
  nodeType: ShoppingListItemType,
});

var getShoppingListItemsMatchCriteria = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(searchArgs, shoppingListId, sessionToken) {
      var shoppingListItems, criteria, result;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                shoppingListItems = (0, _immutable.List)();
                criteria = (0, _immutable.Map)({
                  include_productPrice: true,
                  include_stapleItem: true,
                  include_store: true,
                  include_tags: true,
                  conditions: (0, _immutable.Map)({
                    shoppingListId: shoppingListId,
                    addedByUserId: searchArgs.get('addedByUserId') ? searchArgs.get('addedByUserId') : undefined,
                    contains_names: (0, _Common.convertStringArgumentToSet)(searchArgs.get('name')),
                    doesNotExist_removedByUser: true,
                    tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
                    storeIds: searchArgs.get('storeIds') ? searchArgs.get('storeIds') : undefined,
                  }),
                });
                _context.next = 4;
                return new _trolleySmartParseServerCommon.ShoppingListItemService().searchAll(criteria, sessionToken);

              case 4:
                result = _context.sent;
                _context.prev = 5;

                result.event.subscribe(function(info) {
                  shoppingListItems = shoppingListItems.push(info);
                });

                _context.next = 9;
                return result.promise;

              case 9:
                _context.prev = 9;

                result.event.unsubscribeAll();
                return _context.finish(9);

              case 12:
                return _context.abrupt('return', shoppingListItems);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
        [[5, , 9, 12]],
      );
    }),
  );

  return function getShoppingListItemsMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var getShoppingListItems = (exports.getShoppingListItems = (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(searchArgs, shoppingListId, sessionToken) {
      var finalSearchArgs,
        shoppingListItems,
        stapleItems,
        productPrices,
        allShoppingListItems,
        count,
        _getLimitAndSkipValue,
        limit,
        skip,
        hasNextPage,
        hasPreviousPage,
        indexedList,
        edges,
        firstEdge,
        lastEdge;

      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t1 = searchArgs;

                if (!(searchArgs.has('storeKeys') && searchArgs.get('storeKeys'))) {
                  _context2.next = 13;
                  break;
                }

                _context2.t3 = _immutable.Map;
                _context2.t4 = _immutable2.default;
                _context2.next = 6;
                return _loader.storeLoaderByKey.loadMany(searchArgs.get('storeKeys').toJS());

              case 6:
                _context2.t5 = _context2.sent;

                _context2.t6 = function(store) {
                  return store.get('id');
                };

                _context2.t7 = _context2.t4.fromJS.call(_context2.t4, _context2.t5).map(_context2.t6);
                _context2.t8 = {
                  storeIds: _context2.t7,
                };
                _context2.t2 = (0, _context2.t3)(_context2.t8);
                _context2.next = 14;
                break;

              case 13:
                _context2.t2 = (0, _immutable.Map)();

              case 14:
                _context2.t9 = _context2.t2;
                _context2.t0 = _context2.t1.merge.call(_context2.t1, _context2.t9);

                if (!(searchArgs.has('tagKeys') && searchArgs.get('tagKeys'))) {
                  _context2.next = 28;
                  break;
                }

                _context2.t11 = _immutable.Map;
                _context2.t12 = _immutable2.default;
                _context2.next = 21;
                return _loader.tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS());

              case 21:
                _context2.t13 = _context2.sent;

                _context2.t14 = function(tag) {
                  return tag.get('id');
                };

                _context2.t15 = _context2.t12.fromJS.call(_context2.t12, _context2.t13).map(_context2.t14);
                _context2.t16 = {
                  tagIds: _context2.t15,
                };
                _context2.t10 = (0, _context2.t11)(_context2.t16);
                _context2.next = 29;
                break;

              case 28:
                _context2.t10 = (0, _immutable.Map)();

              case 29:
                _context2.t17 = _context2.t10;
                finalSearchArgs = _context2.t0.merge.call(_context2.t0, _context2.t17);
                _context2.next = 33;
                return getShoppingListItemsMatchCriteria(finalSearchArgs, shoppingListId, sessionToken);

              case 33:
                shoppingListItems = _context2.sent;
                stapleItems = shoppingListItems
                  .filter(function(item) {
                    return item.get('stapleItem');
                  })
                  .groupBy(function(item) {
                    return item.get('stapleItemId');
                  });
                productPrices = shoppingListItems
                  .filter(function(item) {
                    return item.get('productPrice');
                  })
                  .groupBy(function(item) {
                    return item.get('productPriceId');
                  });
                allShoppingListItems = stapleItems
                  .keySeq()
                  .map(function(key) {
                    var groupedStapleItems = stapleItems.get(key);

                    return groupedStapleItems.first().merge((0, _immutable.Map)({ quantity: groupedStapleItems.count(), itemType: 'StapleItem' }));
                  })
                  .concat(
                    productPrices.keySeq().map(function(key) {
                      var groupedProductPrices = productPrices.get(key);

                      return groupedProductPrices
                        .first()
                        .merge((0, _immutable.Map)({ quantity: groupedProductPrices.count(), itemType: 'ProductPrice' }));
                    }),
                  );
                count = allShoppingListItems.count();
                (_getLimitAndSkipValue = (0, _Common.getLimitAndSkipValue)(searchArgs, count, 10, 1000)),
                  (limit = _getLimitAndSkipValue.limit),
                  (skip = _getLimitAndSkipValue.skip),
                  (hasNextPage = _getLimitAndSkipValue.hasNextPage),
                  (hasPreviousPage = _getLimitAndSkipValue.hasPreviousPage);
                indexedList = allShoppingListItems
                  .skip(skip)
                  .take(limit)
                  .zip((0, _immutable.Range)(skip, skip + limit));
                edges = indexedList.map(function(indexedItem) {
                  return {
                    node: indexedItem[0],
                    cursor: indexedItem[1] + 1,
                  };
                });
                firstEdge = edges.first();
                lastEdge = edges.last();
                return _context2.abrupt('return', {
                  edges: edges.toArray(),
                  count: count,
                  pageInfo: {
                    startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                    endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                    hasPreviousPage: hasPreviousPage,
                    hasNextPage: hasNextPage,
                  },
                });

              case 44:
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

  return function getShoppingListItems(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})());

exports.default = { ShoppingListItemType: ShoppingListItemType, ShoppingListItemConnectionDefinition: ShoppingListItemConnectionDefinition };
