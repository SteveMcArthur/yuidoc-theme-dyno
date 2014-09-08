(function () {

    'use strict';

    var module = angular.module("app.filters", []);

    /**
     * Id encode filter
     */
    module.filter('idEncode', function () {
        return function (inValue) {
            return inValue.replace(/[$]/g, "dollar_");
        };
    });

}());