'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _interface = require('../interface');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'StapleItem',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
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
    popular: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.has('popular') ? _.get('popular') : false;
      }
    },
    tags: {
      type: new _graphql.GraphQLList(_Tag2.default),
      resolve: function resolve(_) {
        return _.get('tags');
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});