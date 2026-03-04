angular.module("dentalApp").controller('logoutController', ['$scope', '$http', 'roleInterceptor', '$location', '$rootScope', '$window', '$log', function ($scope, $http, roleInterceptor, $location, $rootScope, $window, $log) {
    $scope.logout = function () {
  delete $window.sessionStorage.token;
    $location.path("/" );
    };

     $scope.logout();
}]);