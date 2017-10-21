// @flow

import Immutable, { List, Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { ShoppingListItemService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import ShoppingListItem from './ShoppingListItem';
import { getUserDefaultShoppingListId } from './ShoppingList';

const getShoppingListItemsMatchCriteria = async (searchArgs, shoppingListId, sessionToken) => {
  let shoppingListItems = List();
  const criteria = Map({
    include_productPrice: true,
    include_stapleItem: true,
    include_store: true,
    include_tags: true,
    conditions: Map({
      shoppingListId,
      addedByUserId: searchArgs.get('addedByUserId') ? searchArgs.get('addedByUserId') : undefined,
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      doesNotExist_removedByUser: true,
      tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
      storeIds: searchArgs.get('storeIds') ? searchArgs.get('storeIds') : undefined,
    }),
  });

  const result = await new ShoppingListItemService().searchAll(criteria, sessionToken);

  try {
    result.event.subscribe((info) => {
      shoppingListItems = shoppingListItems.push(info);
    });

    await result.promise;
  } finally {
    result.event.unsubscribeAll();
  }

  return shoppingListItems;
};

export const getShoppingListItems = async (searchArgs, shoppingListId, dataLoaders, sessionToken) => {
  if (!shoppingListId) {
    return {
      edges: [],
      count: 0,
      pageInfo: {
        startCursor: 'cursor not available',
        endCursor: 'cursor not available',
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };
  }

  const finalSearchArgs = searchArgs
    .merge(searchArgs.has('storeKeys') && searchArgs.get('storeKeys')
      ? Map({
        storeIds: Immutable.fromJS(await dataLoaders.get('storeLoaderByKey').loadMany(searchArgs.get('storeKeys').toJS())).map(store =>
          store.get('id')),
      })
      : Map())
    .merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
      ? Map({
        tagIds: Immutable.fromJS(await dataLoaders.get('tagLoaderByKey').loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')),
      })
      : Map());
  const shoppingListItems = await getShoppingListItemsMatchCriteria(finalSearchArgs, shoppingListId, sessionToken);
  const stapleItems = shoppingListItems.filter(item => item.get('stapleItem')).groupBy(item => item.get('stapleItemId'));
  const productPrices = shoppingListItems.filter(item => item.get('productPrice')).groupBy(item => item.get('productPriceId'));
  const allShoppingListItems = stapleItems
    .keySeq()
    .map((key) => {
      const groupedStapleItems = stapleItems.get(key);

      return groupedStapleItems.first().merge(Map({ quantity: groupedStapleItems.count(), itemType: 'StapleItem' }));
    })
    .concat(productPrices.keySeq().map((key) => {
      const groupedProductPrices = productPrices.get(key);

      return groupedProductPrices.first().merge(Map({ quantity: groupedProductPrices.count(), itemType: 'ProductPrice' }));
    }));
  const count = allShoppingListItems.count();
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const indexedList = allShoppingListItems
    .skip(skip)
    .take(limit)
    .zip(Range(skip, skip + limit));
  const edges = indexedList.map(indexedItem => ({
    node: indexedItem[0],
    cursor: indexedItem[1] + 1,
  }));
  const firstEdge = edges.first();
  const lastEdge = edges.last();

  return {
    edges: edges.toArray(),
    count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
      endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
      hasPreviousPage,
      hasNextPage,
    },
  };
};

export const getUserDefaultShoppingListItems = async (searchArgs, dataLoaders, sessionToken) => {
  const shoppingListId = await getUserDefaultShoppingListId(dataLoaders, sessionToken);

  return getShoppingListItems(searchArgs, shoppingListId, dataLoaders, sessionToken);
};

export default connectionDefinitions({
  name: 'ShoppingListItem',
  nodeType: ShoppingListItem,
});
