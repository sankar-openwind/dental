// app/routes.js
var mongoose = require('mongoose'), Schema = mongoose.Schema;
var webshot = require('webshot');
var fileSystem = require('fs');
var url = require("url");

module.exports = function(app, passport) {

// define model =================
var Patient = mongoose.model('Patient', {
firstname : String,
lastname : String,
address : String,
phone : Number,
email : String,
dateOfBirth : String,
gender : String,
patientid : Number,
maritalStatus : String
});

var  DiagonosisInformation = mongoose.model('DiagnosisInformation', {
patientId : Number,
dateOfDiagnosis : { type: Date,  default: Date.now },
diagnosisData : mongoose.Schema.Types.Mixed
});

var treatmentPlan = mongoose.model('TreatmentPlan', {
patientId : Number,
dateOfTreatmentPlan : { type: Date,  default: Date.now }, treatmentPlanData : mongoose.Schema.Types.Mixed
});

// =====================================
// HOME PAGE (with login links) ========
// =====================================
app.get('/', function(req, res) {
	res.render('base.ejs');
	// load the index.ejs file
});

var payment  = new Schema({
		patientId : Number,
		paymentEstimateId : String,
		name:String,
		paymentDate :  { type: Date, default: Date.now },
		paidAmount : Number,
});


var paymentMaster = new Schema({
		patientId : Number,
		firstname : { type: String, default: "EMPTY" },
		lastname : { type: String, default:  "EMPTY"  },
		totalEstimateAmount :  { type: Number, default: 0 },
		totalPaidAmount :   { type: Number, default: 0 },
		netPendingAmount :  { type: Number, default: 0 },
		totalAdjustedAmount :  { type: Number, default: 0 },
		payments  : [payment],
		paymentEstimates  : [paymentEstimate]
		 
});

var paymentEstimate = new Schema({
		patientId : Number,
		paymentEstimateName : String,
		estimateelemnt:[],
		paymentEstimateDate :  { type: Date, default: Date.now },
		estimateAmount : Number,
		
		 
});
mongoose.model('paymentEstimate', paymentEstimate);
mongoose.model('payment', payment);
mongoose.model('paymentMaster', paymentMaster);


// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	res.send('Testing apii');
});

/*app.get('/savePatient1', function(req, res) {
 console.log("POST: ");
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET, POST,OPTIONS");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 //res.writeHead(200, {'Content-Type': 'text/plain'});
 //user = req.body.username;
 //passwd = req.body.password;
 //emailid = req.body.email;
 console.log(req.body);
 console.log(req.body.mydata);
 var jsonData = JSON.parse(req.body.mydata);
 console.log(jsonData);
 res.send(jsonData);
 });*/

app.get('/getPatient/:patientid', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var patientid = req.params.patientid;
	Patient.findOne({
		"patientid" : patientid
	}, function(err, patientDetails) {
		if (err) {
			console.log("Get patient by id :: Error While getting the data" + err)
		}
       
		DiagonosisInformation.find({
			patientId : patientid
		}).sort({
			dateOfDiagnosis : 'desc'
		}).limit(1).exec(function(err, doc) {
			if (err) {
				console.log(" Error While getting the data" + err)
			} else {
				var patientInfo = {
					"patientDetails" : patientDetails,
					"patientDiagnosis" : doc[0]
				};
				console.log(JSON.stringify(patientInfo).replace(/pos/g,"\+").replace(/neg/g,"-"));
				res.send(JSON.stringify(patientInfo).replace(/pos/g,"\+").replace(/neg/g,"-"));
			}
		});
	});
});

app.get('/getDiagnosisInformation/:patientid', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var patientid = req.params.patientid;
	DiagonosisInformation.findOne({
		"patientId" : patientid
	}, function(err, diagnosisInformation) {
		if (err) {
			console.log("Get diagnosisInformation by id :: Error While getting the data" + err)
		}
		res.send(JSON.stringify(diagnosisInformation.diagnosisData));
	});
});

app.post('/savePatient', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mydata);

	Patient.find().sort({
		"patientid" : -1
	}).limit(1).exec(function(err, data) {
		var patientid = 0;
		console.log("logging the data form the patient id search" + data);
		if (data.length != 0) {
			if (data[0].patientid != undefined) {
				console.log("Patient >> data is not null >> So get the patient id" + data[0].patientid);
				patientid = data[0].patientid;
			}

		}

		console.log("Logging patient id " + patientid);

		jsonData['patientid'] = patientid + 1;
		var newPatient = new Patient(jsonData);

		newPatient.save(function(err) {
			if (err) {
				console.log("Error While inserting the data" + err)
			}
		});

		var patientString = newPatient.toObject();
		console.log(" New Patient Details " + JSON.stringify(patientString));
		res.send(JSON.stringify(patientString));

	})
});

