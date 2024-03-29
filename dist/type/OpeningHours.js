'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'OpeningHours',
  fields: {
    from: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return (0, _moment2.default)(_.get('from')).format('LT');
      }
    },
    until: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return (0, _moment2.default)(_.get('until')).format('LT');
      }
    }
  }
});