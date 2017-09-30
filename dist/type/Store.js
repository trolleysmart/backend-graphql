'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _interface = require('../interface');

var _loader = require('../loader');

var ParentStore = new _graphql.GraphQLObjectType({
  name: 'ParentStore',
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
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('imageUrl');
      }
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'Store',
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
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('imageUrl');
      }
    },
    address: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('address');
      }
    },
    parentStore: {
      type: ParentStore,
      resolve: function resolve(_) {
        var parentStoreId = _.get('parentStoreId');

        if (parentStoreId) {
          return _loader.storeLoaderById.load(parentStoreId);
        }

        var parentStore = _.get('parentStore');

        if (parentStore) {
          return parentStore;
        }

        return null;
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});