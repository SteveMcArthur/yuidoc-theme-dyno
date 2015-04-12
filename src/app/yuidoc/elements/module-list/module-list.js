(function() {
  'use strict';
  var module = angular.module('app.yuidoc.elements');
  module.directive("moduleList", function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/module-list/module-list-template.html',
      scope: {
        modules: '='
      }
    }
  });
})();
