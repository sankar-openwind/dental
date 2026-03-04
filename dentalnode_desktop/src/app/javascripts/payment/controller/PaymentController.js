angular.module("dentalApp").controller('PaymentController', ['$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', '$route', 'roleInterceptor', function ($scope, $http, $templateCache, $location, $routeParams, $rootScope, $route, roleInterceptor) {
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
    $scope.ViewPaymentEstimatePanel = false;
     $scope.ViewPaymentPanel = false;
    $scope.treatmentTypes = [];
    $scope.isAdmin = roleInterceptor.isAdmin();


    $scope.getPaymentHomeScreen = function () {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = true;
         $scope.ViewPaymentPanel = false;

        console.log("Adding payment estimate");
        var method = 'POST';
        var inserturl = $rootScope.restURL + '/getPaymentEstimates';
        $scope.master = {};
        $scope.master.patientId = patientid;
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        console.log(jdata);

        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response);
            $scope.paymentEstimateList = response;

        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
    };






    $scope.savePaymentEstimate = function (paymentEstimate) {
        console.log("paymentEstimate" + paymentEstimate);
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = true;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = false;
         $scope.ViewPaymentPanel = false;

        $scope.paymentEstimate = paymentEstimate;
        console.log("Adding payment estimate");
        var method = 'POST';
        var inserturl = $rootScope.restURL + '/savePaymentEstimate';
        $scope.master = {};
        $scope.master = angular.copy(paymentEstimate);
        $scope.master.patientId = patientid;
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        console.log(jdata);

        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response);
            $scope.paymentMaster = response;

        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
        $scope.addPaymentNew();
    }


    $scope.viewPaymentEstimateDetails = function (paymentEstimate) {

        console.log("view payment estimate" + paymentEstimate);
        console.log(paymentEstimate);
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.ViewPaymentEstiPanel = true;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = false;
        $scope.ViewPaymentPanel = false;
        $scope.paymentEstimate = paymentEstimate;
        console.log("Getting the payment screen");
    }

     $scope.viewPaymentDetails = function (payment) {

        console.log("view payment " + payment);
        console.log(payment);
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.ViewPaymentEstiPanel = false;
        $scope.ViewPaymentPanel = true;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = false;
        $scope.payment = payment;
        console.log("Getting the view payment screen");
    }

    $scope.addPaymentEstimate = function (paymentEstimate) {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.ViewPaymentEstimatePanel = false;
        $scope.PaymentEstimatePanel = true;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = false;
         $scope.ViewPaymentPanel = false;
        $scope.paymentEstimate = {};
        console.log("Getting the payment screen" + $scope.ViewPaymentEstimatePanel);

    };


    $scope.returnHome = function () {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.addPaymentNew();
        $scope.newPaymentHome = true;
        $route.reload();
    }

    $scope.viewPaymentsList = function (paymentEstimate) {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = true;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = false;
         $scope.ViewPaymentPanel = false;
        $scope.paymentEstimate = paymentEstimate;
        console.log("Payment Estimate Details Screen" + paymentEstimate);
    }

    $scope.addPaymentPlan = function (patientCheckin) {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.addPaymentPlanPanel = true;
        $scope.newPaymentHome = false;
         $scope.ViewPaymentPanel = false;
        $scope.plannedPayment ={};
        $scope.plannedPayment.treatmentAmount=0;
        $scope.plannedPayment.miscAmount=0;

        $scope.patientCheckin = patientCheckin;
    }

    $scope.addPaymentAdjustment = function (paymentEstimate) {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.paymentAdjustment ={};
        $scope.paymentAdjustment.miscAdjustmentAmount=0;
        $scope.paymentAdjustment.treatmentAdjustedAmount=0;
        $scope.addPaymentAdjustmentPanel = true;
        $scope.newPaymentHome = false;
         $scope.ViewPaymentPanel = false;
        $scope.paymentEstimate = paymentEstimate;
    }
    
    $scope.savePaymentAdjustment = function (paymentAdjustment) {

        var patientId = $routeParams.patientid;
        $scope.patient.patientid = patientId;
        var method = 'POST';
        var inserturl = $rootScope.restURL + '/savePaymentAdjustment';
        $scope.master = {};
        $scope.master = angular.copy(paymentAdjustment);
        $scope.master.patientId = patientId;
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response);
            $scope.paymentMaster = response;

        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });

        $scope.addPaymentNew();

    };
    
    
    $scope.saveMiscPayment = function (miscPayment) {
        var patientId = $routeParams.patientid;
        $scope.patient.patientid = patientId;
        var method = 'POST';
        var inserturl = $rootScope.restURL + '/saveMiscPayment';
        $scope.master = {};
        $scope.master = angular.copy(miscPayment);
        $scope.master.patientId = patientId;
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response);
            $scope.paymentMaster = response;

        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });

        $scope.addPaymentNew();

    };  
    
    

 $scope.updatePaymentPlanAmount = function (plannedPayment) {
     
     $scope.plannedPayment.totalPlannedAmount=parseFloat($scope.plannedPayment.treatmentAmount)+parseFloat($scope.plannedPayment.miscAmount);
    }

