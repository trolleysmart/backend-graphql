'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStringArgumentToSet = exports.getLimitAndSkipValue = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLimitAndSkipValue = exports.getLimitAndSkipValue = function getLimitAndSkipValue(searchArgs, count, defaultPageSize, maximumPageSize) {
  var after = searchArgs.get('after');
  var before = searchArgs.get('before');
  var first = searchArgs.get('first');
  var last = searchArgs.get('last');

  if ((first || after) && (last || before)) {
    throw new Error('Mixing first and after with last and before is not supported.');
  }

  var limit = void 0;
  var skip = void 0;

  if (first || after) {
    if (!first) {
      first = defaultPageSize;
    }
  } else if (last || before) {
    if (!last) {
      last = defaultPageSize;
    }
  } else {
    first = defaultPageSize;
  }

  if (first > maximumPageSize) {
    first = maximumPageSize;
  }

  if (last > maximumPageSize) {
    last = maximumPageSize;
  }

  if (first && after) {
    var afterValue = parseInt(after, 10);

    limit = first;
    skip = afterValue;
  } else if (first) {
    limit = first;
    skip = 0;
  } else if (last && before) {
    var beforeValue = parseInt(before, 10);

    limit = last;
    skip = beforeValue.idx - last;

    if (skip < 0) {
      skip = 0;
    }
  } else if (last) {
    limit = last;
    skip = 0;
  }

  var hasNextPage = skip + limit < count;
  var hasPreviousPage = skip !== 0;

  return {
    limit: limit,
    skip: skip,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage
  };
};

var convertStringArgumentToSet = exports.convertStringArgumentToSet = function convertStringArgumentToSet(string) {
  if (string) {
    var trimmedString = string.trim();

    if (trimmedString.length === 0) {
      return (0, _immutable.Set)();
    }

    return _immutable2.default.fromJS(trimmedString.toLowerCase().split(' ')).map(function (_) {
      return _.trim();
    }).filter(function (_) {
      return _.length > 0;
    }).toSet();
  }

  return (0, _immutable.Set)();
};