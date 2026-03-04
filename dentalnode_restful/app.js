/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    payment = require('./routes/payment'),
    auth = require('./routes/auth'),
    filter = require('./routes/filter'),
    path = require('path'),
    mongoose = require('mongoose'),
    mongooseSchema = require('./mongoose/schema'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express();

//configuration ===============================================================
var configDB = require('./config/datasource.js');
var favicon_url = null;
var jsonParser = bodyParser.json();

//connect to database
console.log("Connecting to mongoose"+mongoose);
mongoose.connect(configDB.url);

var db = mongoose.connection;
console.log("conncecting");
db.on('error', function() {
  console.log("Connection failures");

});
db.once('open', function() {
  console.log("Connected to mongoose"+mongoose.connection);

});

//CORS
var corsOptions = {
    origin: 'http://localhost',
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['x-access-token', 'Content-Type'],
    exposedHeaders: ['x-access-token']
};

// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use('/doctor/*', filter.authFilter);

app.post('/signup', jsonParser, auth.signup);
app.post('/authenticate', jsonParser, auth.authenticate);

app.get('/', routes.index);
app.post('/doctor/tentant', routes.tentant);
app.get('/doctor/getPatient/:patientid', user.getPatient);
app.post('/doctor/savePatient', user.savePatient);
app.post('/doctor/updatePatient', user.updatePatient);
app.post('/doctor/searchPatient', user.searchPatient);
app.post('/doctor/getPatientPhotos/photos', user.getPatientPhotos);
app.post('/doctor/getPatientInfo', user.getPatientInfo);
app.get('/doctor/getDiagnosisInformation/:patientid', user.getDiagnosisInformation);
app.post('/doctor/saveDiagnosisInformation', user.saveDiagnosisInformation);
app.get('/doctor/getChiefComplaintDetails/:patientid', user.getChiefComplaintDetails);
app.post('/doctor/saveChiefComplaint', user.saveChiefComplaint);
app.get('/doctor/getTreatmentSummary/:patientid', user.getTreatmentSummary);
app.post('/doctor/savetreatmentPlan', user.savetreatmentPlan);
app.get('/doctor/comment/:patientid/:commentid', user.getComments);
app.post('/doctor/comment', user.postComments);
app.post('/doctor/updateComment', user.updateComments);
app.post('/doctor/saveDiagnosisMaster', user.saveDiagnosisMaster);
app.post('/doctor/newDiagnosis/', user.newDiagnosis);
app.post('/doctor/checkinPatient/', user.checkinPatient);
// NOTE: payment.savePatientCheckin was previously registered on the same route as user.checkinPatient.
// It has been moved to a dedicated route to avoid the second handler being silently ignored.
app.post('/doctor/savePatientCheckin/', payment.savePatientCheckin);


app.post('/doctor/updatePaymentPlanToPatientCheckin/', payment.updatePaymentPlanToPatientCheckin);
app.post('/doctor/updatePatientCheckin', payment.updatePatientCheckin);
app.get('/doctor/getPatientActveCheckinToday/:patientId', payment.getPatientActveCheckinToday);
app.get('/doctor/getOldPendingCheckInDetails/', payment.getOldPendingCheckInDetails);

app.get('/doctor/getCurrentDiagnosis/:patientid/', user.getCurrentDiagnosis);
app.post('/doctor/savetreatmentPlanMaster', user.savetreatmentPlanMaster);
app.get('/doctor/getTreatmentPlanMaster/:patientid/', user.getTreatmentPlanMaster);
app.get('/doctor/getTreatmentSummaryMaster/:patientid/', user.getTreatmentSummaryMaster);
app.get('/doctor/getCurrentTreatmentSummary/:patientid/', user.getCurrentTreatmentSummary);

app.get('/doctor/getTodayCheckInDetails', payment.getTodayCheckInDetails);
app.post('/doctor/savePaymentEstimate', payment.savePaymentEstimate);
app.post('/doctor/savePayment', payment.savePayment);
app.post('/doctor/saveMiscPayment', payment.saveMiscPayment);
app.post('/doctor/getPaymentEstimates', payment.getPaymentEstimates);
app.post('/doctor/getPaymentMaster', payment.getPaymentMaster);
app.post('/doctor/savePaymentAdjustment', payment.savePaymentAdjustment);
app.get('/doctor/treatmenttypes', payment.getTreatmentTypes);
app.get('/doctor/getNetPendingAmountTreatmentReport', payment.getNetPendingAmountTreatmentReport);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
