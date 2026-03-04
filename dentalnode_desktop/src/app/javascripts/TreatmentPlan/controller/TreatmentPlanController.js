angular.module("dentalApp").controller('TreatmentPlanController',[ '$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', function($scope, $http, $templateCache, $location, $routeParams, $rootScope) {
	$scope.treatmentType = "Periodontics";
	$scope.selectedTreatmentSubType = null;
	$scope.treatmentInformation = {};
	$scope.treatmentPlanInformation = {};
	$scope.currentTreatmentPlanInformation ={};
	$scope.diagnosisInformation = {};
	setButtonsToFalse();
	$scope.patient = {};

	// code for treatment estimate
	 var counter=0;
	var treatmentEstimate=0;
	 $scope.paymentEstimate={};
    $scope.paymentEstimate.estimateelemnt = [ {id:counter, treatmenttype : '', treatementPart : '', treatmentsubcost : '', units : '', subcost : '',inline:true} ];
	$scope.totalcost=0;


    $scope.newItem = function($event){
    	//alert("ssssssss"+counter);
        counter++;
        $scope.paymentEstimate.estimateelemnt.push( {id:counter, treatmenttype : '', treatementPart : '', treatmentsubcost : '', units : '', subcost : '',inline:true} );
        $event.preventDefault();
    }

$scope.estimatechanged = function($event){
      //  alert("ssss");
         $scope.paymentEstimate.estimateAmount=0;
        for(var i=0;i< $scope.paymentEstimate.estimateelemnt .length;i++) {
      // alert($scope.paymentEstimate.estimateelemnt [i].treatmentsubcost);   
              //alert($scope.paymentEstimate.estimateelemnt [i].units); 
			var subcosttemp =$scope.paymentEstimate.estimateelemnt [i].treatmentsubcost * $scope.paymentEstimate.estimateelemnt [i].units;
            $scope.paymentEstimate.estimateelemnt [i].subcost=subcosttemp;
            //alert($scope.paymentEstimate.estimateAmount);
            $scope.paymentEstimate.estimateAmount=parseFloat($scope.paymentEstimate.estimateAmount)+parseFloat (subcosttemp);
        }
    }

    $scope.prepareForTreatmentEstimate - function(){
    	/*<div ng-repeat="(disease, diseaseValue) in treatmentInformation">
 		<div   ng-repeat="(subDisease, subDiseaseValue) in diseaseValue">
 		<span ng-repeat="teeth in subDiseaseValue">{{teeth}} , </span></div>
 		 counter++;
 		 var treatmentTypeValue = disease+"#"+subDisease;
 		 var treatmentPartValue=teeth;
 		$scope.treatmentEstimateElement.push( {id:counter, treatmenttype : treatmentTypeValue, treatementPart : treatmentPartValue, treatmentsubcost : '', units : '', subcost : '',inline:true} );*/
    }
    
    // 

$scope.onHammerPressUp = function onHammer (event) {
            $scope.pressDetails ="pressup";
          };

	$scope.onHammer = function onHammer (event) {
            $scope.pressDetails = event.type;
            $scope.getDiagnosisInformation();
          };

	$scope.saveTreatmentPlan = function() {
		var patientId = $routeParams.patientid;
		//$scope.patient.patientid = patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savetreatmentPlanMaster';

		$scope.master = {};
		$scope.master.treatmentPlanData = angular.copy($scope.treatmentPlanInformation);
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
			$scope.patient = response;
			$location.path("/treatmentPage/" + patientId);
			$scope.patient.patientid=patientId;
			$scope.paymentEstimateBtn();

		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

	};

	$scope.Periodontics = function() {
		$scope.treatmentType = "Periodontics";
		$scope.selectedTreatmentSubType = null;

		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
		setButtonsToFalse();
	};

	$scope.notes = function() {
		$scope.treatmentType = "notes";
		 
	};

	$scope.Conservative = function() {

		$scope.treatmentType = "Conservative";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();
	};
	$scope.Surgery = function() {
		$scope.treatmentType = "Surgery";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();
	};
	$scope.Prosthodontics = function() {
		$scope.treatmentType = "Prosthodontics";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();
	};
	$scope.Orthodontics = function() {
		$scope.treatmentType = "Orthodontics";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();

	};

	$scope.diagnosisSummary = function() {
		$scope.getDiagnosisInformation();
		$scope.treatmentType = "Diagnosis Summary";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();
	};

	$scope.treatmentSummary = function() {
		
		$scope.getTreatmentSummary();
		$scope.treatmentType = "Treatment Summary";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();
	};

		$scope.paymentEstimateBtn = function() {
		
		$scope.getTreatmentSummary();
		$scope.preparePaymentEstimate();
		$scope.treatmentType = "Payment Estimate";
		$scope.selectedTreatmentSubType = null;
		setButtonsToFalse();
	};
	
	$scope.scaling = function() {
		$scope.selectedTreatmentSubType = "Scaling";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.rootPlanning = function() {
		$scope.selectedTreatmentSubType = "Root Planning";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.flapSurgery = function() {
		$scope.selectedTreatmentSubType = "Flap Surgery";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.crownLengthening = function() {
		$scope.selectedTreatmentSubType = "Crown Lengthening";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.frenectomy = function() {
		$scope.selectedTreatmentSubType = "Frenectomy";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.gingivectomy = function() {
		$scope.selectedTreatmentSubType = "Gingivectomy";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.gingivoplasty = function() {
		$scope.selectedTreatmentSubType = "Gingivoplasty";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.ZNOE = function() {
		$scope.selectedTreatmentSubType = "ZNOE";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.DYCAL = function() {
		$scope.selectedTreatmentSubType = "DYCAL";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.GIC = function() {
		$scope.selectedTreatmentSubType = "GIC";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.Composite = function() {
		$scope.selectedTreatmentSubType = "Composite";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.Amalgam = function() {
		$scope.selectedTreatmentSubType = "Amalgam";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.RCT = function() {
		$scope.selectedTreatmentSubType = "RCT";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.PostAndCore = function() {
		$scope.selectedTreatmentSubType = "POST AND CORE";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.extraction = function() {
		$scope.selectedTreatmentSubType = "Extraction";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.drainingCurretage = function() {
		$scope.selectedTreatmentSubType = "Draining & Curretage";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.apisectomy = function() {
		$scope.selectedTreatmentSubType = "Apisectomy";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.osteotomy = function() {
		$scope.selectedTreatmentSubType = "Osteotomy";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.alveoloplasty = function() {
		$scope.selectedTreatmentSubType = "Alveoloplasty";
	 	setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.directSinusLift = function() {
		$scope.selectedTreatmentSubType = "Direct Sinus Lift";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.indirectSinusLift = function() {
		$scope.selectedTreatmentSubType = "Indirect Sinus Lift";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.boneGrafting = function() {
		$scope.selectedTreatmentSubType = "Bone grafting";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.AMO = function() {
		$scope.selectedTreatmentSubType = "AMO";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	
	$scope.BSSO = function() {
		$scope.selectedTreatmentSubType = "BSSO";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.LeForte = function() {
		$scope.selectedTreatmentSubType = "Le-forte i-ii-iii";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.genioplasty = function() {
		$scope.selectedTreatmentSubType = "Genioplasty";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.anyOther = function() {
		$scope.selectedTreatmentSubType = "Any Other";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.RPD = function() {
		$scope.selectedTreatmentSubType = "RPD";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.CD = function() {
		$scope.selectedTreatmentSubType = "CD";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.acryilicCrownsBridges = function() {
		$scope.selectedTreatmentSubType = "Acryilic (crowns / Bridges)";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.goldCrownsBridges = function() {
		$scope.selectedTreatmentSubType = "Gold (crowns / Bridges)";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.vitalliumCrownsBridges = function() {
		$scope.selectedTreatmentSubType = "Vitallium (crowns / Bridges)";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.ceramicCrownsBridges = function() {
		$scope.selectedTreatmentSubType = "Ceramic (Crowns / Bridges)";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.zirconiumCrownsBridges = function() {
		$scope.selectedTreatmentSubType = "Zirconium (Crowns / Bridges)";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.implants = function() {
		$scope.selectedTreatmentSubType = "Implants";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.overdentures = function() {
		$scope.selectedTreatmentSubType = "Overdentures";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.removableAppliance = function() {
		$scope.selectedTreatmentSubType = "Removable Appliance";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.fixedAppliance = function() {
		$scope.selectedTreatmentSubType = "Fixed Appliance";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.orthpaedicAppliance = function() {
		$scope.selectedTreatmentSubType = "Orthpaedic Appliance";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.functionalAppliance = function() {
		$scope.selectedTreatmentSubType = "Functional Appliance";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.fixedFunctionalAppliance = function() {
		$scope.selectedTreatmentSubType = "Fixed Functional Appliance";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.orthognathicSurgery = function() {
		$scope.selectedTreatmentSubType = "Orthognathic Surgery";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.splints = function() {
		$scope.selectedTreatmentSubType = "Splints";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.retainers = function() {
		$scope.selectedTreatmentSubType = "Retainers";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};
	$scope.implantsP = function() {
		$scope.selectedTreatmentSubType = "Implants +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.implantsN = function() {
		$scope.selectedTreatmentSubType = "Implants -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.bracesP = function() {
		$scope.selectedTreatmentSubType = "Braces +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.bracesN = function() {
		$scope.selectedTreatmentSubType = "Braces -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.removableAppliancesP = function() {
		$scope.selectedTreatmentSubType = "Removable Appliances +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.removableAppliancesN = function() {
		$scope.selectedTreatmentSubType = "Removable Appliances -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.treatmentType, $scope.selectedTreatmentSubType);
	};

	$scope.t29 = function() {

		if (!$scope.startedt29) {
			$scope.startedt29 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "29");
		} else {
			$scope.startedt29 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "29");
		}
	};
	$scope.t28 = function() {

		if (!$scope.startedt28) {
			$scope.startedt28 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "28");
		} else {
			$scope.startedt28 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "28");
		}
	};
	$scope.t27 = function() {

		if (!$scope.startedt27) {
			$scope.startedt27 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "27");
		} else {
			$scope.startedt27 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "27");
		}
	};
	$scope.t26 = function() {

		if (!$scope.startedt26) {
			$scope.startedt26 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "26");
		} else {
			$scope.startedt26 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "26");
		}
	};

	$scope.t25 = function() {

		if (!$scope.startedt25) {
			$scope.startedt25 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "25");
		} else {
			$scope.startedt25 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "25");
		}
	};
	$scope.t24 = function() {

		if (!$scope.startedt24) {
			$scope.startedt24 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "24");
		} else {
			$scope.startedt24 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "24");
		}
	};
	$scope.t23 = function() {

		if (!$scope.startedt23) {
			$scope.startedt23 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "23");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "23");
			$scope.startedt23 = false;
		}
	};
	$scope.t22 = function() {

		if (!$scope.startedt22) {
			$scope.startedt22 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "22");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "22");
			$scope.startedt22 = false;
		}
	};
	$scope.t21 = function() {

		if (!$scope.startedt21) {
			$scope.startedt21 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "21");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "21");
			$scope.startedt21 = false;
		}

	};

	$scope.l39 = function() {

		if (!$scope.startedt39) {
			$scope.startedt39 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "39");
		} else {
			$scope.startedt39 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "39");
		}
	};
	$scope.l38 = function() {

		if (!$scope.startedt38) {
			$scope.startedt38 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "38");
		} else {
			$scope.startedt38 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "38");
		}
	};
	$scope.l37 = function() {

		if (!$scope.startedt37) {
			$scope.startedt37 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "37");
		} else {
			$scope.startedt37 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "37");
		}
	};
	$scope.l36 = function() {

		if (!$scope.startedt36) {
			$scope.startedt36 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "36");
		} else {
			$scope.startedt36 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "36");
		}
	};

	$scope.l35 = function() {

		if (!$scope.startedt35) {
			$scope.startedt35 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "35");
		} else {
			$scope.startedt35 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "35");
		}
	};
	$scope.l34 = function() {

		if (!$scope.startedt34) {
			$scope.startedt34 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "34");
		} else {
			$scope.startedt34 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "34");
		}
	};
	$scope.l33 = function() {

		if (!$scope.startedt33) {
			$scope.startedt33 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "33");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "33");
			$scope.startedt33 = false;
		}
	};
	$scope.l32 = function() {

		if (!$scope.startedt32) {
			$scope.startedt32 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "32");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "32");
			$scope.startedt32 = false;
		}
	};
	$scope.l31 = function() {

		if (!$scope.startedt31) {
			$scope.startedt31 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "31");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "31");
			$scope.startedt31 = false;
		}

	};

	$scope.l49 = function() {

		if (!$scope.startedt49) {
			$scope.startedt49 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "49");
		} else {
			$scope.startedt49 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "49");
		}
	};
	$scope.l48 = function() {

		if (!$scope.startedt48) {
			$scope.startedt48 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "48");
		} else {
			$scope.startedt48 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "48");
		}
	};
	$scope.l47 = function() {

		if (!$scope.startedt47) {
			$scope.startedt47 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "47");
		} else {
			$scope.startedt47 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "47");
		}
	};
	$scope.l46 = function() {

		if (!$scope.startedt46) {
			$scope.startedt46 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "46");
		} else {
			$scope.startedt46 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "46");
		}
	};

	$scope.l45 = function() {

		if (!$scope.startedt45) {
			$scope.startedt45 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "45");
		} else {
			$scope.startedt45 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "45");
		}
	};
	$scope.l44 = function() {

		if (!$scope.startedt44) {
			$scope.startedt44 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "44");
		} else {
			$scope.startedt44 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "44");
		}
	};
	$scope.l43 = function() {

		if (!$scope.startedt43) {
			$scope.startedt43 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "43");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "43");
			$scope.startedt43 = false;
		}
	};
	$scope.l42 = function() {

		if (!$scope.startedt42) {
			$scope.startedt42 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "42");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "42");
			$scope.startedt42 = false;
		}
	};
	$scope.l41 = function() {

		if (!$scope.startedt41) {
			$scope.startedt41 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "41");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "41");
			$scope.startedt41 = false;
		}

	};

	$scope.t19 = function() {

		if (!$scope.startedt19) {
			$scope.startedt19 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "19");
		} else {
			$scope.startedt19 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "19");
		}
	};
	$scope.t18 = function() {

		if (!$scope.startedt18) {
			$scope.startedt18 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "18");
		} else {
			$scope.startedt18 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "18");
		}
	};
	$scope.t17 = function() {

		if (!$scope.startedt17) {
			$scope.startedt17 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "17");
		} else {
			$scope.startedt17 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "17");
		}
	};
	$scope.t16 = function() {

		if (!$scope.startedt16) {
			$scope.startedt16 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "16");
		} else {
			$scope.startedt16 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "16");
		}
	};

	$scope.t15 = function() {

		if (!$scope.startedt15) {
			$scope.startedt15 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "15");
		} else {
			$scope.startedt15 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "15");
		}
	};
	$scope.t14 = function() {

		if (!$scope.startedt14) {
			$scope.startedt14 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "14");
		} else {
			$scope.startedt14 = false;
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "14");
		}
	};
	$scope.t13 = function() {

		if (!$scope.startedt13) {
			$scope.startedt13 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "13");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "13");
			$scope.startedt13 = false;
		}
	};
	$scope.t12 = function() {

		if (!$scope.startedt12) {
			$scope.startedt12 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "12");
		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "12");
			$scope.startedt12 = false;
		}
	};
	$scope.t11 = function() {

		if (!$scope.startedt11) {
			$scope.startedt11 = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "11");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "11");
			$scope.startedt11 = false;
		}

	};

	$scope.tlq = function() {

		if (!$scope.startedtlq) {
			$scope.startedtlq = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "Top Left Quadrant");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "Top Left Quadrant");
			$scope.startedtlq = false;
		}

	};
	$scope.trq = function() {

		if (!$scope.startedtrq) {
			$scope.startedtrq = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "Top Right Quadrant");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "Top Right Quadrant");
			$scope.startedtrq = false;
		}

	};
	$scope.blq = function() {

		if (!$scope.startedblq) {
			$scope.startedblq = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "Bottom Left Quadrant");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "Bottom Left Quadrant");
			$scope.startedblq = false;
		}

	};
	$scope.brq = function() {

		if (!$scope.startedbrq) {
			$scope.startedbrq = true;
			insertData($scope.treatmentType, $scope.selectedTreatmentSubType, "Bottom Right Quadrant");

		} else {
			removeData($scope.treatmentType, $scope.selectedTreatmentSubType, "Bottom Right Quadrant");
			$scope.startedbrq = false;
		}

	};

	function setButtonsToFalse() {
		$scope.startedt11 = false;
		$scope.startedt12 = false;
		$scope.startedt13 = false;
		$scope.startedt14 = false;
		$scope.startedt15 = false;
		$scope.startedt16 = false;
		$scope.startedt17 = false;
		$scope.startedt18 = false;
		$scope.startedt19 = false;
		$scope.startedt21 = false;
		$scope.startedt22 = false;
		$scope.startedt23 = false;
		$scope.startedt24 = false;
		$scope.startedt25 = false;
		$scope.startedt26 = false;
		$scope.startedt27 = false;
		$scope.startedt28 = false;
		$scope.startedt29 = false;
		$scope.startedt31 = false;
		$scope.startedt32 = false;
		$scope.startedt33 = false;
		$scope.startedt34 = false;
		$scope.startedt35 = false;
		$scope.startedt36 = false;
		$scope.startedt37 = false;
		$scope.startedt38 = false;
		$scope.startedt39 = false;
		$scope.startedt41 = false;
		$scope.startedt42 = false;
		$scope.startedt43 = false;
		$scope.startedt44 = false;
		$scope.startedt45 = false;
		$scope.startedt46 = false;
		$scope.startedt47 = false;
		$scope.startedt48 = false;
		$scope.startedt49 = false;
		$scope.startedtrq = false;
		$scope.startedbrq = false;
		$scope.startedtlq = false;
		$scope.startedblq = false;

	}

	function resetButtonStates(treatmentType, selectedTreatmentSubType) {
		if ( typeof $scope.treatmentInformation[$scope.treatmentType] != "undefined") {
			if ( typeof $scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] != "undefined") {
				var arrayinfo = $scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType];
				for (var i = 0; i < arrayinfo.length; i++) {
					if (arrayinfo[i] == "11") {
						$scope.startedt11 = true;
					}
					if (arrayinfo[i] == "12") {
						$scope.startedt12 = true;
					}

					if (arrayinfo[i] == "13") {
						$scope.startedt13 = true;
					}
					if (arrayinfo[i] == "14") {
						$scope.startedt14 = true;
					}
					if (arrayinfo[i] == "15") {
						$scope.startedt15 = true;
					}
					if (arrayinfo[i] == "16") {
						$scope.startedt16 = true;
					}
					if (arrayinfo[i] == "17") {
						$scope.startedt17 = true;
					}
					if (arrayinfo[i] == "18") {
						$scope.startedt18 = true;
					}
					if (arrayinfo[i] == "19") {
						$scope.startedt19 = true;
					}

					if (arrayinfo[i] == "21") {
						$scope.startedt21 = true;
					}
					if (arrayinfo[i] == "22") {
						$scope.startedt22 = true;
					}

					if (arrayinfo[i] == "23") {
						$scope.startedt23 = true;
					}
					if (arrayinfo[i] == "24") {
						$scope.startedt24 = true;
					}
					if (arrayinfo[i] == "25") {
						$scope.startedt25 = true;
					}
					if (arrayinfo[i] == "26") {
						$scope.startedt26 = true;
					}
					if (arrayinfo[i] == "27") {
						$scope.startedt27 = true;
					}
					if (arrayinfo[i] == "28") {
						$scope.startedt28 = true;
					}
					if (arrayinfo[i] == "29") {
						$scope.startedt29 = true;
					}
					if (arrayinfo[i] == "31") {
						$scope.startedt31 = true;
					}
					if (arrayinfo[i] == "32") {
						$scope.startedt32 = true;
					}

					if (arrayinfo[i] == "33") {
						$scope.startedt33 = true;
					}
					if (arrayinfo[i] == "34") {
						$scope.startedt34 = true;
					}
					if (arrayinfo[i] == "35") {
						$scope.startedt35 = true;
					}
					if (arrayinfo[i] == "36") {
						$scope.startedt36 = true;
					}
					if (arrayinfo[i] == "37") {
						$scope.startedt37 = true;
					}
					if (arrayinfo[i] == "38") {
						$scope.startedt38 = true;
					}
					if (arrayinfo[i] == "39") {
						$scope.startedt39 = true;
					}

					if (arrayinfo[i] == "41") {
						$scope.startedt41 = true;
					}
					if (arrayinfo[i] == "42") {
						$scope.startedt42 = true;
					}
					if (arrayinfo[i] == "42") {
						$scope.startedt42 = true;
					}
					if (arrayinfo[i] == "43") {
						$scope.startedt43 = true;
					}
					if (arrayinfo[i] == "44") {
						$scope.startedt44 = true;
					}
					if (arrayinfo[i] == "45") {
						$scope.startedt45 = true;
					}
					if (arrayinfo[i] == "46") {
						$scope.startedt46 = true;
					}
					if (arrayinfo[i] == "47") {
						$scope.startedt47 = true;
					}
					if (arrayinfo[i] == "48") {
						$scope.startedt48 = true;
					}
					if (arrayinfo[i] == "49") {
						$scope.startedt49 = true;
					}
					if (arrayinfo[i] == "Top Right Quadrant") {
						$scope.startedtrq = true;
					}
					if (arrayinfo[i] == "Top Left Quadrant") {
						$scope.startedtlq = true;
					}
					if (arrayinfo[i] == "Bottom Right Quadrant") {
						$scope.startedbrq = true;
					}
					if (arrayinfo[i] == "Bottom Left Quadrant") {
						$scope.startedblq = true;
					}
					//Do something
				}
			}
		}

	}

	function insertData(treatmentType, selectedTreatmentSubType, teeth) {
		// alert($scope.treatmentInformation[$scope.treatmentType]);
		if (selectedTreatmentSubType == null) {
			setButtonsToFalse();
			return;
		}
		if ( typeof $scope.treatmentInformation[$scope.treatmentType] == "undefined") {
			// alert("Inserting the new data");
			
			$scope.treatmentInformation[$scope.treatmentType] = {};
			$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = [];
			$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType].push(teeth);
			//console($scope.treatmentInformation);
		} else {
			if ( typeof $scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] == "undefined") {
				$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = [];
				$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType].push(teeth);

			} else {
				$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType].push(teeth);
			}
		}
	};


