'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'UnitPrice',
  fields: {
    price: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('price');
      }
    },
    size: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('size');
      }
    }
  }
});