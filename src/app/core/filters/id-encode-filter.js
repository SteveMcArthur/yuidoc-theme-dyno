(function() {
  'use strict';
  var filters = angular.module('app.core.filters');
  filters.filter('idEncode', function() {
    return function(inValue) {
      if (inValue === undefined || inValue.length === 0) {
        return inValue;
      } else {
        return inValue.replace(/[$]/g, 'dollar_');
      }
    };
  });
}());
