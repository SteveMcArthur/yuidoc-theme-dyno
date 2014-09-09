(function () {

    'use strict';

    var module = angular.module("app.filters", []);

    /**
     * Id encode filter
     */
    module.filter('idEncode', function () {
        return function (inValue) {
	        if (inValue === undefined || inValue.length === 0)
	            return inValue;
	        else
                return inValue.replace(/[$]/g, "dollar_");
        };
    });

}());