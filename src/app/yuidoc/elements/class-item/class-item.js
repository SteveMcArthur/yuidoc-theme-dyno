(function() {

  var module = angular.module('app.yuidoc.elements');

  module.directive('classItem', function($sce, marked) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/class-item-template.html',
      scope: {
        module: '=',
        class: '=',
        classItem: '='
      },
      link: function($scope) {
        var classItem = $scope.classItem;

        // make the description safe to parse as html
        if (classItem.description) {
          classItem.description = $sce.trustAsHtml(marked(classItem.description));
        }

        // make all example item descriptions safe to parse as html
        if (classItem.example) {
          for (var index = 0; index < classItem.example.length; index++) {
            classItem.example[index] = $sce.trustAsHtml(marked(classItem.example[index]));
          }
        }
      }
    };
  });

  module.directive('classItemAttribute', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/attribute-template.html',
      scope: {
        classItem: '='
      }
    };
  });

  module.directive('classItemMethod', function($sce, marked) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/method-template.html',
      scope: {
        classItem: '='
      },
      link: function($scope) {
        // make the return description safe to parse as html
        if ($scope.classItem.return && $scope.classItem.return.description) {
          $scope.classItem.return.description = $sce.trustAsHtml(marked($scope.classItem.return.description));
        }
      }
    };
  });

  module.directive('classItemParams', function($sce, marked) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/params-template.html',
      replace: false,
      scope: {
        classItem: '='
      },
      link: function($scope) {
        var classItem = $scope.classItem;
        // make each param description safe to parse as html
        if (classItem.params) {
          for (var index = 0; index < classItem.params.length; index++) {
            var param = classItem.params[index];
            param.description = $sce.trustAsHtml(marked(param.description));
          }
        }
      }
    };
  });

  module.directive('classItemProps', function($sce, marked) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/props-template.html',
      replace: false,
      scope: {
        classItem: '='
      },
      link: function($scope) {
        var classItem = $scope.classItem;
        // make each param description safe to parse as html
        if (classItem.props) {
          for (var index = 0; index < classItem.props.length; index++) {
            var prop = classItem.props[index];
            prop.description = $sce.trustAsHtml(marked(prop.description));
          }
        }
      }
    };
  });

  module.directive('classItemProperty', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/class-item/templates/property-template.html',
      scope: {
        classItem: '='
      }
    };
  });

})();
