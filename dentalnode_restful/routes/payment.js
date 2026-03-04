/*
 * Patients Business Logic
 */
var bunyan = require('../config/bunyan_log'),
    http = require('http'),
    log = bunyan.log,
    mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    error = require('./../error');

const SECRET = 'r2H#3jgfg$gU';

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.getTodayCheckInDetails1 = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    var query = { "lastCheckin.checkinDate": { $gte: today, $lt: tomorrow } };

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMaster = await paymentMasterModel.find(query).select("lastCheckin").sort({ "lastCheckin.checkinDate": -1 });
        log.debug("Payment Master  Result Set := %s", JSON.stringify(paymentMaster));
        res.send(JSON.stringify(paymentMaster));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getTodayCheckInDetails = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    var query = { $or: [{ "lastCheckin.checkinDate": { $gte: today, $lt: tomorrow } }, { "lastCheckin.checkinDate": { $gte: today, $lt: tomorrow } }] };

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMaster = await paymentMasterModel.find(query).select("lastCheckin").sort({ "lastCheckin.checkinDate": -1 });
        log.debug("Payment Master  Result Set := %s", JSON.stringify(paymentMaster));
        res.send(JSON.stringify(paymentMaster));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getTodayCheckInDetails_old = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    var query = {
        checkinDate: {
            $gte: today,
            $lt: tomorrow
        }
    };

    try {
        var paymentCheckinModel = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var patientCheckin = await paymentCheckinModel.find(query).sort({ checkinDate: -1 });
        console.log(patientCheckin);
        var patientcheckinidarry = getCheckinIds(patientCheckin);
        res.send(JSON.stringify(patientCheckin));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

function getCheckinIds(patientCheckin) {
    console.log(patientCheckin);
    var patientcheckinidarry = [];
    for (b in patientCheckin) {
        patientcheckinidarry.push(patientCheckin[b]._id);
        console.log("\n\n\n" + patientCheckin[b]._id);
    }
    console.log(patientcheckinidarry);
    return patientcheckinidarry;
}

exports.getOldPendingCheckInDetails = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    var query = {
        "lastCheckin.checkinDate": { $lt: today },
        "lastCheckin.lastPaidAmount": { $exists: false }
    };

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMaster = await paymentMasterModel.find(query).select("lastCheckin").sort({ "lastCheckin.checkinDate": -1 });
        log.debug("Payment Master  Result Set := %s", JSON.stringify(paymentMaster));
        res.send(JSON.stringify(paymentMaster));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};


exports.getOldPendingCheckInDetails_old = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    var query = {
        lastPaidAmount: { $exists: false },
        checkinDate: {
            $lt: today
        }
    };

    try {
        var paymentCheckinModel = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var patientCheckin = await paymentCheckinModel.find(query).sort({ checkinDate: -1 });
        res.send(JSON.stringify(patientCheckin));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};


