app.controller('reportsController', reportsController);

function reportsController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.pendingAmountReport = {};

	$scope.getNetPendingAmountReport = function() {
	 	console.log("test");
		var regurl = '/getNetPendingAmountTreatmentReport' ;
		$http.get(regurl).success(function(data) {
			console.log(data);
		$scope.pendingAmountReport = {"pendingAmountReport" : data };
		});
	}
 
	$scope.getNetPendingAmountReport();
}