/*
 * Patients Business Logic
 */
var bunyan = require('../config/bunyan_log');
var http = require('http');
var log = bunyan.log;
var mongoose = require('mongoose');
var util = require('util');
var merge = require('deepmerge'),
    jwt = require('jwt-simple'),
    error = require('./../error');

const SECRET = 'r2H#3jgfg$gU';

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

/* PROCESS METHODS */
var processURL = function (url) {
    var options = {};
    var urlArray = url.split("/");
    var hostNameWithPort = urlArray[2];
    var hostNameWithPortArr = hostNameWithPort.split(":");
    var hostName;
    var port;
    var relativeURL = "";

    if (hostNameWithPortArr.length > 0) {
        hostName = hostNameWithPortArr[0];
        port = hostNameWithPortArr[1];
    } else {
        hostName = hostNameWithPort;
    }

    for (var i = 3; i < urlArray.length; i++) {
        relativeURL += "/" + urlArray[i];
    }

    options["host"] = hostName;
    options["port"] = port;
    options["path"] = relativeURL;

    return options;
};

var isFieldExists = function (json, field) {
    var empty = new Boolean();
    empty = false;
    if (json[field]) {
        empty = true;
    }
    return empty;
};

var createSearchQuery = function (jsonData) {
    var query = {};
    if (isFieldExists(jsonData, "patientid")) {
        query['patientid'] = jsonData.patientid.replace(/"/g, "");
    }

    // ADDED REGEX CODE TO MATCH THE FIRSTNAME IN REGEX WAY
    if (isFieldExists(jsonData, "firstname")) {
        var re = new RegExp(jsonData.firstname, 'i');
        query['firstname'] = {
            $regex: re
        };
    }

    if (isFieldExists(jsonData, "phone")) {
        query['phone'] = jsonData.phone.replace(/'/g, "");
    }

    return query;
};

/* RESTFUL CALLBACK EVENTS */
exports.getPatient = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING PATIENT DETAILS : %s", patientid);
    log.debug("GETTING PATIENT DETAILS : %s", patientid);

    try {
        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientDetails = await patient.findOne({ "patientid": patientid });
        log.debug("Got Patient details %s", JSON.stringify(patientDetails));
        res.send(JSON.stringify(patientDetails));
    } catch (err) {
        log.error("getPatient Error while getting patient details for patient with id %s", patientid);
        log.error(err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getTreatmentPlanMaster = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);

    try {
        var treatmentPlanMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlanMaster');
        var treatmentPlanMaster = await treatmentPlanMasterModel.findOne({ "patientId": patientid }).sort({ "_id": -1 });
        var responsedata = {};
        if (treatmentPlanMaster != null) {
            responsedata = treatmentPlanMaster;
        }
        log.debug("Result of Treatment plan Information for the patient %s is %s", patientid, JSON.stringify(responsedata));
        res.send(JSON.stringify(responsedata));
    } catch (err) {
        log.error("Get treatmentPlanMaster by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getCurrentDiagnosis = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);

    try {
        var diagnosisMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosisMaster');
        var diagnosisMaster = await diagnosisMasterModel.findOne({ "patientId": patientid }).sort({ "_id": -1 });
        var responsedata = {};
        if (diagnosisMaster != null) {
            responsedata = diagnosisMaster.currentDiagnosis;
        }
        log.debug("Result of Diagnosis Information for the patient %s is %s", patientid, JSON.stringify(responsedata));
        res.send(JSON.stringify(responsedata).replace(/pos/g, "\+").replace(/neg/g, "-"));
    } catch (err) {
        log.error("Get diagnosisInformation by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getTreatmentSummaryMaster = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);

    try {
        var diagnosisMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosisMaster');
        var treatmentPlanMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlanMaster');

        var [diagnosisMaster, treatmentPlanMaster] = await Promise.all([
            diagnosisMasterModel.findOne({ "patientId": patientid }).sort({ "_id": -1 }),
            treatmentPlanMasterModel.findOne({ "patientId": patientid }).sort({ "_id": 1 })
        ]);

        var diagonsisSummaryResponse = getDiagonsisSummaryResponse(diagnosisMaster);
        var treatmentPlanSummaryResponse = getTreatmentPlanSummaryResponse(treatmentPlanMaster);

        var summaryResponse = {};
        summaryResponse["diagonsisSummaryResponse"] = diagonsisSummaryResponse;
        summaryResponse["treatmentPlanSummaryResponse"] = treatmentPlanSummaryResponse;
        summaryResponse["treatmentPlanMaster"] = treatmentPlanMaster;
        res.send(JSON.stringify(summaryResponse));
    } catch (err) {
        log.error("getTreatmentSummaryMaster by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getCurrentTreatmentSummary = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;

    log.info("getCurrentTreatmentSummary  " + "GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);

    try {
        var diagnosisMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosisMaster');
        var treatmentPlanMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlanMaster');

        var [diagnosisMaster, treatmentPlanMaster] = await Promise.all([
            diagnosisMasterModel.findOne({ "patientId": patientid }).sort({ "_id": -1 }),
            treatmentPlanMasterModel.findOne({ "patientId": patientid }).sort({ "_id": 1 })
        ]);

        var diagonsisSummaryResponse = {};
        if (diagnosisMaster != null) {
            diagonsisSummaryResponse = diagnosisMaster.currentDiagnosis;
        }

        var treatmentPlanSummaryResponse = {};
        if (treatmentPlanMaster != null) {
            treatmentPlanSummaryResponse = treatmentPlanMaster.currentTreatmentPlan;
        }

        var summaryResponse = {};
        summaryResponse["diagonsisSummaryResponse"] = diagonsisSummaryResponse;
        summaryResponse["treatmentPlanSummaryResponse"] = treatmentPlanSummaryResponse;
        summaryResponse["treatmentPlanMaster"] = treatmentPlanMaster;
        res.send(JSON.stringify(summaryResponse).replace(/pos/g, "\+").replace(/neg/g, "-"));
    } catch (err) {
        log.error("getCurrentTreatmentSummary by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

function getTreatmentPlanSummaryResponse(treatmentPlanMaster) {
    var treatmentPlanSummaryResponse = {};
    if (treatmentPlanMaster != null) {
        for (var i = 0; i <= treatmentPlanMaster.treatmentPlanDetails.length - 1; i++) {
            var treatmentPlan1 = treatmentPlanMaster.treatmentPlanDetails[i].treatmentPlanData;
            var treatmentPlan = createTreatplanSummmary(treatmentPlan1);

            for (var k in treatmentPlan) {
                if (treatmentPlanSummaryResponse.hasOwnProperty(k) && (typeof treatmentPlan[k] === "object")) {
                    treatmentPlanSummaryResponse[k] = merge(treatmentPlanSummaryResponse[k], treatmentPlan[k]);
                } else {
                    treatmentPlanSummaryResponse[k] = treatmentPlan[k];
                }
            }
        };
    }
    return treatmentPlanSummaryResponse;
};

function createTreatplanSummmary(treatmentPlan) {
    for (var k in treatmentPlan) {
        var treatmentPlanSubset = treatmentPlan[k];
        for (var j in treatmentPlanSubset) {
            var treatmentTeethArry = treatmentPlanSubset[j];
            if (Object.prototype.toString.call(treatmentTeethArry) === '[object Array]') {
                treatmentPlanSubset[j] = toObject(treatmentTeethArry);
            } else {
                treatmentPlanSubset[j] = treatmentTeethArry;
            }
        }
    }
    return treatmentPlan;
};

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) {
        var tempValue = arr[i];
        rv[tempValue] = false;
    }
    return rv;
};

function getDiagonsisSummaryResponse(diagnosisMaster) {
    var diagonsisSummaryResponse = {};
    if (diagnosisMaster != null) {
        for (var i = diagnosisMaster.diagnosisDetails.length - 1; i >= 0; i--) {
            var diagonsis = diagnosisMaster.diagnosisDetails[i].diagnosisData;
            var dateOfDiagnosis = diagnosisMaster.diagnosisDetails[i].dateOfDiagnosis;
            for (var k in diagonsis) {
                if (diagonsisSummaryResponse.hasOwnProperty(k)) {
                    if (k == "notes") {

                    } else {
                        diagonsisSummaryResponse[k] = merge(diagonsisSummaryResponse[k], diagonsis[k]);
                    }
                } else {
                    diagonsisSummaryResponse[k] = diagonsis[k];
                }
            }
        };
    }
    return diagonsisSummaryResponse;
};

exports.getDiagnosisInformation = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;

    log.info("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING DIAGNOSIS INFORMATION FOR PATIENT : %s", patientid);

    try {
        var diagonosisInformationModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosis');
        var diagnosisInformation = await diagonosisInformationModel.findOne({ "patientId": patientid }).sort({ "_id": -1 });
        var responsedata = {};
        if (diagnosisInformation != null) {
            if (diagnosisInformation["diagnosisData"] != null)
                responsedata = diagnosisInformation.diagnosisData;
        }
        log.debug("Result of Diagnosis Information for the patient %s is %s", patientid, JSON.stringify(responsedata));
        res.send(JSON.stringify(responsedata));
    } catch (err) {
        log.error("Get diagnosisInformation by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getChiefComplaintDetails = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING CHIEF COMPLIANT INFORMATION FOR PATIENT : %s", patientid);
    log.debug("GETTING CHIEF COMPLIANT INFORMATION FOR PATIENT : %s", patientid);

    try {
        var chiefComplaint = mongoose.mtModel(decoded.clinicName + '.' + 'ChiefComplaintInformation');
        var chiefComplaintInformation = await chiefComplaint.findOne({ "patientId": patientid }).sort({ "_id": -1 });
        if (chiefComplaintInformation === null) {
            chiefComplaintInformation = {};
        }
        log.debug("Patient ID %s, Got the chiefComplaint %s", patientid, JSON.stringify(chiefComplaintInformation));
        res.send(JSON.stringify(chiefComplaintInformation));
    } catch (err) {
        log.error("Get chiefComplaintInformation by id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getTreatmentSummary = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientid = req.params.patientid;
    log.info("GETTING TREATMENT SUMMARY FOR PATIENT : %s", patientid);
    log.debug("GETTING TREATMENT SUMMARY FOR PATIENT : %s", patientid);

    try {
        var treatmentPlanModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlan');
        var treatmentInformation = await treatmentPlanModel.findOne({ "patientId": patientid }).sort({ "_id": -1 });
        var responsedata = {};
        if (treatmentInformation != null) {
            if (treatmentInformation["treatmentPlanData"] != null) {
                responsedata = treatmentInformation.treatmentPlanData;
            }
        }
        log.debug("TreatmentInformation Result %s", JSON.stringify(responsedata));
        res.send(JSON.stringify(responsedata));
    } catch (err) {
        log.error("Get treatmentInformation for patient id %s :: Error While getting the data %s", patientid, err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.updatePatient = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("update PATIENT : %s", req.body.mydata);
    log.debug("update PATIENT : %s", req.body.mydata);

    try {
        var Patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        log.debug("update PATIENT DETAILS WITH PATIENT ID : %s", JSON.stringify(jsonData));
        var updated = await Patient.findOneAndUpdate(
            { "patientid": jsonData.patientid },
            jsonData,
            { upsert: true, new: true }
        );
        log.debug("update patient result: " + updated);
        res.send(JSON.stringify(jsonData));
    } catch (err) {
        log.error(" update patient Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.checkinPatient = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    var patientId = jsonData.patientid;
    console.log("checkinPatient" + patientId);

    try {
        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientInfo = await patient.findOne({ "patientid": patientId });
        if (!patientInfo) {
            log.error("get patient info Error Occured while Getting patient information");
            return res.status(404).send({ "error": "Patient not found" });
        }

        var patientCheckin = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var patientCheckinObj = {};
        patientCheckinObj["patientId"] = patientInfo.patientid;
        patientCheckinObj["name"] = patientInfo.firstname;
        patientCheckinObj["checkInStatus"] = "Waiting";
        patientCheckinObj["checkinDate"] = new Date();
        patientCheckinObj["paymentComplete"] = false;
        console.log("data from newly created checkin object" + patientCheckinObj);

        var patientCheckinSaveObject = new patientCheckin(patientCheckinObj);
        console.log("\n\n\n\n data from newly created checkin object" + JSON.stringify(patientCheckinSaveObject) + "\n\n\n\n");

        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMasterData = await paymentMasterModel.findOne({ "patientId": patientId });
        console.log("Found the payment Master Datas" + paymentMasterData);

        if (paymentMasterData == null || isEmptyObject(paymentMasterData)) {
            paymentMasterData = new paymentMasterModel();
            paymentMasterData["patientId"] = patientInfo.patientid;
            paymentMasterData["firstname"] = patientInfo.firstname;
            paymentMasterData["lastname"] = patientInfo.lastname;
            log.debug(" savePaymentEstimate Creating New payment Master for the first time" + paymentMasterData);
        }

        paymentMasterData.lastCheckin = patientCheckinSaveObject;
        console.log(JSON.stringify(paymentMasterData));
        await paymentMasterData.save();
        console.log("Created the payment estimate" + paymentMasterData);
        res.send(JSON.stringify(paymentMasterData));
    } catch (err) {
        log.error("checkinPatient Error: " + err);
        console.log("checkinPatient Error: " + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};




exports.savePatient = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("SAVING PATIENT : %s", req.body.mydata);
    log.debug("SAVING PATIENT : %s", req.body.mydata);

    try {
        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var data = await patient.find().sort({ "patientid": -1 }).limit(1);
        var patientid = 0;
        log.debug("Getting the maximum patient id stored in mongodb " + data);
        if (data.length != 0) {
            if (data[0].patientid != undefined) {
                log.debug("Patient >> data is not null >> So get the patient id" + data[0].patientid);
                patientid = data[0].patientid;
            }
        }

        log.debug("Logging patient id " + patientid);
        if (jsonData['patientid'] == null) {
            jsonData['patientid'] = patientid + 1;
        }

        var newPatient = new patient(jsonData);
        log.debug("SAVING PATIENT DETAILS WITH PATIENT ID : %s", JSON.stringify(jsonData));

        await newPatient.save();

        var patientString = newPatient.toObject();
        res.send(JSON.stringify(patientString));
    } catch (err) {
        log.error(" save patient Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getPatientPhotos = function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientPhotoURL = JSON.parse(req.body.mydata);
    log.info("GET PATIENT PHOTOS IN URL : %s", JSON.stringify(patientPhotoURL));
    log.debug("GET PATIENT PHOTOS IN URL : %s", JSON.stringify(patientPhotoURL));

    var options = processURL(patientPhotoURL.path);

    http.get(options, function (resData) {
        log.debug("Got response Code : %s", resData.statusCode);
        resData.on("data", function (htmlContent) {
            log.debug("Got HTML Code %s", htmlContent);
            res.send(htmlContent);
        });
    }).on('error', function (e) {
        log.error("Got error while fetching HTML data : " + e.message);
    });
};


exports.newDiagnosis = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    var patientId = jsonData.patientId;
    var query = { "patientId": patientId };

    var diagnosisModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosis');
    var newDiagnosisInformation = new diagnosisModel({});

    var treatmentPlanMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlanMaster');
    var diagnosisMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosisMaster');
    var treatmentPlanModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlan');
    var newTreatmentPlan = new treatmentPlanModel({});

    // Fire-and-forget parallel saves
    diagnosisMasterModel.findOne(query).then(async function (diagnosisPlanMasterData) {
        if (diagnosisPlanMasterData == null || isEmptyObject(diagnosisPlanMasterData)) {
            diagnosisPlanMasterData = new diagnosisMasterModel();
            diagnosisPlanMasterData["patientId"] = jsonData.patientId;
            log.debug(" save diagnosisPlanMasterData Creating New diagnosis Master for the first time" + diagnosisPlanMasterData);
        }
        diagnosisPlanMasterData.currentDiagnosis = newDiagnosisInformation;
        diagnosisPlanMasterData.diagnosisDetails.push(newDiagnosisInformation);
        await diagnosisPlanMasterData.save();
    }).catch(function (err) {
        log.error(" save diagnosis master Error While inserting the data" + err);
    });

    treatmentPlanMasterModel.findOne(query).then(async function (treatmentPlanMasterData) {
        if (treatmentPlanMasterData == null || isEmptyObject(treatmentPlanMasterData)) {
            treatmentPlanMasterData = new treatmentPlanMasterModel();
            treatmentPlanMasterData["patientId"] = jsonData.patientId;
        }
        treatmentPlanMasterData["currentTreatmentPlan"] = newTreatmentPlan;
        treatmentPlanMasterData.treatmentPlanDetails.push(newTreatmentPlan);
        await treatmentPlanMasterData.save();
    }).catch(function (err) {
        log.error(" save treatment plan Error While inserting the data" + err);
    });

    res.send("done");
};

exports.saveChiefComplaint = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("SAVE CHIEF COMPLAINT : %s", req.body.mydata);
    log.debug("SAVE CHIEF COMPLAINT : %s", req.body.mydata);

    try {
        var ChiefComplaint = mongoose.mtModel(decoded.clinicName + '.' + 'ChiefComplaintInformation');
        log.debug("saveChiefComplaint inserting the data" + JSON.stringify(jsonData));
        // CHANGED THE SAVE QUERY TO UPDATE QUERY - THIS WILL USE UPSERT = TRUE WHICH WILL PERFORM INSERT IF THE DOCUMENT IS NOT FOUND
        var result = await ChiefComplaint.findOneAndUpdate(
            { "patientId": jsonData.patientId },
            jsonData,
            { upsert: true, new: true }
        );
        log.debug("Number of documents updated :- " + result);
        res.send(JSON.stringify(result));
    } catch (err) {
        log.error("save chief complaint Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.saveDiagnosisInformation = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    log.info("SAVE Diagnosis Information");
    log.debug("Printing the data at node entry for diagnosis summary" + req.body.mydata);
    log.debug("Replace all + and - characters");
    var bodyContent = req.body.mydata.replace(/\+/g, "pos").replace(/-/g, "neg");
    log.debug(bodyContent);
    var jsonData = JSON.parse(bodyContent);

    try {
        var diagnosisModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosis');
        var newDiagnosisInformation = new diagnosisModel(jsonData);
        await newDiagnosisInformation.save();

        log.debug("SAVE diagnosis Plan to Follow-up Collection %s", req.body.mydata);
        jsonData.patientid = jsonData.patientId; // THIS LINE IS NOT REQUIRED IF THE SCHEMA IS STANDARD. SHOULD MAKE THE SCHEMA STANDARD.
        jsonData.commentid = 0; // NOT SURE WHY commentid SHOULD BE 0
        var Comments = mongoose.mtModel(decoded.clinicName + '.' + 'Comments');
        var newComments = new Comments(jsonData);
        newComments.save().catch(function (err) {
            log.error(" post comments Error While inserting the data" + err);
        });

        res.send(JSON.stringify(newDiagnosisInformation));
    } catch (err) {
        log.error(" save diagnosis informtion Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.savetreatmentPlan = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("SAVE Treatment Plan");
    log.debug("SAVE Treatment Plan %s", req.body.mydata);

    try {
        var treatmentPlanModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlan');
        var newTreatmentPlan = new treatmentPlanModel(jsonData);
        await newTreatmentPlan.save();

        log.debug("SAVE Treatment Plan to Follow-up Collection %s", req.body.mydata);
        jsonData.patientid = jsonData.patientId; // THIS LINE IS NOT REQUIRED IF THE SCHEMA IS STANDARD. SHOULD MAKE THE SCHEMA STANDARD.
        jsonData.commentid = 0; // NOT SURE WHY commentid SHOULD BE 0
        var Comments = mongoose.mtModel(decoded.clinicName + '.' + 'Comments');
        var newComments = new Comments(jsonData);
        newComments.save().catch(function (err) {
            log.error(" post comments Error While inserting the data" + err);
        });

        res.send(JSON.stringify(newTreatmentPlan));
    } catch (err) {
        log.error(" save treatment plan Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

// Duplicate exports.newDiagnosis removed; the full implementation above is used.

exports.saveDiagnosisMaster = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var bodyContent = req.body.mydata.replace(/\+/g, "pos").replace(/-/g, "neg");
    log.debug(bodyContent);
    var jsonData = JSON.parse(bodyContent);

    try {
        var diagnosisModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosis');
        var newDiagnosisInformation = new diagnosisModel(jsonData);
        var diagnosisMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'diagnosisMaster');
        var patientId = jsonData.patientId;
        var query = { "patientId": patientId };

        var diagnosisPlanMasterData = await diagnosisMasterModel.findOne(query);
        if (diagnosisPlanMasterData == null || isEmptyObject(diagnosisPlanMasterData)) {
            diagnosisPlanMasterData = new diagnosisMasterModel();
            diagnosisPlanMasterData["patientId"] = jsonData.patientId;
            log.debug(" save diagnosisPlanMasterData Creating New diagnosis Master for the first time" + diagnosisPlanMasterData);
        }
        diagnosisPlanMasterData["currentDiagnosis"] = newDiagnosisInformation;
        diagnosisPlanMasterData.diagnosisDetails.push(newDiagnosisInformation);
        await diagnosisPlanMasterData.save();
        res.send(JSON.stringify(diagnosisPlanMasterData));
    } catch (err) {
        log.error(" save treatment plan Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.savetreatmentPlanMaster = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("SAVE Treatment Plan");
    log.debug("SAVE Treatment Plan %s", req.body.mydata);

    try {
        var treatmentPlanModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlan');
        var newTreatmentPlan = new treatmentPlanModel(jsonData);
        var patientId = jsonData.patientId;
        var treatmentPlanMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'treatmentPlanMaster');
        var query = { "patientId": patientId };

        var treatmentPlanMasterData = await treatmentPlanMasterModel.findOne(query);
        if (treatmentPlanMasterData == null || isEmptyObject(treatmentPlanMasterData)) {
            treatmentPlanMasterData = new treatmentPlanMasterModel();
            treatmentPlanMasterData["patientId"] = jsonData.patientId;
        }
        treatmentPlanMasterData["currentTreatmentPlan"] = newTreatmentPlan;
        treatmentPlanMasterData.treatmentPlanDetails.push(newTreatmentPlan);
        await treatmentPlanMasterData.save();
        res.send(JSON.stringify(treatmentPlanMasterData));
    } catch (err) {
        log.error(" save treatment plan Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.searchPatient = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("Search Patient");
    var query = createSearchQuery(jsonData);
    log.debug("Query to Search for patient %s", JSON.stringify(query));

    try {
        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientSearch = await patient.find(query, 'firstname patientid email phone');
        log.debug("Result Set := %s", JSON.stringify(patientSearch));
        res.send(JSON.stringify(patientSearch));
    } catch (err) {
        log.error(" search patient Error Occured while searching");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getPatientInfo = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var query = JSON.parse(req.body.mydata);
    log.info("Get Patient Information");
    log.debug("Query to get Patient Information %s ", JSON.stringify(query));

    try {
        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientInfo = await patient.findOne(query);
        log.debug("Patient information %s", JSON.stringify(patientInfo));
        res.send(JSON.stringify(patientInfo));
    } catch (err) {
        log.error("get patient info Error Occured while Getting patient information");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getComments = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var patientID = req.params.patientid;
    var commentID = req.params.commentid;
    var query = {
        "patientid": patientID,
        "commentid": commentID
    };

    try {
        var comments = mongoose.mtModel(decoded.clinicName + '.' + 'Comments');
        var result = await comments.find(query, 'patientid commentid comment children doctor date treatmentPlanData diagnosisData').sort({ date: -1 });
        log.debug("Result Set := %s", JSON.stringify(result));
        res.send(JSON.stringify(result));
    } catch (err) {
        log.error(" get comments Error Occured while finding comments");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.updateComments = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);

    try {
        var comments = mongoose.mtModel(decoded.clinicName + '.' + 'Comments');
        await comments.findByIdAndUpdate(jsonData._id, { $set: { comment: jsonData.comment } });
        res.send("Updated");
    } catch (err) {
        log.error(" update comments Error While updating the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.postComments = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);

    try {
        var comments = mongoose.mtModel(decoded.clinicName + '.' + 'Comments');
        var newComments = new comments(jsonData);
        await newComments.save();
        res.send(JSON.stringify(newComments));
    } catch (err) {
        log.error(" post comments Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};