app.post('/saveDiagnosisInformation', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mydata);
	var newDiagnosisInformation = new DiagonosisInformation(jsonData);
	newDiagnosisInformation.save(function(err) {
		if (err) {
			console.log("Error While inserting the data" + err)
		}
	});
	res.send(JSON.stringify(newDiagnosisInformation));
});

app.get('/exportToPDF/:patientid', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var patientId = req.params.patientid;

	var htmlLocation = "http://localhost:81/#/viewPatient/" + patientId;
	var options = {
		paperSize : {
			format : 'A4',
			orientation : 'portrait',
			border : '1cm'
		}
	}
	console.log(htmlLocation);
	webshot(htmlLocation, 'patient-pdf/patientId-' + patientId + '.pdf', options, function(err) {
		// screenshot now saved to hello_world.png
		if (err)
			return console.log(err);
		//Chaining the process.. once the pdf generation is completed, the streaming of file starts
		res.setHeader('Content-disposition', 'attachment; filename=report-' + patientId + '.pdf');
		res.setHeader("content-type", "application/pdf");

		var readStream = fileSystem.createReadStream('patient-pdf/patientId-' + patientId + '.pdf');
		readStream.pipe(res);
	});
});
///getDailyPaymentReportReport/:year/:month/:dayOfMonth/


app.get('/getDailyPaymentReportReportPDF/:year/:month/:dayOfMonth/', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 
	var year = req.params.year;
	var month =req.params.month;
	var day = req.params.dayOfMonth;
	console.log(year+month+day);
	var htmlLocation = 'http://localhost:81/#/getDailyPaymentReport/'+year+'/'+month+'/'+day+'/';
	var options = {
		paperSize : {
			format : 'A4',
			orientation : 'portrait',
			border : '1cm'
		},
		renderDelay: 3000
	}
	webshot(htmlLocation, 'payments/DailyPaymentReport '+day+'-'+month+'-'+year  +   '.pdf', options, function(err) {
		// screenshot now saved to hello_world.png
		if (err)
			return console.log(err);
		//Chaining the process.. once the pdf generation is completed, the streaming of file starts
		res.setHeader('Content-disposition', 'attachment; filename=DailyPaymentReport '+day+'-'+month+'-'+year  + '.pdf');
		res.setHeader("content-type", "application/pdf");

		var readStream = fileSystem.createReadStream('payments/DailyPaymentReport '+day+'-'+month+'-'+year  +  '.pdf');
		readStream.pipe(res);
	});
});


app.get('/getNetPendingAmountTreatmentReportPDF/:fromYear/:fromMonth/:fromDayOfMonth/:toYear/:toMonth/:toDayOfMonth', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var patientId = req.params.patientid;

	var fromYear = req.params.fromYear;
	var fromMonth =req.params.fromMonth;
	var fromDay = req.params.fromDayOfMonth;
	var toYear = req.params.toYear;
	var toMonth =req.params.toMonth;
	var toDay = req.params.toDayOfMonth;

	var htmlLocation = 'http://localhost:81/#/getNetPendingAmountReport/'+ fromYear + '/'+ fromMonth + '/'+ fromDay + '/' + toYear + '/' + toMonth + '/' + toDay;
	var options = {
		paperSize : {
			format : 'A4',
			orientation : 'portrait',
			border : '1cm'
		},
		renderDelay: 3000
	};
	webshot(htmlLocation, 'payments/pendingAmoutReport' +  '.pdf', options, function(err) {
		// screenshot now saved to hello_world.png
		if (err)
			return console.log(err);
		//Chaining the process.. once the pdf generation is completed, the streaming of file starts
		res.setHeader('Content-disposition', 'attachment; filename=pendingAmoutReport'  + '.pdf');
		res.setHeader("content-type", "application/pdf");

		var readStream = fileSystem.createReadStream('payments/pendingAmoutReport' + '.pdf');
		readStream.pipe(res);
	});
});

