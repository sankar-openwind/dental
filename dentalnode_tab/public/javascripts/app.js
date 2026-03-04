'use strict';
var app = angular.module("dentalApp",
		['ngRoute', 'ngSanitize', 'ui.bootstrap']);

app.run(function($rootScope) {
    $rootScope.restURL = 'http://localhost:3000';
});

app.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

app.config([ '$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl : 'common/partials/home.html',
	});
	
	$routeProvider.when('/patientHome', {
		templateUrl : 'patient/partials/patientHome.html',
	});
	
	$routeProvider.when('/newPatient', {
		controller : 'PatientController',
		templateUrl : 'patient/partials/newPatient.html'
	});

	$routeProvider.when('/viewPatient/:patientid', {
		controller : 'PatientController',
		templateUrl : 'patient/partials/viewPatient.html'
	});

	$routeProvider.when('/searchPatient', {
		controller : 'PatientController',
		templateUrl : 'patient/partials/searchPatient.html'
	});
	
	$routeProvider.when('/chiefComplaint/:patientid', {
		templateUrl : 'ChiefComplaint/partials/caseHistory.html',
		controller : 'ChiefComplaintController'
	});
	
	$routeProvider.when('/photos/:patientid', {
		templateUrl : 'PatientPhoto/partials/photosPage.html',
		controller : 'PatientPhotoController'
	});
	
	$routeProvider.when('/clinicalDiagnosis/:patientid', {
		templateUrl : 'clinicalDiagonsis.html',
		controller : 'PatientController'
	});
	
	$routeProvider.when('/photosPage/:patientid', {
		templateUrl : 'photosPage.html',
		controller : 'PatientController'
	});
	
	$routeProvider.when('/diagnosisPage/:patientid', {
		templateUrl : 'CaseHistory/partials/diagnosisPage.html',
		controller : 'DiagnosisController'
	});
	
	$routeProvider.when('/treatmentPage/:patientid', {
		templateUrl : 'TreatmentPlan/partials/treatmentPage.html',
		controller : 'TreatmentPlanController'
	});
	
	$routeProvider.when('/comment/:patientid', {
		templateUrl : 'comment/partials/comment.html',
		controller : 'CommentController'
	});
	$routeProvider.when('/payment/:patientid', {
		templateUrl : 'payment/partials/paymentHome.html',
		controller : 'PaymentController'
	});

	$routeProvider.when('/prescription/:patientid', {
		templateUrl : 'prescription.html',
		controller : 'PatientController'
	});
	
	$routeProvider.when('/treatmentMethods', {
		templateUrl : 'treatmentMethods.html',
	});
	
	$routeProvider.when('/rootCannal', {
		templateUrl : 'rootcannal.html',
	});

} ]);