app.controller('reportsController', reportsController);

function dailyReportsController($scope, $http, $templateCache, $location, $routeParams) {
	$scope.master = {};
	$scope.dailyPaymentReport = {};

	$scope.getDailyPaymentReport = function() {
		var year = $routeParams.year;
		var month = $routeParams.month;
		var dayOfMonth = $routeParams.dayOfMonth;
	 	console.log("test");
		var regurl = '/getDailyPaymentReportReport/'+year+'/'+month+'/'+dayOfMonth+'/' ;
		$http.get(regurl).success(function(data) {
			console.log(data);
		var totalPayment=calculateTotalPayment(data);
		console.log("total Payment" +totalPayment)
		$scope.dailyPaymentReport = {"dailyPaymentReport" : data ,"paymentDate" : data[0]["paymentDate"] ,"totalPayment":totalPayment};
		});
	}
 

	$scope.getDailyPaymentReport();
}

	function calculateTotalPayment(data){
		var totalPaymentcal = 0;
		for(var i = 0; i < data.length;i++){
			payment = data[i];
			console.log("***********************************");
			console.log(payment["paymentName"]);
			if(payment["paymentName"] == "Payment" )
			{
			totalPaymentcal=totalPaymentcal+parseFloat(payment["paidAmount"]);
		}
			console.log(payment.paidAmount);
			console.log(totalPaymentcal);
		}
		return totalPaymentcal;
	}