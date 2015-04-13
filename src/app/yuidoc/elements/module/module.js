(function() {
  'use strict';
  var module = angular.module('app.yuidoc.elements');
  module.directive("module", function($sce, marked, yuidocDataService) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/module/module-template.html',
      scope: {
        module: '='
      },
      link: function($scope) {
        $scope.getClassesByModuleName = function(moduleName) {
          return yuidocDataService.getClassesByModuleName(moduleName)
        };

        var module = $scope.module;
        if (module.description) {
          module.description = $sce.trustAsHtml(marked(module.description));
        }
      }
    }
  });
})();
