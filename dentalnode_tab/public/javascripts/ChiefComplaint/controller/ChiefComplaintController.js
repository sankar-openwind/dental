app.controller('ChiefComplaintController', ['$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', function($scope, $http, $templateCache, $location, $routeParams, $rootScope) {
	$scope.master = {};
	$scope.patient = {};

	$scope.geChiefComplaintDetails = function() {
		console.log("got the geChiefComplaintDetails  details ");
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
		var regurl = $rootScope.restURL+'/getChiefComplaintDetails/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the geChiefComplaintDetails  details " + patientid + data);
			$scope.chiefComplaint =  data;
		});
	}

	$scope.saveChiefComplaint = function(chiefComplaint) {
		var patientId = $routeParams.patientid;
		$scope.patient.patientid = patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/saveChiefComplaint';
		$scope.master = {};
		$scope.master = angular.copy(chiefComplaint);
		$scope.master.patientId = patientId;
		var jdata = 'mydata=' + JSON.stringify($scope.master);
		$http({
			method : method,
			url : inserturl,
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			console.log(response);
			//$scope.patient = response;
			$location.path("/chiefComplaint/" +patientId);
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.geChiefComplaintDetails();

}]);

