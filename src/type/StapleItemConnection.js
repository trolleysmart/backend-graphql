// @flow

import Immutable, { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { StapleItemService } from '@trolleysmart/parse-server-common';
import StapleItem from './StapleItem';

const getCriteria = (searchArgs, userId) =>
  Map({
    include_tags: true,
    ids: searchArgs.has('stapleItemIds') ? searchArgs.get('stapleItemIds') : undefined,
    conditions: Map({
      userId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      tagIds: searchArgs.get('tagIds') ? searchArgs.get('tagIds') : undefined,
      popular: searchArgs.has('popular') ? searchArgs.get('popular') : undefined,
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
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

  if (sortOption && sortOption.localeCompare('PopularDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'popular');
  }

  if (sortOption && sortOption.localeCompare('PopularAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'popular');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getStapleItemsCountMatchCriteria = async (searchArgs, userId, sessionToken) =>
  new StapleItemService().count(addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption')), sessionToken);

const getStapleItemsMatchCriteria = async (searchArgs, userId, sessionToken, limit, skip) =>
  new StapleItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, userId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getStapleItems = async (searchArgs, dataLoaders, sessionToken) => {
  const { userLoaderBySessionToken, tagLoaderByKey } = dataLoaders;
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const finalSearchArgs = searchArgs.merge(searchArgs.has('tagKeys') && searchArgs.get('tagKeys')
    ? Map({
      tagIds: Immutable.fromJS(await tagLoaderByKey.loadMany(searchArgs.get('tagKeys').toJS())).map(tag => tag.get('id')),
    })
    : Map());
  const count = await getStapleItemsCountMatchCriteria(finalSearchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const stapleItems = await getStapleItemsMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);
  const indexedStapleItems = stapleItems.zip(Range(skip, skip + limit));
  const edges = indexedStapleItems.map(indexedItem => ({
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

export default connectionDefinitions({
  name: 'StapleItem',
  nodeType: StapleItem,
});
