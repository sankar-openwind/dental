angular.module("dentalApp").controller('AuthRegisterController', ['$scope', '$http', '$location', '$rootScope', '$window', '$log', function ($scope, $http, $location, $rootScope, $window, $log) {

    $scope.rolesList = [{
            name: 'Admin',
            value: 'admin'
        },
        {
            name: 'Doctor',
            value: 'doctor'
        },
        {
            name: 'Receptionist',
            value: 'receptionist'
        }];

    $scope.role = $scope.rolesList[0];

    $scope.signup = function () {

        $scope.user.role = $scope.role.value;

        $http
            .post($rootScope.restAuthURL + '/signup', $scope.user)
            .success(function (data, status, headers, config) {
                $location.path('/');
            })
            .error(function (data, status, headers, config) {
                $scope.message = "ERROR";
            });
    };

}]);