exports.getPatientActveCheckinToday = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    console.log(req.params.patientId);
    var patientId = req.params.patientId;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);

    var query = {
        "patientId": patientId,
        "lastCheckin.checkinDate": {
            $gte: today,
            $lt: tomorrow
        },
        "lastCheckin.paymentComplete": false
    };

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMaster = await paymentMasterModel.findOne(query);
        console.log("Payment Master  Result Set := %s", JSON.stringify(paymentMaster));
        var responseData;
        if (paymentMaster && paymentMaster.lastCheckin) {
            responseData = paymentMaster.lastCheckin;
        }
        res.send(JSON.stringify(responseData));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.getPaymentMaster = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    var patientId = jsonData.patientId;
    log.debug("getPaymentMaster patientId" + patientId);
    var query = { "patientId": patientId };

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMaster = await paymentMasterModel.findOne(query);
        log.debug("Payment Master  Result Set := %s", JSON.stringify(paymentMaster));
        res.send(JSON.stringify(paymentMaster));
    } catch (err) {
        log.error("get payment master Error Occured while finding paymentMaster");
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.savePaymentEstimate = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.error("Test error  log");
    log.debug("SAVE savePaymentEstimate data %s", req.body.mydata);

    try {
        //Create payment estimate object
        var paymentEstimateModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentEstimate');
        var paymentEstimateObject = new paymentEstimateModel(jsonData);
        var patientId = jsonData.patientId;

        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientDetails = await patient.findOne({ "patientid": jsonData.patientId });
        if (!patientDetails) {
            log.error(" savePaymentEstimate Error while getting patient details for patient with id %s", patientId);
            return res.status(404).send({ "error": "Patient not found" });
        }
        var firstname = patientDetails.firstname;
        var lastname = patientDetails.lastname;

        var query = { "patientId": patientId };
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMasterData = await paymentMasterModel.findOne(query);

        if (paymentMasterData == null || isEmptyObject(paymentMasterData)) {
            paymentMasterData = new paymentMasterModel();
            paymentMasterData["patientId"] = jsonData.patientId;
            paymentMasterData["firstname"] = firstname;
            paymentMasterData["lastname"] = lastname;
            log.debug(" savePaymentEstimate Creating New payment Master for the first time" + paymentMasterData);
        }

        paymentMasterData.totalEstimateAmount = parseFloat(paymentMasterData.totalEstimateAmount) + parseFloat(jsonData.estimateAmount);
        paymentMasterData.netTreatmentPendingAmount = parseFloat(paymentMasterData.netTreatmentPendingAmount) + parseFloat(jsonData.estimateAmount);
        paymentMasterData.paymentEstimates.push(paymentEstimateObject);
        await paymentMasterData.save();
        res.send(JSON.stringify(paymentMasterData));
    } catch (err) {
        log.error("savePaymentEstimate Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.savePatientCheckin = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.error("Test error  log");
    log.debug("SAVE savePaymentEstimate data %s", req.body.mydata);

    try {
        var paymentEstimateModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentEstimate');
        var paymentEstimateObject = new paymentEstimateModel(jsonData);
        var patientId = jsonData.patientId;

        var patient = mongoose.mtModel(decoded.clinicName + '.' + 'Patient');
        var patientDetails = await patient.findOne({ "patientid": jsonData.patientId });
        if (!patientDetails) {
            log.error(" savePatientCheckin Error while getting patient details for patient with id %s", patientId);
            return res.status(404).send({ "error": "Patient not found" });
        }
        var firstname = patientDetails.firstname;
        var lastname = patientDetails.lastname;

        var patientCheckinModel = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var patientCheckinObj = {};
        patientCheckinObj["patientId"] = patientDetails.patientid;
        patientCheckinObj["name"] = patientDetails.firstname;
        patientCheckinObj["checkInStatus"] = "Waiting";

        var query = { "patientId": patientId };
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMasterData = await paymentMasterModel.findOne(query);

        if (paymentMasterData == null || isEmptyObject(paymentMasterData)) {
            paymentMasterData = new paymentMasterModel();
            paymentMasterData["patientId"] = jsonData.patientId;
            paymentMasterData["firstname"] = firstname;
            paymentMasterData["lastname"] = lastname;
            log.debug(" savePaymentEstimate Creating New payment Master for the first time" + paymentMasterData);
        }
        paymentMasterData.lastCheckin = patientCheckinObj;
        paymentMasterData.checkinHistory.push(patientCheckinObj);
        await paymentMasterData.save();
        res.send(JSON.stringify(patientCheckinObj));
    } catch (err) {
        log.error("savePatientCheckin Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};


exports.updatePaymentPlanToPatientCheckin = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var query = { patientId: jsonData.patientId };
        var paymentMasterData = await paymentMasterModel.findOne(query);
        paymentMasterData.lastCheckin.treatmentPayment = jsonData.treatmentAmount;
        paymentMasterData.lastCheckin.miscPayment = jsonData.miscAmount;
        paymentMasterData.lastCheckin.totalPlannedPayment = parseFloat(jsonData.treatmentAmount) + parseFloat(jsonData.miscAmount);
        paymentMasterData.lastCheckin.comments = jsonData.comments;
        paymentMasterData.lastCheckin.paymentComplete = false;
        await paymentMasterData.save();
        console.log(paymentMasterData);
        res.send(JSON.stringify(jsonData));
    } catch (err) {
        log.error(" updatePaymentPlanToPatientCheckin Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.savePayment = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonDataTemp = JSON.parse(req.body.mydata);
    var jsonData = jsonDataTemp.lastCheckin;
    log.debug("SAVE savePayment  data %s", req.body.mydata);

    try {
        var paymentModel = mongoose.mtModel(decoded.clinicName + '.' + 'payment');
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var payment = {};
        var patientId = jsonData.patientId;
        payment["patientId"] = jsonData.patientId;
        payment["paymentMasterId"] = jsonData._id;
        payment["name"] = "Payment";
        payment["totalPaidAmount"] = jsonData.lastPaidAmount;
        payment["miscPlannedAmount"] = jsonData.miscPayment;
        payment["treatmentPlannedAmount"] = jsonData.treatmentPayment;
        payment["comments"] = jsonData.comments;
        payment["miscPaidAmount"] = 0;
        payment["treatmentPaidAmount"] = 0;

        console.log(jsonData);
        var query = { patientId: jsonData.patientId };
        var paymentMasterData = await paymentMasterModel.findOne(query);

        if (parseFloat(jsonData.lastPaidAmount) >= parseFloat(jsonData.miscPayment)) {
            payment["miscPaidAmount"] = jsonData.miscPayment;
            jsonData.lastPaidAmount = parseFloat(jsonData.lastPaidAmount) - parseFloat(jsonData.miscPayment);
            paymentMasterData.totalMiscPaidAmount = parseFloat(paymentMasterData.totalMiscPaidAmount) + parseFloat(jsonData.miscPayment);
            if (parseFloat(jsonData.lastPaidAmount) >= parseFloat(jsonData.treatmentPayment)) {
                payment["treatmentPaidAmount"] = jsonData.treatmentPayment;
                paymentMasterData.totalTreatmentPaidAmount = parseFloat(paymentMasterData.totalTreatmentPaidAmount) + parseFloat(jsonData.treatmentPayment);
                paymentMasterData.netTreatmentPendingAmount = parseFloat(paymentMasterData.netTreatmentPendingAmount) - parseFloat(jsonData.treatmentPayment);
            } else if (parseFloat(jsonData.lastPaidAmount) > 0) {
                payment["treatmentPaidAmount"] = jsonData.lastPaidAmount;
                paymentMasterData.totalTreatmentPaidAmount = parseFloat(paymentMasterData.totalTreatmentPaidAmount) + parseFloat(jsonData.lastPaidAmount);
                paymentMasterData.netTreatmentPendingAmount = parseFloat(paymentMasterData.netTreatmentPendingAmount) - parseFloat(jsonData.lastPaidAmount);
            }
        } else if (parseFloat(jsonData.lastPaidAmount) > 0) {
            payment["miscPaidAmount"] = jsonData.lastPaidAmount;
            paymentMasterData.totalMiscPaidAmount = parseFloat(paymentMasterData.totalMiscPaidAmount) + parseFloat(jsonData.lastPaidAmount);
            paymentMasterData.totalMiscPendingAmount = parseFloat(paymentMasterData.totalMiscPendingAmount) + parseFloat(jsonData.miscPayment) - parseFloat(jsonData.lastPaidAmount);
        }

        var paymentObject = new paymentModel(payment);
        paymentMasterData.payments.push(paymentObject);
        paymentMasterData.lastCheckin.paymentComplete = true;
        paymentMasterData.lastCheckin.lastPaidAmount = jsonData.lastPaidAmount;
        paymentMasterData.checkinHistory.push(paymentMasterData.lastCheckin);

        await paymentMasterData.save();
        console.log("Sucessfull payment");
        console.log(paymentMasterData);
        res.send(JSON.stringify(paymentMasterData));
    } catch (err) {
        log.error(" savePayment Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.saveMiscPayment = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.debug("SAVE savePayment  data %s", req.body.mydata);

    try {
        var paymentModel = mongoose.mtModel(decoded.clinicName + '.' + 'payment');
        var patientCheckin = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var payment = {};
        var patientId = jsonData.patientId;
        payment["patientId"] = jsonData.patientId;
        payment["paymentMasterId"] = jsonData._id;
        payment["paidAmount"] = jsonData.lastPaidAmount;
        payment["name"] = "Miscellaneous Payment";
        payment["comments"] = jsonData.comments;
        var paymentObject = new paymentModel(payment);

        var query = { patientId: jsonData.patientId };
        var [paymentMasterData, patientDetails] = await Promise.all([
            paymentMasterModel.findOne(query),
            mongoose.mtModel(decoded.clinicName + '.' + 'Patient').findOne({ "patientid": jsonData.patientId })
        ]);

        if (!patientDetails) {
            log.error(" saveMiscPayment Error while getting patient details for patient with id %s", patientId);
            return res.status(404).send({ "error": "Patient not found" });
        }

        var firstname = patientDetails.firstname;
        var lastname = patientDetails.lastname;

        if (paymentMasterData == null || isEmptyObject(paymentMasterData)) {
            paymentMasterData = new paymentMasterModel();
            paymentMasterData["patientId"] = jsonData.patientId;
            paymentMasterData["firstname"] = firstname;
            paymentMasterData["lastname"] = lastname;
            log.debug(" savePaymentEstimate Creating New payment Master for the first time" + paymentMasterData);
        }

        if (paymentMasterData) {
            paymentMasterData.totalPaidAmount = parseFloat(paymentMasterData.totalPaidAmount) + parseFloat(jsonData.lastPaidAmount);
            paymentMasterData.totalMiscAmount = parseFloat(paymentMasterData.totalMiscAmount) + parseFloat(jsonData.lastPaidAmount);
            paymentMasterData.payments.push(paymentObject);

            await paymentMasterData.save();

            var querypatientCheckin = {
                patientId: jsonData.patientId,
                _id: jsonData._id
            };
            await patientCheckin.updateOne(querypatientCheckin, {
                lastPaidAmount: jsonData.lastPaidAmount,
                comments: jsonData.comments,
                paymentComplete: true
            });

            res.send(JSON.stringify(paymentMasterData));
        } else {
            res.send({});
        }
    } catch (err) {
        log.error(" saveMiscPayment Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.savePaymentAdjustment = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);

    log.debug("SAVE savePayment savePaymentAdjustment  data %s", req.body.mydata);

    try {
        var paymentModel = mongoose.mtModel(decoded.clinicName + '.' + 'payment');
        var payment = {};
        payment["patientId"] = jsonData.patientId;
        payment["paymentMasterId"] = jsonData._id;
        payment["treatmentAdjustedAmount"] = jsonData.treatmentAdjustedAmount;
        payment["miscAdjustmentAmount"] = jsonData.miscAdjustmentAmount;
        payment["totalAdjustmentAmount"] = parseFloat(jsonData.miscAdjustmentAmount) + parseFloat(jsonData.totalAdjustmentAmount);
        payment["name"] = "Adjustment";
        var paymentObject = new paymentModel(payment);

        var patientId = jsonData.patientId;
        var query = { "patientId": patientId };

        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var paymentMasterData = await paymentMasterModel.findOne(query);
        paymentMasterData.netTreatmentPendingAmount = parseFloat(paymentMasterData.netTreatmentPendingAmount) - parseFloat(jsonData.treatmentAdjustedAmount);
        paymentMasterData.totalMiscPendingAmount = parseFloat(paymentMasterData.totalMiscPendingAmount) - parseFloat(jsonData.miscAdjustmentAmount);
        paymentMasterData.totalTreatmentAdjustedAmount = parseFloat(paymentMasterData.totalTreatmentAdjustedAmount) + parseFloat(jsonData.treatmentAdjustedAmount);
        paymentMasterData.totalMiscAdjustedAmount = parseFloat(paymentMasterData.totalMiscAdjustedAmount) + parseFloat(jsonData.miscAdjustmentAmount);
        paymentMasterData.payments.push(paymentObject);
        await paymentMasterData.save();
        res.send(JSON.stringify(paymentMasterData));
    } catch (err) {
        log.error("savePaymentAdjustment Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.savePaymentEstimate1 = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    jsonData["pendingAmount"] = jsonData.estimateAmount;
    jsonData["paidAmount"] = 0;
    log.info("SAVE savePaymentEstimate");
    log.debug("SAVE savePaymentEstimate data %s", req.body.mydata);

    try {
        var paymentEstimateModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentEstimate');
        var paymentEstimateObject = new paymentEstimateModel(jsonData);
        await paymentEstimateObject.save();

        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        var patientId = req.params.patientId;
        var query = { "patientid": patientId };
        var paymentEstimates = await paymentEstimateModel.find(query);
        log.debug("Result Set := %s", JSON.stringify(paymentEstimates));
        res.send(JSON.stringify(paymentEstimates));
    } catch (err) {
        log.error("savePaymentEstimate1 Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};




exports.savePayment1 = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("SAVE savePayment");
    log.debug("SAVE savePayment  data %s", req.body.mydata);

    try {
        var paymentModel = mongoose.mtModel(decoded.clinicName + '.' + 'payment');
        var payment = {};
        payment["patientId"] = jsonData.patientId;
        payment["paymentEstimateId"] = jsonData._id;
        payment["paidAmount"] = jsonData.lastPaidAmount;
        var paymentObject = new paymentModel(payment);

        var paymentEstimateModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentEstimate');
        var paymentEstimateData = await paymentEstimateModel.findById(jsonData._id);
        paymentEstimateData.pendingAmount = paymentEstimateData.pendingAmount - jsonData.lastPaidAmount;
        paymentEstimateData.paidAmount = parseFloat(paymentEstimateData.paidAmount) + parseFloat(jsonData.lastPaidAmount);
        paymentEstimateData.payments.push(paymentObject);
        await paymentEstimateData.save();
        res.send(JSON.stringify(paymentEstimateData));
    } catch (err) {
        log.error(" savePayment1 Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getPaymentEstimates = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    var patientId = jsonData.patientId;
    log.debug("patientId" + patientId);
    var query = { "patientId": patientId };

    try {
        var paymentEstimateModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentEstimate');
        var paymentEstimates = await paymentEstimateModel.find(query);
        log.debug("Result Set := %s", JSON.stringify(paymentEstimates));
        res.send(JSON.stringify(paymentEstimates));
    } catch (err) {
        log.error("Error Occured while finding paymentEstimates");
        res.status(500).send({ "error": error.internalServerError() });
    }
};


exports.updatePaymentPlanToPatientCheckin_old = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    log.info("update PATIENT : %s", req.body.mydata);
    log.debug("update PATIENT : %s", req.body.mydata);

    try {
        var patientCheckin = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var query = { _id: jsonData.patientCheckinId };
        log.debug("update PATIENT DETAILS WITH PATIENT ID : %s", jsonData.patientId);
        await patientCheckin.updateOne(query, jsonData);
        res.send(JSON.stringify(jsonData));
    } catch (err) {
        log.error(" update patient Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.updatePatientCheckin = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);
    var jsonData = JSON.parse(req.body.mydata);
    delete jsonData._id;
    log.info("update PATIENT : %s", req.body.mydata);
    log.debug("update PATIENT : %s", req.body.mydata);

    try {
        var patientCheckin = mongoose.mtModel(decoded.clinicName + '.' + 'patientCheckin');
        var query = { _id: jsonData.patientCheckinId };
        log.debug("update PATIENT DETAILS WITH PATIENT ID : %s", jsonData.patientId);
        console.log(jsonData);
        console.log(patientCheckin);
        await patientCheckin.updateOne(query, jsonData);
        log.debug("update patient Number of documents updated");
        log.debug(JSON.stringify(jsonData));
        log.debug("-- - - --- --- -");
        res.send(JSON.stringify(jsonData));
    } catch (err) {
        log.error(" update patient Error While inserting the data" + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};



exports.getTreatmentTypes = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var types = await paymentMasterModel.distinct('paymentEstimates.estimateelemnt.treatmenttype');
        res.send(types);
    } catch (err) {
        log.error("getTreatmentTypes Error: " + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};

exports.getNetPendingAmountTreatmentReport = async function (req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, SECRET);

    try {
        var paymentMasterModel = mongoose.mtModel(decoded.clinicName + '.' + 'paymentMaster');
        var docs = await paymentMasterModel.find({
            netPendingAmount: { $gt: 0 }
        }, 'netPendingAmount patientId firstname lastname').sort({ netPendingAmount: -1 });
        res.send(docs);
    } catch (err) {
        log.error("getNetPendingAmountTreatmentReport Error: " + err);
        res.status(500).send({ "error": error.internalServerError() });
    }
};
