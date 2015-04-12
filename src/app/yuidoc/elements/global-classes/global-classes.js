(function() {
  'use strict';
  var module = angular.module('app.yuidoc.elements');
  module.directive("globalClasses", function($sce, yuidocDataService) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/global-classes/global-classes-template.html',
      scope: {
        globalClasses: '='
      }
    }
  });
})();
