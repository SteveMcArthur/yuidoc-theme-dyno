(function() {
  'use strict';

  var services = angular.module('app.services', ['ngResource', 'app.repositories']);

  services.service('docService',
    function(projectRepository, modulesRepository, classesRepository, classitemsRepository) {
      return {
        getProject: function() {
          return projectRepository.get();
        },
        getModules: function() {
          return modulesRepository.all();
        },
        getClasses: function() {
          return classesRepository.all();
        },
        getClassItems: function() {
          return classitemsRepository.all();
        },
        getGlobalClasses: function() {
          var query = {
            $not: {
              $has: 'module'
            }
          };
          return classesRepository.extract(query);
        },
        getClassesByModuleName: function(moduleName) {
          var query = {
            module: moduleName
          };
          return classesRepository.extract(query);
        },
        getClassItemsByModuleAndClassName: function(moduleName, className) {
          var query = {
            module: moduleName,
            class: className
          };
          return classitemsRepository.filter(query);
        }
      };
    });

  services.service('iconSidebarService',
    function() {
      // iconSidebarService
      return {
        closeOpenSidebars: function() {
          $('.docMain').removeClass('sidebarActive');
          $('.popoverSidebar').removeClass('in');
          $('.iconSidebar .btn-pill').removeClass('active');
        },
        openSidebar: function(iconLiElement) {
          var sidebarId = iconLiElement.getAttribute('data-target');
          $(sidebarId).addClass('in');
          $('.docMain').addClass('sidebarActive');
          iconLiElement.classList.add('active');
        },
        closeSidebar: function(iconLiElement) {
          var sidebarId = iconLiElement.getAttribute('data-target');
          document.querySelector(sidebarId).classList.remove('in');
          document.querySelector('.docMain').classList.remove('sidebarActive');
          iconLiElement.classList.remove('active');
        }
      };
    }
  );

}());