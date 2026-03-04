function diagonisController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.diseaseType = "Tooth Decay";
	$scope.selectedDiseaseSubType = null;
	$scope.diagnosisInformation = {};
	setButtonsToFalse();

	$scope.saveDiagonisSummary = function(diagnosisInformation) {
		var patientId = $routeParams.patientid;

		var method = 'POST';
		var inserturl = '/saveDiagnosisInformation';
		alert(patientId	);
		
		$scope.master = {};
		$scope.master.diagnosisData = angular.copy($scope.diagnosisInformation);
		var patientDetails={"patientId":patientId}
		$scope.master.patientId =patientId;
		console.log($scope.master);
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
			//	console.log("success");
			/*$scope.codeStatus = response.data;
			 var patientString = JSON.stringify(response.data);*/
			console.log(response);
			$scope.patient = response;
			$location.path("/diagnosisPage/" + patientId);

		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

	};

	$scope.toothDecay = function() {

		$scope.diseaseType = "Tooth Decay";
		$scope.selectedDiseaseSubType = null;
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
		setButtonsToFalse();
	};
	$scope.gumProblems = function() {

		$scope.diseaseType = "Gum Problems";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();
	};
	$scope.oralHygiene = function() {
		$scope.diseaseType = "Oral Hygiene";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();
	};
	$scope.dentalProcedures = function() {
		$scope.diseaseType = "Old Procedures";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();
	};
	$scope.otherProblems = function() {
		$scope.diseaseType = "Other Problems";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();

	};
	$scope.diagnosisSummary = function() {
		$scope.diseaseType = "Diagnosis Summary";
		$scope.selectedDiseaseSubType = null;
		setButtonsToFalse();

	};
	$scope.dentalCaries = function() {
		$scope.selectedDiseaseSubType = "Dental Caries";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.deepDentalCaries = function() {
		$scope.selectedDiseaseSubType = "Deep Dental Caries";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.crosslyDecayed = function() {
		$scope.selectedDiseaseSubType = "Grossly Decayed";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.RootFtumps = function() {
		$scope.selectedDiseaseSubType = "Root Ftumps";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.cervicalErosin = function() {
		$scope.selectedDiseaseSubType = "Cervical Erosin";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.attrition = function() {
		$scope.selectedDiseaseSubType = "Attrition";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.gingitis = function() {
		$scope.selectedDiseaseSubType = "Gingivitis";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.periodontis = function() {
		$scope.selectedDiseaseSubType = "Periodontitis";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.packets = function() {
		$scope.selectedDiseaseSubType = "Pockets";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.gingicalEnlargement = function() {
		$scope.selectedDiseaseSubType = "Gingival Enlargment";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.gingicalRecession = function() {
		$scope.selectedDiseaseSubType = "Gingival Recession";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.mobilityMo1 = function() {
		$scope.selectedDiseaseSubType = "Mobility G1";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.mobilityMo2 = function() {
		$scope.selectedDiseaseSubType = "Mobility G2";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.mobilityMo3 = function() {
		$scope.selectedDiseaseSubType = "Mobility G3";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.calculusCo1 = function() {
		$scope.selectedDiseaseSubType = "Calculus +";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.calculusCo2 = function() {
		$scope.selectedDiseaseSubType = "Calculus ++";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.calculusCo3 = function() {
		$scope.selectedDiseaseSubType = "Calculus +++";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.strainsSo1 = function() {
		$scope.selectedDiseaseSubType = "Stains +";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.strainsSo2 = function() {
		$scope.selectedDiseaseSubType = "Stains ++";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.strainsSo3 = function() {
		$scope.selectedDiseaseSubType = "Stains +++";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.missingTooth = function() {
		$scope.selectedDiseaseSubType = "Missing Tooth";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.sopraErupted = function() {
		$scope.selectedDiseaseSubType = "Sopra Erupted";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.impacted = function() {
		$scope.selectedDiseaseSubType = "Impacted";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.crowding = function() {
		$scope.selectedDiseaseSubType = "Crowding";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.spacing = function() {
		$scope.selectedDiseaseSubType = "Spacing";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.trauma = function() {
		$scope.selectedDiseaseSubType = "Trauma";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.abcess = function() {
		$scope.selectedDiseaseSubType = "Abcess";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.ulcers = function() {
		$scope.selectedDiseaseSubType = "Ulcers";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.frenal = function() {
		$scope.selectedDiseaseSubType = "High Frenal Attachments";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.deepbite = function() {
		$scope.selectedDiseaseSubType = "Deepbite";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.openbite = function() {
		$scope.selectedDiseaseSubType = "Open Bite";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.crossbite = function() {
		$scope.selectedDiseaseSubType = "Cross Bite";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.fracturedTeeth = function() {
		$scope.selectedDiseaseSubType = "Fractured Teeth";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.restorationsP = function() {
		$scope.selectedDiseaseSubType = "Restorations +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.restorationsN = function() {
		$scope.selectedDiseaseSubType = "Restorations -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.reTreatedP = function() {
		$scope.selectedDiseaseSubType = "Rc Treated +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.reTreatedN = function() {
		$scope.selectedDiseaseSubType = "Rc Treated -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.rpdP = function() {
		$scope.selectedDiseaseSubType = "RPD +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.rpdN = function() {
		$scope.selectedDiseaseSubType = "RPD -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.CDP = function() {
		$scope.selectedDiseaseSubType = "CD +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.CDN = function() {
		$scope.selectedDiseaseSubType = "CD -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.crownsP = function() {
		$scope.selectedDiseaseSubType = "Crowns +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.crownsN = function() {
		$scope.selectedDiseaseSubType = "Crowns -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.bridgesP = function() {
		$scope.selectedDiseaseSubType = "Bridges +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.bridgesN = function() {
		$scope.selectedDiseaseSubType = "Bridges -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};
	$scope.implantsP = function() {
		$scope.selectedDiseaseSubType = "Implants +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.implantsN = function() {
		$scope.selectedDiseaseSubType = "Implants -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.bracesP = function() {
		$scope.selectedDiseaseSubType = "Braces +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.bracesN = function() {
		$scope.selectedDiseaseSubType = "Braces -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.removableAppliancesP = function() {
		$scope.selectedDiseaseSubType = "Removable Appliances +Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.removableAppliancesN = function() {
		$scope.selectedDiseaseSubType = "Removable Appliances -Ve";
		setButtonsToFalse();
		resetButtonStates($scope.diseaseType, $scope.selectedDiseaseSubType);
	};

	$scope.t29 = function() {

		if (!$scope.startedt29) {
			$scope.startedt29 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "29");
		} else {
			$scope.startedt29 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "29");
		}
	};
	$scope.t28 = function() {

		if (!$scope.startedt28) {
			$scope.startedt28 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "28");
		} else {
			$scope.startedt28 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "28");
		}
	};
	$scope.t27 = function() {

		if (!$scope.startedt27) {
			$scope.startedt27 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "27");
		} else {
			$scope.startedt27 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "27");
		}
	};
	$scope.t26 = function() {

		if (!$scope.startedt26) {
			$scope.startedt26 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "26");
		} else {
			$scope.startedt26 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "26");
		}
	};

	$scope.t25 = function() {

		if (!$scope.startedt25) {
			$scope.startedt25 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "25");
		} else {
			$scope.startedt25 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "25");
		}
	};
	$scope.t24 = function() {

		if (!$scope.startedt24) {
			$scope.startedt24 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "24");
		} else {
			$scope.startedt24 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "24");
		}
	};
	$scope.t23 = function() {

		if (!$scope.startedt23) {
			$scope.startedt23 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "23");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "23");
			$scope.startedt23 = false;
		}
	};
	$scope.t22 = function() {

		if (!$scope.startedt22) {
			$scope.startedt22 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "22");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "22");
			$scope.startedt22 = false;
		}
	};
	$scope.t21 = function() {

		if (!$scope.startedt21) {
			$scope.startedt21 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "21");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "21");
			$scope.startedt21 = false;
		}

	};

	$scope.l39 = function() {

		if (!$scope.startedt39) {
			$scope.startedt39 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "39");
		} else {
			$scope.startedt39 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "39");
		}
	};
	$scope.l38 = function() {

		if (!$scope.startedt38) {
			$scope.startedt38 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "38");
		} else {
			$scope.startedt38 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "38");
		}
	};
	$scope.l37 = function() {

		if (!$scope.startedt37) {
			$scope.startedt37 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "37");
		} else {
			$scope.startedt37 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "37");
		}
	};
	$scope.l36 = function() {

		if (!$scope.startedt36) {
			$scope.startedt36 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "36");
		} else {
			$scope.startedt36 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "36");
		}
	};

	$scope.l35 = function() {

		if (!$scope.startedt35) {
			$scope.startedt35 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "35");
		} else {
			$scope.startedt35 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "35");
		}
	};
	$scope.l34 = function() {

		if (!$scope.startedt34) {
			$scope.startedt34 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "34");
		} else {
			$scope.startedt34 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "34");
		}
	};
	$scope.l33 = function() {

		if (!$scope.startedt33) {
			$scope.startedt33 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "33");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "33");
			$scope.startedt33 = false;
		}
	};
	$scope.l32 = function() {

		if (!$scope.startedt32) {
			$scope.startedt32 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "32");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "32");
			$scope.startedt32 = false;
		}
	};
	$scope.l31 = function() {

		if (!$scope.startedt31) {
			$scope.startedt31 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "31");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "31");
			$scope.startedt31 = false;
		}

	};

	$scope.l49 = function() {

		if (!$scope.startedt49) {
			$scope.startedt49 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "49");
		} else {
			$scope.startedt49 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "49");
		}
	};
	$scope.l48 = function() {

		if (!$scope.startedt48) {
			$scope.startedt48 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "48");
		} else {
			$scope.startedt48 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "48");
		}
	};
	$scope.l47 = function() {

		if (!$scope.startedt47) {
			$scope.startedt47 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "47");
		} else {
			$scope.startedt47 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "47");
		}
	};
	$scope.l46 = function() {

		if (!$scope.startedt46) {
			$scope.startedt46 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "46");
		} else {
			$scope.startedt46 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "46");
		}
	};

	$scope.l45 = function() {

		if (!$scope.startedt45) {
			$scope.startedt45 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "45");
		} else {
			$scope.startedt45 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "45");
		}
	};
	$scope.l44 = function() {

		if (!$scope.startedt44) {
			$scope.startedt44 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "44");
		} else {
			$scope.startedt44 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "44");
		}
	};
	$scope.l43 = function() {

		if (!$scope.startedt43) {
			$scope.startedt43 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "43");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "43");
			$scope.startedt43 = false;
		}
	};
	$scope.l42 = function() {

		if (!$scope.startedt42) {
			$scope.startedt42 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "42");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "42");
			$scope.startedt42 = false;
		}
	};
	$scope.l41 = function() {

		if (!$scope.startedt41) {
			$scope.startedt41 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "41");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "41");
			$scope.startedt41 = false;
		}

	};

	$scope.t19 = function() {

		if (!$scope.startedt19) {
			$scope.startedt19 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "19");
		} else {
			$scope.startedt19 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "19");
		}
	};
	$scope.t18 = function() {

		if (!$scope.startedt18) {
			$scope.startedt18 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "18");
		} else {
			$scope.startedt18 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "18");
		}
	};
	$scope.t17 = function() {

		if (!$scope.startedt17) {
			$scope.startedt17 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "17");
		} else {
			$scope.startedt17 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "17");
		}
	};
	$scope.t16 = function() {

		if (!$scope.startedt16) {
			$scope.startedt16 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "16");
		} else {
			$scope.startedt16 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "16");
		}
	};

	$scope.t15 = function() {

		if (!$scope.startedt15) {
			$scope.startedt15 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "15");
		} else {
			$scope.startedt15 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "15");
		}
	};
	$scope.t14 = function() {

		if (!$scope.startedt14) {
			$scope.startedt14 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "14");
		} else {
			$scope.startedt14 = false;
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "14");
		}
	};
	$scope.t13 = function() {

		if (!$scope.startedt13) {
			$scope.startedt13 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "13");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "13");
			$scope.startedt13 = false;
		}
	};
	$scope.t12 = function() {

		if (!$scope.startedt12) {
			$scope.startedt12 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "12");
		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "12");
			$scope.startedt12 = false;
		}
	};
	$scope.t11 = function() {

		if (!$scope.startedt11) {
			$scope.startedt11 = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "11");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "11");
			$scope.startedt11 = false;
		}

	};

	$scope.tlq = function() {

		if (!$scope.startedtlq) {
			$scope.startedtlq = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "First Quadrant");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "First Quadrant");
			$scope.startedtlq = false;
		}

	};
	$scope.trq = function() {

		if (!$scope.startedtrq) {
			$scope.startedtrq = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "Second Quadrant");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "Second Quadrant");
			$scope.startedtrq = false;
		}

	};
	$scope.blq = function() {

		if (!$scope.startedblq) {
			$scope.startedblq = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "Fourth Quadrant");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "Fourth Quadrant");
			$scope.startedblq = false;
		}

	};
	$scope.brq = function() {

		if (!$scope.startedbrq) {
			$scope.startedbrq = true;
			insertData($scope.diseaseType, $scope.selectedDiseaseSubType, "Third Quadrant");

		} else {
			removeData($scope.diseaseType, $scope.selectedDiseaseSubType, "Third Quadrant");
			$scope.startedbrq = false;
		}

	};

	$scope.exportToPDF = function(){
		/*var content = document.getElementsByTagName('body')[0].innerHTML;*/
		/*var content = window.location;*/
		/*var content = document.documentElement.outerHTML;*/
		var patientId = $routeParams.patientid;

		$scope.master = {};
		
		var method = 'POST';
		var inserturl = '/exportToPDF';
		var jdata = 'patientId=' + patientId ;

		$http({
			method : method,
			url : inserturl,
			data : jdata,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			cache : $templateCache
		}).success(function(response) {
			alert("SUCCESS");
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
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

	function resetButtonStates(diseaseType, selectedDiseaseSubType) {
		if ( typeof $scope.diagnosisInformation[$scope.diseaseType] != "undefined") {
			if ( typeof $scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType] != "undefined") {
				var arrayinfo = $scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType];
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
					if (arrayinfo[i] == "Second Quadrant") {
						$scope.startedtrq = true;
					}
					if (arrayinfo[i] == "First Quadrant") {
						$scope.startedtlq = true;
					}
					if (arrayinfo[i] == "Third Quadrant") {
						$scope.startedbrq = true;
					}
					if (arrayinfo[i] == "Fourth Quadrant") {
						$scope.startedblq = true;
					}
					//Do something
				}
			}
		}

	}

	function insertData(diseaseType, selectedDiseaseSubType, teeth) {
		// alert($scope.diagnosisInformation[$scope.diseaseType]);
		if (selectedDiseaseSubType == null) {
			setButtonsToFalse();
			return;
		}
		if ( typeof $scope.diagnosisInformation[$scope.diseaseType] == "undefined") {
			// alert("Inserting the new data");
			$scope.diagnosisInformation[$scope.diseaseType] = {};
			$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType] = [];
			$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType].push(teeth);
			//console($scope.diagnosisInformation);
		} else {
			if ( typeof $scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType] == "undefined") {
				$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType] = [];
				$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType].push(teeth);

			} else {
				$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType].push(teeth);
			}
		}
	};

	function removeData(diseaseType, selectedDiseaseSubType, teeth) {
		var index = $scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType].indexOf(teeth);
		if (index > -1) {
			$scope.diagnosisInformation[$scope.diseaseType][$scope.selectedDiseaseSubType].splice(index, 1);
		}
	};

}