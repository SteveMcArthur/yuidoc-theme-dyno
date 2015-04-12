(function() {
  var module = angular.module('app.core.elements');
  module.directive("appHeader", function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/core/elements/app-header/app-header-template.html',
      scope: {
        project: '='
      }
    }
  });
})();
