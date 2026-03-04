app.controller('NetPendingAmountReportController', NetPendingAmountReportController);

function NetPendingAmountReportController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.pendingAmountReport = {};

	$scope.getNetPendingAmountReport = function() {


		var fromYear = $routeParams.fromYear,
				fromMonth = $routeParams.fromMonth,
				fromDayOfMonth = $routeParams.fromDayOfMonth,
				toYear = $routeParams.toYear,
				toMonth = $routeParams.toMonth,
				toDayOfMonth = $routeParams.toDayOfMonth;

			var regurl = '/getNetPendingAmountTreatmentReport/'+fromYear+'/'+fromMonth+'/'+fromDayOfMonth+'/'+toYear+'/'+toMonth+'/'+toDayOfMonth;

			$http.get(regurl).success(function(data) {
				var totalNetPendingAmount=calculateTotalPayment(data);
				$scope.pendingAmountReport = {"pendingAmountReport" : data , "totalNetPendingAmount":totalNetPendingAmount};
			});
	}

	$scope.getNetPendingAmountReport();


	function calculateTotalPayment(data){
		var totalNetPendingAmount = 0;
		for(var i = 0; i < data.length; i++){
			totalNetPendingAmount = totalNetPendingAmount + parseFloat(data[i].netPendingAmount);
		}
		return totalNetPendingAmount;
	}




}
