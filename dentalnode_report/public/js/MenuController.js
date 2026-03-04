'use strict';
var app = angular.module("myApp", ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html',
	});
	$routeProvider.when('/patientHome', {
		templateUrl : 'patientHome.html',
	});
	$routeProvider.when('/newPatient', {
		templateUrl : 'newPatient.html',
	});

	$routeProvider.when('/viewPatient/:patientid', {
		templateUrl : 'viewPatient.html',
		controller : 'patientController'
	});

	$routeProvider.when('/viewPatient/:searchLength', {
		templateUrl : 'searchresult.html',
		controller : 'patientController'
	});

	$routeProvider.when('/searchPatient', {
		templateUrl : 'searchPatient.html',
	});
	$routeProvider.when('/caseHistory/:patientid', {
		templateUrl : 'caseHistory.html',
		controller : 'patientController'
	});
	$routeProvider.when('/clinicalDiagnosis/:patientid', {
		templateUrl : 'clinicalDiagonsis.html',
		controller : 'patientController'
	});
	$routeProvider.when('/photosPage/:patientid', {
		templateUrl : 'photosPage.html',
		controller : 'patientController'
	});
	$routeProvider.when('/diagnosisPage/:patientid', {
		templateUrl : 'diagnosisPage.html',
		controller : 'patientController'
	});
	$routeProvider.when('/treatmentPage/:patientid', {
		templateUrl : 'treatmentPage.html',
		controller : 'patientController'
	});
	$routeProvider.when('/patientDetails/:patientid', {
		templateUrl : 'patientDetails.html',
		controller : 'patientDetailsController'
	});
	$routeProvider.when('/getNetPendingAmountReport', {
		templateUrl : 'netPendingAmountTreatmentReport.html',
		controller : 'reportsController'
	});
	$routeProvider.when('/getNetPendingAmountReport/:fromYear/:fromMonth/:fromDayOfMonth/:toYear/:toMonth/:toDayOfMonth', {
		templateUrl : 'netPendingAmountTreatmentReport.html',
		controller : 'NetPendingAmountReportController'
	});
	$routeProvider.when('/getDailyPaymentReport/:year/:month/:dayOfMonth/', {
		templateUrl : 'DailyPaymentReport.html',
		controller : 'dailyReportsController'
	});
	$routeProvider.when('/prescription/:patientid', {
		templateUrl : 'prescription.html',
		controller : 'patientController'
	});
	$routeProvider.when('/treatmentMethods', {
		templateUrl : 'treatmentMethods.html',
	});
	$routeProvider.when('/rootCannal', {
		templateUrl : 'rootcannal.html',
	});



}]);

app.config(['$httpProvider',
function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.controller('patientController', patientController);

function patientController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.patient = {};
	$scope.colorsOrder =[ 
		"Tooth Decay"  ,
		"Gum Problems" ,
		"Oral Hygiene"  ,
		"Old Procedures",
		"Other Problems" ,
		"Multiple_Problems"
	];
	$scope.colors = {
		"Tooth Decay" : "#428bca !important",
		"Gum Problems" : "#CFB7AB !important",
		"Oral Hygiene" : "#797493 !important",
		"Old Procedures" : "#5cb85c !important",
		"Other Problems" : "#f0ad4e !important",
		"Multiple_Problems" : "#d9534f !important"
	};

	var patientidValue = $routeParams.patientid;
	$scope.patientid = patientidValue;

	$scope.setToothColor = function(tooth){
		var color = getToothColor($scope.patient.patientDiagnosis.details, tooth);
		console.log(color);
		return { background : color };
	}

	$scope.setTeethColor = function(color){
		return {background : color, width : '100%', margin : '2px 0px'};
	}
	
	$scope.savePatient = function(patient) {
		console.log("HERE ");
		console.log(patient);
		var method = 'POST';
		var inserturl = '/savePatient';
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
		var inserturl = '/searchPatient';
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
			/*			$scope.codeStatus = response.data;*/
			/*var patientString = JSON.stringify(response.data);*/
			console.log(response)

			$scope.searchPatients = response;
			console.log("SCOPE");
			console.log($scope.searchPatients);

			/*$location.path("/searchresult/" + response.length);*/
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};

	$scope.getPatientAfterSearch = function(patientInfo) {
		var method = 'POST';
		var inserturl = '/getPatientInfo';
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

			/*$location.path("/searchresult/" + response.length);*/
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	}

	$scope.getPatientDetails = function() {
		var patientid = $routeParams.patientid;
		var regurl = '/getPatient/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the patient details " + patientid + data);
			var diaData = {};
			var fullDiagnosisData=data.patientDiagnosis.diagnosisData;
			var categoriesKeys = Object.keys(data.patientDiagnosis.diagnosisData);
			for (var i=0; i<categoriesKeys.length; i++){
				var subCategoriesKeys = Object.keys(data.patientDiagnosis.diagnosisData[categoriesKeys[i]]);
				var teetharr = [];
				for(var j=0; j<subCategoriesKeys.length; j++){
					var teeth = data.patientDiagnosis.diagnosisData[categoriesKeys[i]][subCategoriesKeys[j]];
					for(var k=0; k<teeth.length; k++){
						teetharr.push(teeth[k]);
					}
				}

				diaData[categoriesKeys[i]] = teetharr;
			}
			$scope.patient = {"patientDetails" : data.patientDetails, "patientDiagnosis": {"dateOfDiagnosis" : data.patientDiagnosis.dateOfDiagnosis, "details": diaData ,"fullDiagnosisData":fullDiagnosisData}};
		});
	}

	var getToothColor = function(diagnosisData, tooth){
		var diseaseType = Object.keys(diagnosisData);
		var matchCount = 0;
		var matchName = [];
		for(var i=0; i<diseaseType.length; i++){
			var teeth = diagnosisData[diseaseType[i]];
			if ( inArray(tooth, teeth) > -1 ){
				matchCount = matchCount + 1;
				matchName.push(diseaseType[i]);
			}		
		}

		if(matchCount > 1){
			return $scope.colors.Multiple_Problems;
		}else if(matchCount == 0 ){
			return "";
		}else {
			return $scope.colors[matchName[0]];
		}

	}

	var inArray = function( elem, array ) {
	    if ( array.indexOf ) {
	        return array.indexOf( elem );
	    }

	    for ( var i = 0, length = array.length; i < length; i++ ) {
	        if ( array[ i ] === elem ) {
	            return i;
	        }
	    }
	    return -1;
	}

	$scope.getPatientDetails();

};

