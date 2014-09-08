(function () {

    'use strict';

    var module = angular.module("app.filters", []);

    /**
     * Url encode filter
     */
    module.filter('urlEncode', function () {
        return function (inValue) {
            return inValue.replace(/[$]/g, "dollar_");
        };
    });

}());