angular.module("dentalApp").controller('DoctorController',[ '$scope', function($scope) {
	$scope.master = {};
	$scope.doctor = {};
	$scope.patient = {};
	$scope.comment = {};
	$scope.commentList = [];
	$scope.commentid = 0;
	$scope.commentPanel = false;
	$scope.commentEdit = {};

	$scope.opened        = false;

}]);
