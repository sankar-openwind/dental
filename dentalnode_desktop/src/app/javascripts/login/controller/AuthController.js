angular.module("dentalApp").controller('AuthController', ['$scope', '$http', 'roleInterceptor', '$location', '$rootScope', '$window', '$log', function ($scope, $http, roleInterceptor, $location, $rootScope, $window, $log) {
    $scope.submit = function () {
        $http
            .post($rootScope.restAuthURL + '/authenticate', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $rootScope.token = data.token;
                $scope.token = $window.sessionStorage.token;
                roleInterceptor.setRole(data.user.role);
                $rootScope.$emit('loggedin', true);
                $location.path('/home');
            })
            .error(function (data, status, headers, config) {
                delete $window.sessionStorage.token;
                $scope.token = $window.sessionStorage.token;
            });
    };

     $scope.setTokenToScope = function () {
                //alert($window.sessionStorage.token);
                $rootScope.token =  $window.sessionStorage.token ;
                 
            
    };

    $scope.setTokenToScope();
}]);