'use strict';

angular.module('ngRestfulResource', ['ngResource']).factory('$restfulResource', ['$resource', function ($resource) {
    return function (url, params, methods) {
        methods = angular.extend({
            update: { method: 'PUT' },
            create: { method: 'POST' }
        }, methods);

        var resource = $resource(url, params, methods);

        resource.prototype.$save = function () {
            if (!this.id) {
                this.$create.apply(this, arguments);
            } else {
                this.$update.apply(this, arguments);
            }
        };

        return resource;
    };
}]);