$scope.treatmentPlanStateChange = function(teeth) {
		

		if ($scope.selectedTreatmentSubType == null ) {

			alert("Please Select the Treatment Sub Type");
			return;
		}
		if ( typeof $scope.treatmentPlanInformation== "undefined") {
			$scope.treatmentPlanInformation={};
		}
		if ( typeof $scope.treatmentPlanInformation[$scope.treatmentType] == "undefined") {
			// alert("Inserting the new data");
			
			$scope.treatmentPlanInformation[$scope.treatmentType] = {};
			$scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = {};
			$scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]="NotStarted";
			//console($scope.treatmentInformation);
		} else {
			if ( typeof $scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] == "undefined") {
				$scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = {};
				$scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]="NotStarted";;

			} else {
				if ( typeof $scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth] == "undefined") {
				$scope.treatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]="NotStarted";;
				}
				
			}
		}


		if ( typeof $scope.currentTreatmentPlanInformation== "undefined") {
			$scope.currentTreatmentPlanInformation={};
		}
		if ( typeof $scope.currentTreatmentPlanInformation[$scope.treatmentType] == "undefined") {
			// alert("Inserting the new data");
			
			$scope.currentTreatmentPlanInformation[$scope.treatmentType] = {};
			$scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = {};
			$scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]=false;
			//console($scope.treatmentInformation);
		} else {
			if ( typeof $scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] == "undefined") {
				$scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType] = {};
				$scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]=false;;

			} else {
				if ( typeof $scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth] == "undefined") {
				$scope.currentTreatmentPlanInformation[$scope.treatmentType][$scope.selectedTreatmentSubType][teeth]=false;;
				}
				
			}
		}
		console.log($scope.treatmentPlanInformation);
	};


	$scope.removeTeethFromTreatment = function(treatmentType, selectedTreatmentSubType, teeth,treatmentDone) {
					if(treatmentDone =="Completed" || treatmentDone =="InProgress"){
						alert("Treatment already completed remove disabled.");
						return;
					}
					delete $scope.treatmentPlanInformation[treatmentType][selectedTreatmentSubType][teeth];
					var subtreatmentkeys =Object.keys( $scope.treatmentPlanInformation[treatmentType][selectedTreatmentSubType]);
					if(subtreatmentkeys.length==0){
						delete $scope.treatmentPlanInformation[treatmentType][selectedTreatmentSubType];
						var treatmentkeys =Object.keys( $scope.treatmentPlanInformation[treatmentType]);
                        if(treatmentkeys.length==0){
                            delete $scope.treatmentPlanInformation[treatmentType];
                        }
					}

					delete $scope.currentTreatmentPlanInformation[treatmentType][selectedTreatmentSubType][teeth];
					var subtreatmentkeys =Object.keys( $scope.currentTreatmentPlanInformation[treatmentType][selectedTreatmentSubType]);
					if(subtreatmentkeys.length==0){
						delete $scope.currentTreatmentPlanInformation[treatmentType][selectedTreatmentSubType];
						var treatmentkeys =Object.keys( $scope.treatmentPlanInformation[treatmentType]);
                        if(treatmentkeys.length==0){
                            delete $scope.currentTreatmentPlanInformation[treatmentType];
                        }
					}
        
        console.log(treatmentPlanInformation);
        console.log(subtreatmentkeys);
				
		 
	};

	function removeData(treatmentType, selectedTreatmentSubType, teeth) {
		var index = $scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType].indexOf(teeth);
		if (index > -1) {
			$scope.treatmentInformation[$scope.treatmentType][$scope.selectedTreatmentSubType].splice(index, 1);
		}
	};

	$scope.getDiagnosisInformation = function() {
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
		var regurl = $rootScope.restURL+'/getCurrentTreatmentSummary/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the patient details " + patientid + data);


			$scope.treatmentPlanInformation = data.treatmentPlanSummaryResponse.treatmentPlanData;
			$scope.diagnosisInformation=data.diagonsisSummaryResponse.diagnosisData;
			 //$scope.summaryResponse = addSymbols(data);
		});
	};
	 function isEmptyObject(obj) {
 	 return !Object.keys(obj).length;
 }
   // ADDS + AND - SYMBOLS
	var addSymbols = function(data){
		return JSON.parse(JSON.stringify(data).replace(/pos/g,"\+").replace(/neg/g,"-"));
	}
	
	$scope.getTreatmentSummary = function() {
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
		var regurl = $rootScope.restURL+'/getTreatmentSummary/' + patientid;
		$http.get(regurl).success(function(data) {
			console.log("got the patient details " + patientid + data);
			$scope.treatmentInformation = data;

		});
	};
	
