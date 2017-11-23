// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { TagService } from 'trolley-smart-parse-server-common';
import { getLimitAndSkipValue, convertStringArgumentToSet } from './Common';
import Tag from './Tag';

const getCriteria = searchArgs =>
  Map({
    include_parentTag: true,
    ids: searchArgs.has('tagIds') ? searchArgs.get('tagIds') : undefined,
    conditions: Map({
      contains_names: convertStringArgumentToSet(searchArgs.get('name')),
      forDisplay: searchArgs.has('forDisplay') ? searchArgs.get('forDisplay') : undefined,
      level: searchArgs.has('level') ? searchArgs.get('level') : undefined,
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

  if (sortOption && sortOption.localeCompare('LevelDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'level');
  }

  if (sortOption && sortOption.localeCompare('LevelAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'level');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getTagsCountMatchCriteria = async (searchArgs, sessionToken) =>
  new TagService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getTagsMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new TagService().search(
    addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getTags = async (searchArgs, sessionToken) => {
  const count = await getTagsCountMatchCriteria(searchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const tags = await getTagsMatchCriteria(searchArgs, sessionToken, limit, skip);
  const indexedTags = tags.zip(Range(skip, skip + limit));
  const edges = indexedTags.map(indexedItem => ({
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
  name: 'TagType',
  nodeType: Tag,
});
