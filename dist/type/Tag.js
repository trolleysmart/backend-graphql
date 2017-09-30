'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _interface = require('../interface');

var _loader = require('../loader');

var ParentTag = new _graphql.GraphQLObjectType({
  name: 'ParentTag',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('key');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      }
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('imageUrl');
      }
    },
    level: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('level');
      }
    },
    forDisplay: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('forDisplay');
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Tag',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    key: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('key');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      }
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('imageUrl');
      }
    },
    level: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('level');
      }
    },
    forDisplay: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('forDisplay');
      }
    },
    parentTag: {
      type: ParentTag,
      resolve: function resolve(_) {
        var parentTagId = _.get('parentTagId');

        if (parentTagId) {
          return _loader.tagLoaderById.load(parentTagId);
        }

        var parentTag = _.get('parentTag');

        if (parentTag) {
          return parentTag;
        }

        return null;
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});