$scope.treatmentStateChange = function(disease,subDisease,teeth){

	if (typeof $scope.treatmentDone[disease] == 'undefined'){
		$scope.treatmentDone[disease]={};
		$scope.treatmentDone[disease][subDisease]={};
		$scope.treatmentDone[disease][subDisease][teeth]=false;
	}else{

	}



	
	
	
	if(!treatmentDoneboolean){
	
	$scope.treatmentDone[disease][subDisease][teeth]=true;
	$scope.summaryResponse.treatmentPlanSummaryResponse[disease][subDisease][teeth]=true;

	}
	else{
	$scope.summaryResponse.treatmentPlanSummaryResponse[disease][subDisease][teeth]=false;
	$scope.treatmentDone[disease][subDisease][teeth]=false;
	}
	console.log($scope.treatmentDone);
};


	$scope.savePaymentEstimate = function(paymentEstimate){
		console.log("paymentEstimate"+paymentEstimate);
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = true;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = false;
		$scope.newPaymentHome = false;

		$scope.paymentEstimate = paymentEstimate;
		console.log("Adding payment estimate");
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savePaymentEstimate';
		$scope.master = {};
		$scope.master = angular.copy(paymentEstimate);
		$scope.master.patientId = patientid;
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
			console.log(response);
			$scope.paymentMaster =  response;
			$scope.payementEstimateMsg="Payment Estimate Saved Successfully"
			$scope.treatmentType="Payment Estimate Msg"
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
			$scope.payementEstimateMsg="Error in saving Payment Estimate"
			$scope.treatmentType="Payment Estimate Msg"
		});
		 
	}


 $scope.estimatechanged = function($event){
      //  alert("ssss");
         $scope.paymentEstimate.estimateAmount=0;
        for(var i=0;i< $scope.paymentEstimate.estimateelemnt .length;i++) {
      // alert($scope.paymentEstimate.estimateelemnt [i].treatmentsubcost);   
              //alert($scope.paymentEstimate.estimateelemnt [i].units); 
			var subcosttemp =$scope.paymentEstimate.estimateelemnt [i].unitCost * $scope.paymentEstimate.estimateelemnt [i].units;
            $scope.paymentEstimate.estimateelemnt [i].subcost=subcosttemp;
            //alert($scope.paymentEstimate.estimateAmount);
            $scope.paymentEstimate.estimateAmount=parseFloat($scope.paymentEstimate.estimateAmount)+parseFloat (subcosttemp);
        }
    }
