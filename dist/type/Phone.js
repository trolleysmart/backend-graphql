'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Phone',
  fields: {
    label: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('label');
      }
    },
    number: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('number');
      }
    }
  }
});