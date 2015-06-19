(function() {
  'use strict';
  var controllers = angular.module('app.core.controllers');
  controllers.controller('appController', function appController($scope, yuidocDataService) {
      $scope.resolved = false;
      yuidocDataService.load()
        .then(function() {
          $scope.resolved = true;

          $scope.project = yuidocDataService.getProject();
          $scope.modules = yuidocDataService.getModules();
          $scope.classes = yuidocDataService.getClasses();
          $scope.classItems = yuidocDataService.getClassItems();
          $scope.globalClasses = yuidocDataService.getGlobalClasses();

          $scope.getClassesByModuleName = yuidocDataService.getClassesByModuleName.bind(yuidocDataService);
          $scope.getClassItemsByModuleAndClassName = yuidocDataService.getClassItemsByModuleAndClassName.bind(yuidocDataService);
        });
    }
  );
})();