$scope.preparePaymentEstimate =function(){
	console.log("Creatting payment estimate \n");
	var treatmentPlan =$scope.currentTreatmentPlanInformation;
	var paymentEstimate ={};
	paymentEstimate["estimateelemnt"]=[];
	var count =0;
	for (var k in treatmentPlan) {
		var treatmentPlanSubset = treatmentPlan[k];
		for(var j in treatmentPlanSubset){
			var treatmentTeethArry= Object.keys(treatmentPlanSubset[j]);
			console.log(treatmentTeethArry);
			var estimateelemntitem={};
			estimateelemntitem["treatmenttype"]=k+" # "+j;
			estimateelemntitem["teethDiagnosied"]=treatmentTeethArry.toString();
			estimateelemntitem["length"]=treatmentTeethArry.length;
			estimateelemntitem["id"]=count;
			estimateelemntitem["units"]=treatmentTeethArry.length;
			estimateelemntitem["subcost"]=0;
			estimateelemntitem["unitCost"]=0;
			estimateelemntitem["comment"]="";
			count++;
			paymentEstimate["estimateelemnt"].push(estimateelemntitem);
			//treatmentPlanSubset[j]=toObject(treatmentTeethArry);
			//console.log(treatmentPlanSubset[j]);
		}
		
	}
	paymentEstimate["estimateAmount"]=0;
	console.log(paymentEstimate);
	$scope.paymentEstimate= paymentEstimate;
	// console.log("\n\n"+treatmentPlan +"\n EnD");
}

	$scope.setPatientId = function(){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
	};

	
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
	
	$scope.setPatientId();
	 $scope.getDiagnosisInformation();

}]);