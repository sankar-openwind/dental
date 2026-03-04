app.controller('PaymentController',[ '$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope','$route', function($scope, $http, $templateCache, $location, $routeParams, $rootScope,$route) {
	$scope.master = {};
	$scope.doctor = {};
	$scope.patient = {};
	$scope.comment = {};
	$scope.commentList = [];
	$scope.commentid = 0;
	$scope.PaymentEstimatePanel = false;
	$scope.paymentEstimateListPanel = false;
	$scope.viewPaymentListPanel = false;
	$scope.addPaymentPanel = false;
	$scope.AddPaymentAdjustmentPanel = false;
 	$scope.ViewPaymentEstimatePanel=false;
 	$scope.treatmentTypes = [];
	 
	$scope.getPaymentHomeScreen = function() {
	var patientid = $routeParams.patientid;
	$scope.patient.patientid=patientid;
	$scope.PaymentEstimatePanel = false;
	$scope.paymentEstimateListPanel = false;
	$scope.viewPaymentListPanel = false;
	$scope.addPaymentPanel = false;
	$scope.newPaymentHome = true;

	console.log("Adding payment estimate");
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/getPaymentEstimates';
		$scope.master = {};
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
			$scope.paymentEstimateList =  response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
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
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
		$scope.addPaymentNew();
	}

 
 	 $scope.viewPaymentEstimateDetails=function(paymentEstimate){

 	 	console.log("view payment estimate"+paymentEstimate);
 	 	console.log(paymentEstimate);
 	 	var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = false;
		$scope.ViewPaymentEstiPanel = true;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = false;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate = paymentEstimate;
		console.log("Getting the payment screen");
 	 }

	$scope.addPaymentEstimate = function(paymentEstimate){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.ViewPaymentEstimatePanel = false;
		$scope.PaymentEstimatePanel = true;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = false;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate = {};
		console.log("Getting the payment screen"+$scope.ViewPaymentEstimatePanel);

	};

 
	$scope.returnHome=function(){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.addPaymentNew();
		$scope.newPaymentHome = true;
		$route.reload();
	}

	$scope.viewPaymentsList = function(paymentEstimate){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = false;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = true;
		$scope.addPaymentPanel = false;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate = paymentEstimate;
		console.log("Payment Estimate Details Screen"+paymentEstimate);

		 

	}

	
	
	$scope.addPayment = function(paymentEstimate){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = false;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = true;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate=paymentEstimate;

	}

	$scope.addPaymentAdjustment = function(paymentEstimate){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = false;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = false;
		$scope.addPaymentAdjustmentPanel = true;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate=paymentEstimate;

	}

	$scope.savePaymentAdjustment = function(paymentAdjustment){

		var patientId = $routeParams.patientid;
		$scope.patient.patientid=patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savePaymentAdjustment';
		$scope.master = {};
		$scope.master = angular.copy(paymentAdjustment);
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
		$scope.paymentMaster = response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

		$scope.addPaymentNew();

	}

	$scope.savePayment = function(paymentEstimate){

		var patientId = $routeParams.patientid;
		$scope.patient.patientid=patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savePayment';
		$scope.master = {};
		$scope.master = angular.copy(paymentEstimate);
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
		$scope.paymentMaster = response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

		$scope.addPaymentNew();

	}



$scope.savePayment = function(paymentEstimate){

		var patientId = $routeParams.patientid;
		$scope.patient.patientid=patientId;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/savePayment';
		$scope.master = {};
		$scope.master = angular.copy(paymentEstimate);
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
		$scope.paymentMaster = response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

		$scope.addPaymentNew();

	}




	$scope.addPaymentNew = function() {
	var patientid = $routeParams.patientid;
	$scope.patient.patientid=patientid;
	$scope.PaymentEstimatePanel = false;
	$scope.paymentEstimateListPanel = false;
	$scope.viewPaymentListPanel = false;
	$scope.addPaymentPanel = false;
	$scope.newPaymentHome = true;
	$scope.ViewPaymentEstiPanel = false;
	$scope.addPaymentAdjustmentPanel = false;
	// alert($scope.ViewPaymentEstimatePanel);

		var method = 'POST';
		var inserturl = $rootScope.restURL+'/getPaymentMaster';
		$scope.master = {};
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
			console.log(response+$scope.ViewPaymentEstiPanel);
			console.log(response+$scope.newPaymentHome);

			$scope.paymentMaster =  response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});


		$http.get($rootScope.restURL+'/treatmenttypes').success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.treatmentTypes = data;
		  }).error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("EXCEPTION IN QUEYING FOR TREATMENT TYPES");
		  });

	};



	$scope.addPaymentNew();

}]);


 

function estimateCtrl($scope){
    var counter=0;
    $scope.paymentEstimate={};
    $scope.paymentEstimate.estimateelemnt  = [ {id:counter, treatmenttype : '', treatmentsubcost : '', units : '', subcost : '',inline:true} ];
	 $scope.paymentEstimate.estimateAmount=0;
    
     $scope.removeitem = function($index){
        // alert($index);
         $scope.paymentEstimate.estimateelemnt .splice($index, 1);
         $scope.estimatechanged();
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
       
 
    $scope.newItem = function($event){
    	//alert("ssssssss"+counter);
        counter++;
        $scope.paymentEstimate.estimateelemnt .push( {id:counter, treatmenttype : '', treatmentsubcost : '', units : '', subcost : '',inline:true} );
        $event.preventDefault();
    }
    $scope.inlinef= function($event,inlinecontrol){
        var checkbox = $event.target;
        if(checkbox.checked){
            $('#'+ inlinecontrol).css('display','inline');
        }else{
            $('#'+ inlinecontrol).css('display','');
        }

    }
    $scope.showitems = function($event){
        $('#displayitems').css('visibility','none');
    }


}