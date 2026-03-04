app.factory('authInterceptor', function ($location, $rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers["x-access-token"] = $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            console.log(rejection); // Contains the data about the error on the request.

            // Return the promise rejection.
            $rootScope.$emit('error', rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            return response || $q.when(response);
        }
    };
});