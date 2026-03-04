var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var user = new mongoose.Schema({
    clinicName: String,
    username: String,
    password: String,
    role: String,
    created: {
        type: Date,
        default: Date.now
    },
});

// checking if password is valid
user.methods.validPassword = function (password) {
    // return bcrypt.compareSync(password, this.password);
    return (this.password === password);
};

var patient = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    phone: String,
    email: String,
    age: String,
    gender: String,
    patientid: Number,
    maritalStatus: String,
    doctor: String,
    clinicName: String
});


var patientCheckin = new Schema({
    patientId: Number,
    name: String,
    checkinDate: {
        type: Date
    },
    treatmentPayment: Number,
    miscPayment: Number,
    medicinePayment: Number,
    lastPaidAmount: Number,
    totalPlannedPayment: Number,
    comments: String,
    checkInStatus: String,
    paymentComplete: Boolean
});


var payment = new Schema({
    patientId: Number,
    paymentEstimateId: String,
    name: String,
    paymentDate: {
        type: Date,
        default: Date.now
    },
    treatmentPlannedAmount: Number,
    treatmentPaidAmount: Number,
    miscPlannedAmount: Number,
    miscPaidAmount: Number,
    totalPaidAmount: Number,
    treatmentAdjustedAmount: Number,
    miscAdjustmentAmount: Number,
    totalAdjustmentAmount: Number,
    comments: String,
});

var paymentEstimate = new Schema({
    patientId: Number,
    paymentEstimateName: String,
    estimateelemnt: [],
    paymentEstimateDate: {
        type: Date,
        default: Date.now
    },
    estimateAmount: Number
});

var paymentMaster = new Schema({
    patientId: Number,
    firstname: {
        type: String,
        default: "EMPTY"
    },
    lastname: {
        type: String,
        default: "EMPTY"
    },
    totalEstimateAmount: {
        type: Number,
        default: 0
    },
    totalMiscPaidAmount: {
        type: Number,
        default: 0
    },
    totalMiscPendingAmount: {
        type: Number,
        default: 0
    },
    totalTreatmentPaidAmount: {
        type: Number,
        default: 0
    },
    netTreatmentPendingAmount: {
        type: Number,
        default: 0
    },
    totalTreatmentAdjustedAmount: {
        type: Number,
        default: 0
    },
    totalMiscAdjustedAmount: {
        type: Number,
        default: 0
    },
    payments: [payment],
    paymentEstimates: [paymentEstimate],
    lastCheckin: patientCheckin,
    checkinHistory: [patientCheckin]
});



var comments = new Schema({
    patientid: Number,
    comment: String,
    doctor: String,
    commentid: Number,
    date: {
        type: Date,
        default: Date.now
    },
    children: [Number],
    treatmentPlanData: mongoose.Schema.Types.Mixed,
    diagnosisData: mongoose.Schema.Types.Mixed
});

var diagnosis = new Schema({
    patientId: Number,
    dateOfDiagnosis: {
        type: Date,
        default: Date.now
    },
    diagnosisData: mongoose.Schema.Types.Mixed
});

var diagnosisMaster = new Schema({
    patientId: Number,
    currentDiagnosis: diagnosis,
    firstname: {
        type: String,
        default: "EMPTY"
    },
    lastname: {
        type: String,
        default: "EMPTY"
    },
    diagnosisDetails: [diagnosis]
});

var treatmentPlan = new Schema({
    patientId: Number,
    dateOfTreatmentPlan: {
        type: Date,
        default: Date.now
    },
    treatmentPlanData: mongoose.Schema.Types.Mixed
});

var treatmentPlanMaster = new Schema({
    patientId: Number,
    currentTreatmentPlan: treatmentPlan,
    firstname: {
        type: String,
        default: "EMPTY"
    },
    lastname: {
        type: String,
        default: "EMPTY"
    },
    treatmentPlanDetails: [treatmentPlan]
});

var treatmentSummaryMaster = new Schema({
    patientId: Number,
    treatmentSummaryDetails: mongoose.Schema.Types.Mixed,
    dateOfTreatmentPlan: {
        type: Date,
        default: Date.now
    }
});

var chiefComplaint = new Schema({
    patientId: Number,
    chiefComplaintDetails: String,
    medicalHistory: String,
    anyOtherInformation: String,
    dateOfTreatmentPlan: {
        type: Date,
        default: Date.now
    }
});

// Custom mtModel replaces mongoose-multitenant.
// Models are created on demand per clinic (tenant) and cached.
const schemaMap = {
    Patient: patient,
    Comments: comments,
    ChiefComplaintInformation: chiefComplaint,
    treatmentPlanMaster: treatmentPlanMaster,
    treatmentPlan: treatmentPlan,
    diagnosis: diagnosis,
    diagnosisMaster: diagnosisMaster,
    patientCheckin: patientCheckin,
    paymentEstimate: paymentEstimate,
    payment: payment,
    paymentMaster: paymentMaster,
    treatmentSummaryMaster: treatmentSummaryMaster
};

const modelCache = {};
mongoose.mtModel = function (tenantModel) {
    if (!modelCache[tenantModel]) {
        const [clinicName, modelName] = tenantModel.split('.');
        const schema = schemaMap[modelName];
        if (!schema) throw new Error('Unknown model: ' + modelName);
        const collectionName = clinicName + '__' + modelName.toLowerCase() + 's';
        modelCache[tenantModel] = mongoose.model(tenantModel, schema.clone(), collectionName);
    }
    return modelCache[tenantModel];
};

// Global non-tenant model for authentication
exports.doctor = mongoose.model('users', user);
