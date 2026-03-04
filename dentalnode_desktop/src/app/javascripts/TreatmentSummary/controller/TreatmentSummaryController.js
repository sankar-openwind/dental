angular.module("dentalApp").controller('TreatmentSummaryController', ['$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', function($scope, $http, $templateCache, $location, $routeParams, $rootScope) {
	$scope.treatmentInformation = {};
	$scope.diagnosisInformation = {};
	$scope.patient = {};
	$scope.treatmentDone={};
 	$scope.treatmentDone["recordType"]="TreatmentDone";

 	$scope.treatmentStates = ['NotStarted', 'InProgress', 'Completed'];

 	$scope.treatmentDataViewType = "summary";

	$scope.getTreatmentSummaryMaster = function() {
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
		var regurl = $rootScope.restURL+'/getCurrentTreatmentSummary/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the patient details " + patientid + data);
			//$scope.diagnosisInformation = data;
			 $scope.summaryResponse = addSymbols(data);
		});
	};
	
function createTreatplanSummmary(treatmentPlan){
	for (var k in treatmentPlan) {
		var treatmentPlanSubset = treatmentPlan[k];
		for(var j in treatmentPlanSubset){
			var treatmentTeethArry= treatmentPlanSubset[j];
			treatmentPlanSubset[j]=toObject(treatmentTeethArry);
			console.log(treatmentPlanSubset[j]);
		}
	}
	return treatmentPlan;
	// console.log("\n\n"+treatmentPlan +"\n EnD");

}


	$scope.saveTreatmentDone = function() {
		var patientId = $routeParams.patientid;
		$scope.patient.patientid = patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savetreatmentPlanMaster';
		$scope.master = {};
		$scope.master.treatmentPlanData = angular.copy($scope.summaryResponse.treatmentPlanSummaryResponse.treatmentPlanData);
		var patientDetails = {
			"patientId" : patientId
		}
		$scope.master.patientId = patientId;
		$scope.patient.patientid=patientId;
		console.log($scope.master);
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
			console.log(response);
			//	$scope.patient = response;
			console.log("patientId   "+$scope.patient.patientid);
			$scope.patient.patientid=patientId;
				$scope.getTreatmentSummaryMaster();
		 
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});



	};



$scope.treatmentStateChange = function(disease,subDisease,teeth,treatmentDonevar){
	//alert(treatmentDonevar);
	$scope.treatmentDone[disease]={};
	$scope.treatmentDone[disease][subDisease]={};
	$scope.treatmentDone[disease][subDisease][teeth]=teeth;

	if(treatmentDonevar){
	
	$scope.treatmentDone[disease][subDisease][teeth]="NotStarted";
	$scope.summaryResponse.treatmentPlanSummaryResponse.treatmentPlanData[disease][subDisease][teeth]="NotStarted";

	}

	if(treatmentDonevar=="NotStarted"){
	
	$scope.treatmentDone[disease][subDisease][teeth]="InProgress";
	$scope.summaryResponse.treatmentPlanSummaryResponse.treatmentPlanData[disease][subDisease][teeth]="InProgress";

	}

	else if(treatmentDonevar=="InProgress"){
	$scope.summaryResponse.treatmentPlanSummaryResponse.treatmentPlanData[disease][subDisease][teeth]="Completed";
	$scope.treatmentDone[disease][subDisease][teeth]="Completed";
	}
	console.log($scope.treatmentDone);
};

function createTreatplanSummmary(treatmentPlan){
	for (var k in treatmentPlan) {
		var treatmentPlanSubset = treatmentPlan[k];
		for(var j in treatmentPlanSubset){
			var treatmentTeethArry= treatmentPlanSubset[j];
			treatmentPlanSubset[j]=toObject(treatmentTeethArry);
			console.log(treatmentPlanSubset[j]);
		}
	}
	return treatmentPlan;
	// console.log("\n\n"+treatmentPlan +"\n EnD");

}

function toObject(arr) { var rv = {};
  for (var i = 0; i < arr.length; ++i){
  	var tempValue =arr[i];
    rv[tempValue] = false;}
  return rv;
}

var addSymbols = function(data){
		return JSON.parse(JSON.stringify(data).replace(/pos/g,"\+").replace(/neg/g,"-"));
	}


	
    $scope.getPatientDetails = function () {
        var patientid = $routeParams.patientid;
        var regurl = $rootScope.restURL + '/getPatient/' + patientid;

        $http.get(regurl).success(function (data) {
            console.log(patientid);
            console.log(data);
            console.log("got the patient details " + patientid + data);
            $scope.patient = data;
           // $route.reload();
           $scope.patientdetails={};
           $scope.patientdetails.firstname = data.firstname;
            $scope.patientdetails.patientid = patientid;
           $scope.patientdetails.lastname = data.lastname;
             $scope.patientdetails=data;
        });
    };

    $scope.getPatientDetails();
	$scope.getTreatmentSummaryMaster();

	 

}]);

