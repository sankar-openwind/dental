app.controller('chiefComplaintController', chiefComplaintController);

function chiefComplaintController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.patient = {};

	$scope.geChiefComplaintDetails = function() {
		var patientid = $routeParams.patientid;
		var regurl = '/geChiefComplaintDetails/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the geChiefComplaintDetails  details " + patientid + data);
			$scope.patient = {
				"chiefComplaint" : data.chiefComplaint
			};
		});
	}

	$scope.saveChiefComplaint = function(chiefComplaint) {
		var patientId = $routeParams.patientid;
		console.log("HERE ");
		console.log(chiefComplaint);
		var method = 'POST';
		var inserturl = '/saveChiefComplaint';
		$scope.master = {};
		$scope.master = angular.copy(chiefComplaint);
		$scope.master.patientId = patientId;
		var jdata = 'mydata=' + JSON.stringify($scope.master);
		//console.log(jdata);
		$http({
			method : method,
			url : inserturl,
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			//	console.log("success");
			/*$scope.codeStatus = response.data;
			 var patientString = JSON.stringify(response.data);*/
			console.log(response);
			$scope.patient = response;
			$location.path("/chiefComplaint/" + response.patientid);

		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.geChiefComplaintDetails();

}