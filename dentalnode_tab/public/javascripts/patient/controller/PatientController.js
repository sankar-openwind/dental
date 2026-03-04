app.controller('PatientController',[ '$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', function($scope, $http, $templateCache, $location, $routeParams, $rootScope) {
	$scope.master = {};
	$scope.patient = {};
	$scope.serverhostname = $location.host()+":81";
	var patientidValue = $routeParams.patientid;
	$scope.patientid = patientidValue;
	$scope.patient.patientid=patientidValue;
	
	$scope.exportToPDF = function(){
		var patientId = $routeParams.patientid;
		$scope.master = {};
		var method = 'POST';
		var inserturl = '/exportToPDF';
		var jdata = 'patientId=' + patientId ;

		$http({
			method : method,
			url : inserturl,
			responseType : "arraybuffer",
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			console.log(response);
			var blob = new Blob(response, {type: "application/pdf"});
        	var objectUrl = URL.createObjectURL(blob);
        	window.open(objectUrl);
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};
	
	$scope.savePatient = function(patient) {
		console.log("ADDING DOCTOR EMAIL TO PATIENT MODEL");
		patient["doctor"] = sessionStorage.user;
		patient["clinicName"] = sessionStorage.clinicName;
		console.log("SAVING PATIENT");
		console.log(patient);

		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savePatient';
		$scope.master = {};
		$scope.master = angular.copy(patient);
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
			$scope.patient = response;
			$location.path("/viewPatient/" + response.patientid);
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.searchPatient = function(patient) {
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/searchPatient';
		$scope.searchPatients = {};
		$scope.master = {};
		$scope.master = angular.copy(patient);

		var jdata = 'mydata=' + JSON.stringify($scope.master);
		console.log(jdata);
		$http({
			method : method,
			url : inserturl,
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			console.log(response)
			$scope.searchPatients = response;
			console.log("SCOPE");
			console.log($scope.searchPatients);
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.getPatientAfterSearch = function(patientInfo) {
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/getPatientInfo';
		$scope.patientInfomation = {};
		$scope.master = {};
		$scope.master = angular.copy(patientInfo);

		var jdata = 'mydata=' + JSON.stringify($scope.master);
		console.log(jdata);
		$http({
			method : method,
			url : inserturl,
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			console.log(response)

			$scope.patient = response;
			console.log("SCOPE");
			console.log($scope.patient);

			$location.path("/viewPatient/" + response.patientid);
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.getPatientDetails = function() {
		var patientid = $routeParams.patientid;
		var regurl = $rootScope.restURL+'/getPatient/' + patientid;

		$http.get(regurl).success(function(data) {
			console.log(patientid);
			console.log(data);
			console.log("got the patient details " + patientid + data);
			$scope.patient = data;
		});
	};

	$scope.getPatientDetails();

}]);