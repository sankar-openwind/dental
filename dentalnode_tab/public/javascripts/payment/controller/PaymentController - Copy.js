app.controller('PaymentController',[ '$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', function($scope, $http, $templateCache, $location, $routeParams, $rootScope) {
	$scope.master = {};
	$scope.doctor = {};
	$scope.patient = {};
	$scope.comment = {};
	$scope.commentList = [];
	$scope.commentid = 0;
	$scope.PaymentEstimatePanel = false;
	$scope.paymentEstimateListPanel = true;
	$scope.viewPaymentListPanel = false;
	$scope.addPaymentPanel = false;
 

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

 

	$scope.addPaymentEstimate = function(paymentEstimate){
		var patientid = $routeParams.patientid;
		$scope.patient.patientid=patientid;
		$scope.PaymentEstimatePanel = true;
		$scope.paymentEstimateListPanel = false;
		$scope.viewPaymentListPanel = false;
		$scope.addPaymentPanel = false;
		$scope.newPaymentHome = false;
		$scope.paymentEstimate = {};
		console.log("Getting the payment screen");

	};

 


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



	

	

	$scope.submitComment = function(){
		$scope.commentPanel = false;
		var method = 'POST';
		var inserturl = $rootScope.restURL+'/comment';
		var jdata = $scope.comment;
		jdata["doctor"] = sessionStorage.getItem("user");
		jdata["patientid"] = $scope.patient.patientid;
		jdata["commentid"] = $scope.commentid;
		var jdata = 'mydata=' + JSON.stringify(jdata);
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
			$scope.commentList.push(response);
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

	}


	$scope.addPaymentNew = function() {
	var patientid = $routeParams.patientid;
	$scope.patient.patientid=patientid;
	$scope.PaymentEstimatePanel = false;
	$scope.paymentEstimateListPanel = false;
	$scope.viewPaymentListPanel = false;
	$scope.addPaymentPanel = false;
	$scope.newPaymentHome = true;


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
			console.log(response);
			$scope.paymentMaster =  response;
			
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	};



	$scope.addPaymentNew();

}]);


 

function estimateCtrl($scope){
    var counter=0;
    $scope.estimateelemnt = [ {id:counter, treatmenttype : '', treatmentsubcost : '', units : '', subcost : '',inline:true} ];
	 $scope.totalcost=0;
    
     $scope.removeitem = function($index){
        // alert($index);
         $scope.estimateelemnt.splice($index, 1);
         $scope.estimatechanged();
     }
    $scope.estimatechanged = function($event){
      //  alert("ssss");
         $scope.totalcost=0;
        for(var i=0;i< $scope.estimateelemnt.length;i++) {
      // alert($scope.estimateelemnt[i].treatmentsubcost);   
              //alert($scope.estimateelemnt[i].units); 
var subcosttemp =$scope.estimateelemnt[i].treatmentsubcost * $scope.estimateelemnt[i].units;
            $scope.estimateelemnt[i].subcost=subcosttemp;
            //alert($scope.totalcost);
            $scope.totalcost=parseFloat($scope.totalcost)+parseFloat (subcosttemp);
        }
      
    }
       
 
    $scope.newItem = function($event){
    	alert("ssssssss"+counter);
        counter++;
        $scope.estimateelemnt.push( {id:counter, treatmenttype : '', treatmentsubcost : '', units : '', subcost : '',inline:true} );
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