app.controller('patientDetailsController', patientDetailsController);

function patientDetailsController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.patient = {};

	$scope.getPatientDetails = function() {
		var patientid = $routeParams.patientid;
		var regurl = '/getPatient/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the patient details " + patientid + data);
			console.log( {"patientDetails" : data.patientDetails });
			$scope.patient = {"patientDetails" : data.patientDetails };
		});
	}

	$scope.getPatientDetails();

}