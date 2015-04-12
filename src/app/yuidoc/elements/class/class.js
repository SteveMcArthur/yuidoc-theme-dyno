(function() {
  'use strict';

  var module = angular.module('app.yuidoc.elements');

  module.directive("class", function($sce, marked, yuidocDataService) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class/class-template.html',
      scope: {
        module: '=',
        class: '='
      },
      link: function($scope) {
        $scope.getClassItemsByModuleAndClassName = function(moduleName, className) {
          return yuidocDataService.getClassItemsByModuleAndClassName(moduleName, className);
        };
        var $class = $scope.class;
        if ($class.description) {
          $class.description = $sce.trustAsHtml(marked($class.description));
        }
      }
    }
  });

})();
