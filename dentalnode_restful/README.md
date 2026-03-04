# dentalnode_restful

Node.js / Express REST API for the Dental Application.

See the root [README.md](../README.md) for full setup instructions, API reference, and curl test commands.

## Quick Start

```bash
# Start MongoDB first
~/mongodb/bin/mongod --dbpath ~/mongodb/data --logpath ~/mongodb/logs/mongod.log --fork

# Install and run
npm install
npm start
# → Express server listening on port 3000
```

## Endpoints Summary

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Health check |
| POST | `/signup` | Register a new doctor |
| POST | `/authenticate` | Login and get JWT token |
| POST | `/doctor/savePatient` | Create new patient |
| GET | `/doctor/getPatient/:patientid` | Get patient by ID |
| POST | `/doctor/updatePatient` | Update patient details |
| POST | `/doctor/searchPatient` | Search patients by name/phone |
| POST | `/doctor/getPatientInfo` | Get patient by query |
| POST | `/doctor/saveChiefComplaint` | Save chief complaint |
| GET | `/doctor/getChiefComplaintDetails/:patientid` | Get chief complaint |
| POST | `/doctor/saveDiagnosisInformation` | Save diagnosis |
| GET | `/doctor/getDiagnosisInformation/:patientid` | Get latest diagnosis |
| POST | `/doctor/saveDiagnosisMaster` | Save to diagnosis history |
| GET | `/doctor/getCurrentDiagnosis/:patientid` | Get current diagnosis |
| POST | `/doctor/newDiagnosis/` | Start a new diagnosis cycle |
| POST | `/doctor/savetreatmentPlan` | Save treatment plan |
| GET | `/doctor/getTreatmentSummary/:patientid` | Get treatment summary |
| POST | `/doctor/savetreatmentPlanMaster` | Save to treatment plan history |
| GET | `/doctor/getTreatmentPlanMaster/:patientid` | Get treatment plan master |
| GET | `/doctor/getTreatmentSummaryMaster/:patientid` | Get full summary |
| GET | `/doctor/getCurrentTreatmentSummary/:patientid` | Get current summary |
| GET | `/doctor/comment/:patientid/:commentid` | Get comments |
| POST | `/doctor/comment` | Post a comment |
| POST | `/doctor/updateComment` | Update a comment |
| POST | `/doctor/checkinPatient/` | Check in a patient |
| POST | `/doctor/savePatientCheckin/` | Save checkin details |
| GET | `/doctor/getTodayCheckInDetails` | Get today's checkins |
| GET | `/doctor/getPatientActveCheckinToday/:patientId` | Get active checkin today |
| GET | `/doctor/getOldPendingCheckInDetails/` | Get pending old checkins |
| POST | `/doctor/updatePaymentPlanToPatientCheckin/` | Attach payment plan to checkin |
| POST | `/doctor/updatePatientCheckin` | Update checkin record |
| POST | `/doctor/savePaymentEstimate` | Create payment estimate |
| POST | `/doctor/getPaymentEstimates` | Get payment estimates |
| POST | `/doctor/getPaymentMaster` | Get full payment record |
| POST | `/doctor/savePayment` | Record a payment |
| POST | `/doctor/saveMiscPayment` | Record a miscellaneous payment |
| POST | `/doctor/savePaymentAdjustment` | Apply payment adjustment |
| GET | `/doctor/treatmenttypes` | Get distinct treatment types |
| GET | `/doctor/getNetPendingAmountTreatmentReport` | Pending amount report |
