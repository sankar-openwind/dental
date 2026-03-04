'use strict';
var app = angular.module("dentalApp", ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'hmTouchEvents', 'cgNotify']);

app.run(function ($rootScope, notify, roleInterceptor) {
    $rootScope.restAuthURL = 'http://localhost:3000';
    $rootScope.restURL = 'http://localhost:3000/doctor'; 
    $rootScope.reportURL = 'http://localhost:81';
    $rootScope.isLoggedIn = $rootScope.isAdmin = $rootScope.isDoctor = $rootScope.isReceptionist = false;
    $rootScope.token = '';

    $rootScope.$on('error', function (event, message) {
        var errMsg = '';

        if (message.data.error) {
            errMsg = message.data.error;
        } else {
            errMsg = message.statusText;
        }

        $rootScope.classes = ["alert-success"];

        notify({
            message: errMsg,
            classes: $rootScope.classes,
            duration: 4000
        });
    });

    $rootScope.$on('success', function (event, message) {
        notify({
            message: message,
            duration: 4000
        });
    });

    $rootScope.$on('loggedin', function (loggedin) {
        $rootScope.isLoggedIn = loggedin;
        $rootScope.isAdmin = roleInterceptor.isAdmin;
        $rootScope.isDoctor = roleInterceptor.isDoctor;
        $rootScope.isReceptionist = roleInterceptor.isReceptionist;
    });
});

app.config(['$httpProvider', function ($httpProvider) {
    //$httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('authInterceptor');
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        controller: 'AuthController',
        templateUrl: '/app/javascripts/login/partials/home.html',
    });

    $routeProvider.when('/logout', {
        controller: 'logoutController',
        templateUrl: '/app/javascripts/login/partials/home.html',
    });

    $routeProvider.when('/register', {
        controller: 'AuthRegisterController',
        templateUrl: '/app/javascripts/login/partials/register.html'
    });

    $routeProvider.when('/home', {
        templateUrl: '/app/javascripts/common/partials/home.html'
    });

    $routeProvider.when('/patientHome', {
        templateUrl: '/app/javascripts/patient/partials/patientHome.html'
    });

    $routeProvider.when('/acceptPayments/', {
        controller: 'paymentPlanController',
        templateUrl: '/app/javascripts/payment/partials/acceptPayments.html'
    });

    $routeProvider.when('/newPatient', {
        controller: 'PatientController',
        templateUrl: '/app/javascripts/patient/partials/newPatient.html'
    });

    $routeProvider.when('/viewPatient/:patientid', {
        controller: 'PatientController',
        templateUrl: '/app/javascripts/patient/partials/viewPatient.html'
    });
    $routeProvider.when('/editPatient/:patientid', {
        controller: 'PatientController',
        templateUrl: '/app/javascripts/patient/partials/editPatient.html'
    });

    $routeProvider.when('/searchPatient', {
        controller: 'PatientController',
        templateUrl: '/app/javascripts/patient/partials/searchPatient.html'
    });

    $routeProvider.when('/chiefComplaint/:patientid', {
        templateUrl: '/app/javascripts/ChiefComplaint/partials/caseHistory.html',
        controller: 'ChiefComplaintController'
    });

    $routeProvider.when('/photos/:patientid', {
        templateUrl: '/app/javascripts/PatientPhoto/partials/photosPage.html',
        controller: 'PatientPhotoController'
    });

    $routeProvider.when('/clinicalDiagnosis/:patientid', {
        templateUrl: '/app/javascripts/clinicalDiagonsis.html',
        controller: 'PatientController'
    });

    $routeProvider.when('/photosPage/:patientid', {
        templateUrl: '/app/javascripts/photosPage.html',
        controller: 'PatientController'
    });

    $routeProvider.when('/diagnosisPage/:patientid', {
        templateUrl: '/app/javascripts/CaseHistory/partials/diagnosisPage.html',
        controller: 'DiagnosisController'
    });

    $routeProvider.when('/treatmentPage/:patientid', {
        templateUrl: '/app/javascripts/TreatmentPlan/partials/treatmentPage.html',
        controller: 'TreatmentPlanController'
    });

    $routeProvider.when('/treatmentSummary/:patientid', {
        templateUrl: '/app/javascripts/TreatmentSummary/partials/treatmentSummary.html',
        controller: 'TreatmentSummaryController'
    });

    $routeProvider.when('/comment/:patientid', {
        templateUrl: '/app/javascripts/comment/partials/comment.html',
        controller: 'CommentController'
    });
    $routeProvider.when('/payment/:patientid', {
        templateUrl: '/app/javascripts/payment/partials/paymentHome.html',
        controller: 'PaymentController'
    });

    $routeProvider.when('/prescription/:patientid', {
        templateUrl: '/app/javascripts/prescription.html',
        controller: 'PatientController'
    });
    $routeProvider.when('/doctorHome', {
        templateUrl: '/app/javascripts/doctor/partials/doctorHome.html',
        controller: 'DoctorController'
    });
    $routeProvider.when('/treatmentMethods', {
        templateUrl: '/app/javascripts/treatmentMethods.html'
    });

    $routeProvider.when('/rootCannal', {
        templateUrl: '/app/javascripts/rootcannal.html'
    });

}]);
