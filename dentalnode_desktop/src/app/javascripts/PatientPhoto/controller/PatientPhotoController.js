angular.module("dentalApp").controller('PatientPhotoController', ['$scope', '$http', '$templateCache', '$location', '$routeParams', function($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.patient = {};

	$scope.getPatientDetails = function() {
		$scope.patient.patientid = $routeParams.patientid;
		var patientid = $routeParams.patientid;
		console.log(patientid);
	}

	$scope.getPatientDetails();

}]);

function CarouselDemoCtrl($scope, $http, $templateCache, $location, $routeParams, basket, $rootScope) {
  $scope.myInterval = 5000;
  $scope.master = {};
  $scope.patient = basket.items()[0];
  var slides = $scope.slides = [];
  console.log($scope.patient.path);


  var method = 'POST';
  var requestURL = $rootScope.restURL + '/getPatientPhotos';
  $scope.master = {};
  $scope.master = angular.copy($scope.patient);
  var jdata = 'mydata=' + JSON.stringify($scope.master);
  
  $http({
    method : method,
    url : requestURL,
    data : jdata,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    cache : $templateCache
  }).success(function(response) {
    var html = $(response);
    var aTags = html.find("a");
    $scope.images = [];
    for(var i=0; i<aTags.length; i++){
      var imageFileName = $(aTags[i]).attr("href");
      if(imageFileName.split(".")[1]=="jpg"){
        slides.push({
          image: $scope.patient.path+imageFileName
        });
      }

    }  
    console.log(slides); 

  }).error(function(response) {
    $scope.codeStatus = response || "Request failed";
    console.log($scope.codeStatus);
  });
    
  
}


var ModalDemoCtrl = function ($scope, $modal, $log, $http, $templateCache, $location, $routeParams, basket) {

  $scope.patient = {};
  $scope.patient["patientid"] = $routeParams.patientid;
  $scope.patient["path"] = "http://localhost:8079/dental/1/";

  basket.addItem($scope.patient);

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

angular.module("dentalApp").factory('basket', function() {
    var items = [];
    var myBasketService = {};

    myBasketService.addItem = function(item) {
        items.push(item);
    };
    myBasketService.removeItem = function(item) {
        var index = items.indexOf(item);
        items.splice(index, 1);
    };
    myBasketService.items = function() {
        return items;
    };

    return myBasketService;
});