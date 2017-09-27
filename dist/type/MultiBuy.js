'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'MultiBuy',
  fields: {
    awardQuantity: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('awardQuantity');
      }
    },
    awardValue: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('awardValue');
      }
    }
  }
});