$scope.updatePaymentAdjustment = function (plannedPayment) {
     
     $scope.paymentAdjustment.totalAdjustmentAmount=parseFloat($scope.paymentAdjustment.treatmentAdjustedAmount)+parseFloat($scope.paymentAdjustment.miscAdjustmentAmount);
    }


    $scope.savePaymentPlan = function (plannedPayment,patientCheckin) {
        console.log( $scope.patientCheckin._id);
        console.log( $scope.patientCheckin);
        console.log( $scope.plannedPayment);
        var patientId = $routeParams.patientid;
        $scope.patient.patientid = patientId;
        var method = 'POST';
        var inserturl = $rootScope.restURL + '/updatePaymentPlanToPatientCheckin';
        $scope.master = {};
        $scope.master = angular.copy(plannedPayment);
        $scope.master.patientId = patientId;
        //alert(paymentType);
        var jdata = 'mydata=' + JSON.stringify($scope.master);
         
        console.log(jdata);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response);
            $scope.paymentMaster = response;
            $scope.addPaymentPlanPanel = false;


        }).error(function (response) {
            console.log("error" +response);
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });

          $scope.addPaymentPlanPanel = false;
        $scope.addPaymentNew();

    }


    /*

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
    */




 


    $scope.addPaymentNew = function () {
        var patientid = $routeParams.patientid;
        $scope.patient.patientid = patientid;
        $scope.PaymentEstimatePanel = false;
        $scope.paymentEstimateListPanel = false;
        $scope.viewPaymentListPanel = false;
        $scope.addPaymentPanel = false;
        $scope.newPaymentHome = true;
        $scope.ViewPaymentEstiPanel = false;
        $scope.addPaymentAdjustmentPanel = false;
         $scope.ViewPaymentPanel = false;
        $scope.addPaymentPlanPanel = false;
        // alert($scope.ViewPaymentEstimatePanel);

        var method = 'POST';
        var inserturl = $rootScope.restURL + '/getPaymentMaster';
        $scope.master = {};
        $scope.master.patientId = patientid;
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        console.log(jdata);

        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: $templateCache
        }).success(function (response) {
            console.log(response + $scope.ViewPaymentEstiPanel);
            console.log(response + $scope.newPaymentHome);

            $scope.paymentMaster = response;

        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });


        $http.get($rootScope.restURL + '/treatmenttypes').success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.treatmentTypes = data;
        }).error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("EXCEPTION IN QUEYING FOR TREATMENT TYPES");
        });

    };


    $scope.getPatientCheckinDetails = function () {
        var patientId = $routeParams.patientid;
        var regurl = $rootScope.restURL + '/getPatientActveCheckinToday/' + patientId;
         $scope.patientCheckinBoolean = false;
        if(patientId){
        $http.get(regurl).success(function (data) {
            console.log(patientId);
            console.log(data);
            console.log("got the patient details " + patientId + data);
            if(data.checkinDate  ){
                 console.log(data.length);
                $scope.patientCheckinBoolean = true; 
                $scope.patientCheckin=data;
            }
      
          
        });
    }
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


    $scope.getPatientCheckinDetails();


    $scope.addPaymentNew();

}]);


angular.module("dentalApp").controller('estimateCtrl', ['$scope', function ($scope) {
    var counter = 0;
    $scope.paymentEstimate = {};
    $scope.paymentEstimate.estimateelemnt = [{
        id: counter,
        treatmenttype: '',
        treatmentsubcost: '',
        units: '',
        subcost: '',
        inline: true
    }];
    $scope.paymentEstimate.estimateAmount = 0;

$scope.totalPlannedAmount=0.0;




    $scope.removeitem = function ($index) {
        // alert($index);
        $scope.paymentEstimate.estimateelemnt.splice($index, 1);
        $scope.estimatechanged();
    }
    $scope.estimatechanged = function ($event) {
        //  alert("ssss");
        $scope.paymentEstimate.estimateAmount = 0;
        for (var i = 0; i < $scope.paymentEstimate.estimateelemnt.length; i++) {
            // alert($scope.paymentEstimate.estimateelemnt [i].treatmentsubcost);   
            //alert($scope.paymentEstimate.estimateelemnt [i].units); 
            var subcosttemp = $scope.paymentEstimate.estimateelemnt[i].treatmentsubcost * $scope.paymentEstimate.estimateelemnt[i].units;
            $scope.paymentEstimate.estimateelemnt[i].subcost = subcosttemp;
            //alert($scope.paymentEstimate.estimateAmount);
            $scope.paymentEstimate.estimateAmount = parseFloat($scope.paymentEstimate.estimateAmount) + parseFloat(subcosttemp);
        }
    }

    $scope.newItem = function ($event) {
        //alert("ssssssss"+counter);
        counter++;
        $scope.paymentEstimate.estimateelemnt.push({
            id: counter,
            treatmenttype: '',
            treatmentsubcost: '',
            units: '',
            subcost: '',
            inline: true
        });
        $event.preventDefault();
    }
    $scope.inlinef = function ($event, inlinecontrol) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $('#' + inlinecontrol).css('display', 'inline');
        } else {
            $('#' + inlinecontrol).css('display', '');
        }

    }
    $scope.showitems = function ($event) {
        $('#displayitems').css('visibility', 'none');
    }

   

}]);