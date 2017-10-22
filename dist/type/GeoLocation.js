'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'GeoLocation',
  fields: {
    latitude: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('latitude');
      }
    },
    longitude: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('longitude');
      }
    }
  }
});