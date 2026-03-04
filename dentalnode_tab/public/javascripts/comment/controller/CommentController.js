app.controller('CommentController',[ '$scope', '$http', '$templateCache', '$location', '$routeParams', '$rootScope', '$modal', '$log', function($scope, $http, $templateCache, $location, $routeParams, $rootScope,  $modal, $log) {
	$scope.master = {};
	$scope.doctor = {};
	$scope.patient = {};
	$scope.comment = {};
	$scope.commentList = [];
	$scope.commentid = 0;
	$scope.commentPanel = false;
	$scope.commentEdit = {};
	$scope.tooltipmessage = "Edit Follow Up Message";

	$scope.editFollowUp = function(followUpMsg){
		followUpMsg.isEdit=true;
		console.log(followUpMsg);
	};

  /*$scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.commentEdit;
        },
        commentList : function(){
        	return $scope.commentList;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
    	console.log($scope.selected);
    	console.log(selectedItem);
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };*/
	
  $scope.ok = function (comment) {
  	console.log(comment);
  	var method = 'POST';
	var inserturl = $rootScope.restURL+'/updateComment';
	var jdata = 'mydata=' + JSON.stringify(comment);
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
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});
	comment.isEdit = false;
  };

  $scope.cancel = function (comment) {
    comment.isEdit = false;
  };


	$scope.getPatientVisitReport = function() {
		var patientid = $routeParams.patientid;
		$scope.patient.patientid = patientid;
		$scope.doctor.name = sessionStorage.getItem("user");

		var regurl = $rootScope.restURL+'/comment/' + patientid + '/' + $scope.commentid;
		$http.get(regurl).success(function(data) {
			console.log("got the comments for patient " + patientid);
			console.log(data);
			for(var i=0; i<data.length;i++){
				var isoDate = new Date(data[i].date);
				data[i]["time"] = isoDate.getHours()+":"+isoDate.getMinutes()+":"+isoDate.getSeconds();
				data[i]["date"] = isoDate.getUTCDate()+"-"+isoDate.getUTCMonth()+"-"+isoDate.getUTCFullYear();
				data[i]["isEdit"] = false;
			}
			$scope.commentList =  data;
		});
	};

	$scope.addComment = function(){
		$scope.commentPanel = true;
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

	$scope.getPatientVisitReport();

}]);


/*app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $rootScope, $templateCache, items, commentList) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
  	console.log(items);
  	var method = 'POST';
	var inserturl = $rootScope.restURL+'/updateComment';
	var jdata = 'mydata=' + JSON.stringify(items);
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
		}).error(function(response) {
			console.log("error");
			$scope.codeStatus = response || "Request failed";
			console.log($scope.codeStatus);
		});

    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});*/