app.get('/exportPatientDetailsToPDF/:patientid', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var patientId = req.params.patientid;

	var htmlLocation = "http://localhost:81/#/patientDetails/" + patientId;
	var options = {
		paperSize : {
			format : 'A4',
			orientation : 'portrait',
			border : '1cm'
		}
	}
	webshot(htmlLocation, 'patient-pdf/patientId-' + patientId + '.pdf', options, function(err) {
		// screenshot now saved to hello_world.png
		if (err)
			return console.log(err);
		//Chaining the process.. once the pdf generation is completed, the streaming of file starts
		res.setHeader('Content-disposition', 'attachment; filename=Patient-' + patientId + '.pdf');
		res.setHeader("content-type", "application/pdf");

		var readStream = fileSystem.createReadStream('patient-pdf/patientId-' + patientId + '.pdf');
		readStream.pipe(res);
	});
});



app.post('/savetreatmentPlan', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mydata);
	var newTreatmentPlan = new treatmentPlan(jsonData);
	newTreatmentPlan.save(function(err) {
		if (err) {
			console.log("Error While inserting the data" + err)
		}
	});
	res.send(JSON.stringify(newTreatmentPlan));
});

app.post('/searchPatient', function(req, res) {

	var jsonData = JSON.parse(req.body.mydata);

	console.log(jsonData);

	var query = createSearchQuery(jsonData);

	console.log(query);

	Patient.find(query, 'firstname patientid email phone ', function(err, patientSearch) {
		if (err) {
			console.log("Error Occured while searching");
		} else {
			console.log(patientSearch);
			res.send(JSON.stringify(patientSearch));
		}
	});
});



app.get('/getNetPendingAmountTreatmentReport', function(req, res){
	var paymentMasterModel = mongoose.model('paymentMaster');
	var patient = mongoose.model('Patient');
	paymentMasterModel.find({ netPendingAmount: { $gt: 0 }}, 'netPendingAmount patientId firstname lastname').sort({netPendingAmount: -1}).exec(function (err, docs) {
		console.log(docs);
		res.send(docs);
	});
	
});

app.get('/getDailyPaymentReportReport/:year/:month/:dayOfMonth/', function(req, res){
	var paymentMasterModel = mongoose.model('paymentMaster');
	var patient = mongoose.model('Patient');
	var reportDayOfMonth =parseInt(req.params.dayOfMonth);
	var reportMonth =parseInt(req.params.month);
	var reportYear =parseInt(req.params.year);
	 console.log(reportDayOfMonth);
	//paymentMasterModel.find( { payments : { $elemMatch: {  paymentDate : { $gte: start,$lt: end } } } })

paymentMasterModel.aggregate([ 
{ $unwind : "$payments" },
  {$project: {
        patientId: "$patientId",
		totalAdjustedAmount: "$totalAdjustedAmount",
		netPendingAmount: "$netPendingAmount",
		totalPaidAmount: "$totalPaidAmount",
		totalEstimateAmount: "$totalEstimateAmount",
        paymentName:"$payments.name",
        firstname:"$firstname",
		paidAmount : "$payments.paidAmount",
		paymentDate :"$payments.paymentDate",
		year: { $year: "$payments.paymentDate"},
        month: { $month: "$payments.paymentDate" },
        dayOfMonth: { $dayOfMonth: "$payments.paymentDate"},
    }},
	  {
       $match:
         {
		$and: [ {
           year: { $gte: reportYear ,$lte: reportYear},
           month: { $gte: reportMonth , $lte: reportMonth},
           dayOfMonth: { $gte:reportDayOfMonth, $lte:reportDayOfMonth}}
		   ]
         }
     }
 ]).exec(function (err, docs) {
		console.log("Error"+err);
		console.log(docs);
		res.send(docs);
	});
	
});

app.post('/getPatientInfo', function(req, res) {

	var query = JSON.parse(req.body.mydata);

	console.log(query);

	Patient.findOne(query, function(err, patientInfo) {
		if (err) {
			console.log("Error Occured while searching");
		} else {
			console.log(patientInfo);
			res.send(JSON.stringify(patientInfo));
		}
	});
});

};

var isFieldExists = function(json, field) {
	var empty = new Boolean();
	empty = false;
	if (json[field]) {
		empty = true;
	}
	return empty;
}
var createSearchQuery = function(jsonData) {
	var query = {}
	if (isFieldExists(jsonData, "patientid")) {
		query['patientid'] = jsonData.patientid.replace(/"/g, "");
	}

	if (isFieldExists(jsonData, "firstname")) {
		query['firstname'] = jsonData.firstname;
	}

	if (isFieldExists(jsonData, "phone")) {
		query['phone'] = jsonData.phone.replace(/'/g, "");
	}

	return query;
}
