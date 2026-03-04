
angular.module("dentalApp").controller('paymentPlanController', ['$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', '$route', 'roleInterceptor', function ($scope, $http, $templateCache, $location, $routeParams, $rootScope, $route, roleInterceptor) {

 $scope.paymentSuccessMessage="";


    $scope.addPayment = function (palnnedPayment) {
          $scope.addPaymentPanel = true;
          $scope.palnnedPayment=palnnedPayment;
       }


$scope.dataIsEmpty = function(data) {
  if (data > 0) {
   return false;
  }
  else {
   return true;
  }
};



$scope.savePayment = function (palnnedPayment) {
 
        $scope.plannedPaymentList = {};
        var method = 'POST';
    
        var inserturl;
        inserturl = $rootScope.restURL + '/savePayment';  
        $scope.master = {};
        $scope.master = angular.copy(palnnedPayment);
        $scope.master.patientId = palnnedPayment.patientId;
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
            $scope.paymentSuccessMessage="Payment Made Successfully";
            $scope.addPaymentPanel = false;
           $scope.getTodayCheckInDetails();
           $scope.getOldPendingCheckInDetails();
            $location.path("/acceptPayments/");


        }).error(function (response) {
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
        $scope.addPaymentPanel = false;



    };



    $scope.changeStatus = function (index, patient) {
        // SETTING THIS VARIABLE SO THAT THE USER CANT SUBMIT 2 REQUEST WHEN ONE IS IN PROGRESS
        var inserturl = $rootScope.restURL + '/updatePatientCheckin';
        var patientCheckin = angular.copy(patient);
        var method = 'POST';
        patientCheckin["patientCheckinId"]=patientCheckin._id;
        
        if(angular.lowercase(patientCheckin.checkInStatus)==='waiting'){
            patientCheckin.checkInStatus = 'InProgress';
        } else if(angular.lowercase(patientCheckin.checkInStatus)==='inprogress'){
            patientCheckin.checkInStatus = 'Completed';
        }
        var jdata = 'mydata=' + JSON.stringify(patientCheckin);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (response) {
            console.log(response);
            $scope.isChangingStatus = false;
            $scope.checkInList[index]["checkInStatus"] = response.checkInStatus;
            $scope.checkInList[index]["isChangingStatus"] = false;
            if(response.checkInStatus ==="completed"){
                $scope.checkInList[index]["isChangingStatus"] = true;
            }
        }).error(function (response) {
            console.log("error" +response);
            $scope.isChangingStatus = false;
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });       
    };


    $scope.getTodayCheckInDetails= function () {
        var method = 'GET';
        var inserturl = $rootScope.restURL + '/getTodayCheckInDetails/';
        $scope.master = {};
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        console.log(jdata);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        }).success(function (response1) {
            console.log(response1);
            /* for(var i=0; i<response1.length; i++){
                if(response1[i].checkInStatus ==="completed"){
                    response1[i]["isChangingStatus"] = true;
                }else {
                    response1[i]["isChangingStatus"] = false;
                }
            }*/
            $scope.checkInList = response1;
            $scope.addPaymentPlanPanel=false;
        }).error(function (responseerr) {
            console.log("error");
            $scope.codeStatus = responseerr || "Request failed";
            console.log($scope.codeStatus);
        });

    };



    $scope.getOldPendingCheckInDetails= function () {
        var method = 'GET';
        var inserturl = $rootScope.restURL + '/getOldPendingCheckInDetails/';
        $scope.master = {};
        var jdata = 'mydata=' + JSON.stringify($scope.master);
        console.log(jdata);
        $http({
            method: method,
            url: inserturl,
            data: jdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        }).success(function (response1) {
            console.log(response1);
            $scope.OldcheckInList = response1;

        }).error(function (responseerr) {
            console.log("error");
            $scope.codeStatus = responseerr || "Request failed";
            console.log($scope.codeStatus);
        });

    };

   
 $scope.getOldPendingCheckInDetails();
   $scope.getTodayCheckInDetails();
}]);
