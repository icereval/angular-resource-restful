'use strict';

angular.module('ngRestfulResource', ['ngResource']).factory('$restfulResource', ['$resource', function ($resource) {
    return function (url, params, methods, options) {
        methods = angular.extend({
            update: { method: 'PUT' },
            create: { method: 'POST' }
        }, methods);

        options = angular.extend({
            idAttribute: 'id'
        }, options);

        var resource = $resource(url, params, methods);

        resource.prototype.$save = function () {
            if (this[options.idAttribute]) {
                this.$update.apply(this, arguments);
            } else {
                this.$create.apply(this, arguments);
            }
        };

        return resource;
    };
}]);
