# Dental Application

A multi-tenant dental clinic management system with a Node.js REST API backend.

---

## Project Structure

```
integerate-dentalnode_refac_1/
├── dentalnode_restful/   # Node.js REST API (port 3000)
├── dentalnode_desktop/   # Angular UI (desktop)
├── dentalnode_report/    # Report generation module
└── dentalnode_tab/       # Tablet UI
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v21+ |
| Framework | Express 4.21 |
| Database | MongoDB 8.x |
| ODM | Mongoose 8.x |
| Auth | JWT (jwt-simple) |
| Password | bcryptjs |
| Logging | Bunyan |

---

## Prerequisites

- Node.js v18+
- MongoDB 8.x

### Install MongoDB (macOS)

```bash
# Download and install manually (no Xcode CLT required)
curl -L "https://fastdl.mongodb.org/osx/mongodb-macos-arm64-8.0.6.tgz" -o /tmp/mongodb.tgz
cd /tmp && tar -xzf mongodb.tgz
mkdir -p ~/mongodb/bin ~/mongodb/data ~/mongodb/logs
cp /tmp/mongodb-macos-aarch64-8.0.6/bin/* ~/mongodb/bin/

# Add to PATH (add this line to ~/.zshrc)
export PATH="$HOME/mongodb/bin:$PATH"
```

---

## Setup & Run

```bash
# 1. Start MongoDB
~/mongodb/bin/mongod --dbpath ~/mongodb/data --logpath ~/mongodb/logs/mongod.log --fork

# 2. Install dependencies
cd dentalnode_restful
npm install

# 3. Start the API server
npm start
# → Express server listening on port 3000
```

---

## API Reference & curl Test Commands

### Authentication

All `/doctor/*` routes require the header: `x-access-token: <TOKEN>`

Get a token by calling `/authenticate` first and store it:

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@clinic1.com","password":"pass123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
```

---

### 1. Health Check

```bash
# GET /
curl -s http://localhost:3000/
# Response: "Dental App Restful service"
```

---

### 2. Sign Up

```bash
# POST /signup
curl -s -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@clinic1.com",
    "password": "pass123",
    "role": "doctor",
    "clinicName": "clinic1"
  }'
# Response: "SUCCESS"
```

---

### 3. Authenticate

```bash
# POST /authenticate
curl -s -X POST http://localhost:3000/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@clinic1.com",
    "password": "pass123"
  }'
# Response: { "token": "...", "expires": 1234567890, "user": { ... } }
```

---

## Patient APIs

### 4. Save Patient

```bash
# POST /doctor/savePatient
curl -s -X POST http://localhost:3000/doctor/savePatient \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "firstname": "John",
    "lastname": "Doe",
    "address": "123 Main St",
    "phone": "9876543210",
    "email": "john@example.com",
    "age": "35",
    "gender": "Male",
    "maritalStatus": "Married",
    "doctor": "Dr.Smith",
    "clinicName": "clinic1"
  }'
# Response: patient object with auto-incremented patientid
```

### 5. Get Patient by ID

```bash
# GET /doctor/getPatient/:patientid
curl -s http://localhost:3000/doctor/getPatient/1 \
  -H "x-access-token: $TOKEN"
# Response: patient object
```

### 6. Search Patient

```bash
# POST /doctor/searchPatient
curl -s -X POST http://localhost:3000/doctor/searchPatient \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"firstname": "John"}'
# Response: array of matching patients (firstname, patientid, email, phone)
```

### 7. Get Patient Info

```bash
# POST /doctor/getPatientInfo
curl -s -X POST http://localhost:3000/doctor/getPatientInfo \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientid": 1}'
# Response: full patient object
```

### 8. Update Patient

```bash
# POST /doctor/updatePatient
curl -s -X POST http://localhost:3000/doctor/updatePatient \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientid": 1,
    "firstname": "John",
    "lastname": "Doe",
    "phone": "9999999999",
    "address": "456 New St",
    "age": "36",
    "gender": "Male",
    "maritalStatus": "Married",
    "doctor": "Dr.Smith",
    "clinicName": "clinic1"
  }'
# Response: updated patient object
```

---

## Chief Complaint APIs

### 9. Save Chief Complaint

```bash
# POST /doctor/saveChiefComplaint
curl -s -X POST http://localhost:3000/doctor/saveChiefComplaint \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "chiefComplaintDetails": "Tooth pain upper left molar",
    "medicalHistory": "No known allergies, diabetic",
    "anyOtherInformation": "Sensitive to cold"
  }'
# Response: saved chief complaint object
```

### 10. Get Chief Complaint Details

```bash
# GET /doctor/getChiefComplaintDetails/:patientid
curl -s http://localhost:3000/doctor/getChiefComplaintDetails/1 \
  -H "x-access-token: $TOKEN"
# Response: chief complaint object
```

---

## Diagnosis APIs

### 11. Save Diagnosis Information

```bash
# POST /doctor/saveDiagnosisInformation
curl -s -X POST http://localhost:3000/doctor/saveDiagnosisInformation \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "patientid": 1,
    "commentid": 0,
    "diagnosisData": {
      "tooth11": "cavity",
      "tooth12": "healthy",
      "tooth21": "crack",
      "notes": "needs root canal"
    }
  }'
# Response: saved diagnosis object
```

### 12. Get Diagnosis Information

```bash
# GET /doctor/getDiagnosisInformation/:patientid
curl -s http://localhost:3000/doctor/getDiagnosisInformation/1 \
  -H "x-access-token: $TOKEN"
# Response: diagnosisData object
```

### 13. Save Diagnosis Master

```bash
# POST /doctor/saveDiagnosisMaster
curl -s -X POST http://localhost:3000/doctor/saveDiagnosisMaster \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "diagnosisData": {
      "tooth11": "cavity",
      "tooth21": "crack",
      "notes": "confirmed root canal needed"
    }
  }'
# Response: diagnosisMaster object with history
```

### 14. Get Current Diagnosis

```bash
# GET /doctor/getCurrentDiagnosis/:patientid
curl -s http://localhost:3000/doctor/getCurrentDiagnosis/1 \
  -H "x-access-token: $TOKEN"
# Response: current diagnosis object
```

### 15. New Diagnosis (reset / start new cycle)

```bash
# POST /doctor/newDiagnosis/
curl -s -X POST http://localhost:3000/doctor/newDiagnosis/ \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId": 1}'
# Response: "done"
```

---

## Treatment Plan APIs

### 16. Save Treatment Plan

```bash
# POST /doctor/savetreatmentPlan
curl -s -X POST http://localhost:3000/doctor/savetreatmentPlan \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "patientid": 1,
    "commentid": 0,
    "treatmentPlanData": {
      "restoration": { "tooth11": ["filling", "crown"] },
      "rootCanal": { "tooth21": ["pulpectomy"] }
    }
  }'
# Response: saved treatment plan object
```

### 17. Get Treatment Summary

```bash
# GET /doctor/getTreatmentSummary/:patientid
curl -s http://localhost:3000/doctor/getTreatmentSummary/1 \
  -H "x-access-token: $TOKEN"
# Response: treatmentPlanData object
```

### 18. Save Treatment Plan Master

```bash
# POST /doctor/savetreatmentPlanMaster
curl -s -X POST http://localhost:3000/doctor/savetreatmentPlanMaster \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "treatmentPlanData": {
      "restoration": { "tooth11": ["filling", "crown"] },
      "rootCanal": { "tooth21": ["pulpectomy"] }
    }
  }'
# Response: treatmentPlanMaster object with full history
```

### 19. Get Treatment Plan Master

```bash
# GET /doctor/getTreatmentPlanMaster/:patientid
curl -s http://localhost:3000/doctor/getTreatmentPlanMaster/1 \
  -H "x-access-token: $TOKEN"
# Response: treatmentPlanMaster object
```

### 20. Get Treatment Summary Master

```bash
# GET /doctor/getTreatmentSummaryMaster/:patientid
curl -s http://localhost:3000/doctor/getTreatmentSummaryMaster/1 \
  -H "x-access-token: $TOKEN"
# Response: { diagonsisSummaryResponse, treatmentPlanSummaryResponse, treatmentPlanMaster }
```

### 21. Get Current Treatment Summary

```bash
# GET /doctor/getCurrentTreatmentSummary/:patientid
curl -s http://localhost:3000/doctor/getCurrentTreatmentSummary/1 \
  -H "x-access-token: $TOKEN"
# Response: { diagonsisSummaryResponse, treatmentPlanSummaryResponse, treatmentPlanMaster }
```

---

## Comments APIs

### 22. Post Comment

```bash
# POST /doctor/comment
curl -s -X POST http://localhost:3000/doctor/comment \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientid": 1,
    "commentid": 0,
    "comment": "Patient has sensitivity in upper left quadrant",
    "doctor": "Dr.Smith"
  }'
# Response: saved comment object with _id
```

### 23. Get Comments

```bash
# GET /doctor/comment/:patientid/:commentid
curl -s http://localhost:3000/doctor/comment/1/0 \
  -H "x-access-token: $TOKEN"
# Response: array of comments sorted by date descending
```

### 24. Update Comment

```bash
# POST /doctor/updateComment
# Replace <comment_id> with the _id from "Post Comment" response
curl -s -X POST http://localhost:3000/doctor/updateComment \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "_id": "<comment_id>",
    "comment": "Updated: mild sensitivity, review next visit"
  }'
# Response: "Updated"
```

---

## Check-In APIs

### 25. Checkin Patient

```bash
# POST /doctor/checkinPatient/
curl -s -X POST http://localhost:3000/doctor/checkinPatient/ \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientid": 1}'
# Response: paymentMaster object with lastCheckin status = "Waiting"
```

### 26. Save Patient Checkin

```bash
# POST /doctor/savePatientCheckin/
curl -s -X POST http://localhost:3000/doctor/savePatientCheckin/ \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId": 1}'
# Response: patientCheckin object
```

### 27. Get Today's Checkin Details

```bash
# GET /doctor/getTodayCheckInDetails
curl -s http://localhost:3000/doctor/getTodayCheckInDetails \
  -H "x-access-token: $TOKEN"
# Response: array of today's checkins with lastCheckin data
```

### 28. Get Patient Active Checkin Today

```bash
# GET /doctor/getPatientActveCheckinToday/:patientId
curl -s http://localhost:3000/doctor/getPatientActveCheckinToday/1 \
  -H "x-access-token: $TOKEN"
# Response: active checkin object (paymentComplete: false)
```

### 29. Get Old Pending Checkin Details

```bash
# GET /doctor/getOldPendingCheckInDetails/
curl -s "http://localhost:3000/doctor/getOldPendingCheckInDetails/" \
  -H "x-access-token: $TOKEN"
# Response: array of checkins from previous days with no payment recorded
```

### 30. Update Payment Plan to Patient Checkin

```bash
# POST /doctor/updatePaymentPlanToPatientCheckin/
curl -s -X POST http://localhost:3000/doctor/updatePaymentPlanToPatientCheckin/ \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "treatmentAmount": 500,
    "miscAmount": 200,
    "comments": "Crown + consultation fee"
  }'
# Response: input data echoed back
```

### 31. Update Patient Checkin

```bash
# POST /doctor/updatePatientCheckin
# Replace <checkin_id> with _id from checkin response
curl -s -X POST http://localhost:3000/doctor/updatePatientCheckin \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientCheckinId": "<checkin_id>",
    "patientId": 1,
    "checkInStatus": "In Progress"
  }'
# Response: updated checkin object
```

---

## Payment APIs

### 32. Save Payment Estimate

```bash
# POST /doctor/savePaymentEstimate
curl -s -X POST http://localhost:3000/doctor/savePaymentEstimate \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "paymentEstimateName": "Root Canal Estimate",
    "estimateAmount": 3000,
    "estimateelemnt": [
      { "treatmenttype": "Root Canal", "amount": 2000 },
      { "treatmenttype": "Crown", "amount": 1000 }
    ]
  }'
# Response: paymentMaster with updated totalEstimateAmount and netTreatmentPendingAmount
```

### 33. Get Payment Estimates

```bash
# POST /doctor/getPaymentEstimates
curl -s -X POST http://localhost:3000/doctor/getPaymentEstimates \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId": 1}'
# Response: array of payment estimates
```

### 34. Get Payment Master

```bash
# POST /doctor/getPaymentMaster
curl -s -X POST http://localhost:3000/doctor/getPaymentMaster \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId": 1}'
# Response: full paymentMaster with estimates, payments, and checkin history
```

### 35. Save Payment

```bash
# POST /doctor/savePayment
curl -s -X POST http://localhost:3000/doctor/savePayment \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "lastCheckin": {
      "patientId": 1,
      "lastPaidAmount": 700,
      "miscPayment": 200,
      "treatmentPayment": 500,
      "comments": "Partial payment received"
    }
  }'
# Response: updated paymentMaster with payment breakdown and checkin marked complete
```

### 36. Save Misc Payment

```bash
# POST /doctor/saveMiscPayment
curl -s -X POST http://localhost:3000/doctor/saveMiscPayment \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "lastPaidAmount": 150,
    "comments": "Consultation fee"
  }'
# Response: updated paymentMaster
```

### 37. Save Payment Adjustment

```bash
# POST /doctor/savePaymentAdjustment
curl -s -X POST http://localhost:3000/doctor/savePaymentAdjustment \
  -H "x-access-token: $TOKEN" \
  -d 'mydata={
    "patientId": 1,
    "treatmentAdjustedAmount": 100,
    "miscAdjustmentAmount": 50,
    "totalAdjustmentAmount": 150
  }'
# Response: updated paymentMaster with adjusted pending amounts
```

### 38. Get Treatment Types

```bash
# GET /doctor/treatmenttypes
curl -s http://localhost:3000/doctor/treatmenttypes \
  -H "x-access-token: $TOKEN"
# Response: array of distinct treatment types e.g. ["Crown", "Root Canal"]
```

### 39. Get Net Pending Amount Treatment Report

```bash
# GET /doctor/getNetPendingAmountTreatmentReport
curl -s http://localhost:3000/doctor/getNetPendingAmountTreatmentReport \
  -H "x-access-token: $TOKEN"
# Response: array of patients with pending treatment amounts sorted descending
```

---

## Full End-to-End Test Script

Save as `test.sh` and run `bash test.sh` to exercise all APIs in sequence:

```bash
#!/bin/bash
set -e
BASE="http://localhost:3000"

echo "=============================="
echo " Dental App - API Test Runner"
echo "=============================="

echo -e "\n[1] Health Check"
curl -s $BASE/

echo -e "\n\n[2] Signup"
curl -s -X POST $BASE/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@clinic1.com","password":"pass123","role":"doctor","clinicName":"clinic1"}'

echo -e "\n\n[3] Authenticate"
TOKEN=$(curl -s -X POST $BASE/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@clinic1.com","password":"pass123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "Token: ${TOKEN:0:50}..."

echo -e "\n[4] Save Patient"
curl -s -X POST $BASE/doctor/savePatient -H "x-access-token: $TOKEN" \
  -d 'mydata={"firstname":"John","lastname":"Doe","phone":"9876543210","email":"john@example.com","age":"35","gender":"Male","maritalStatus":"Married","doctor":"Dr.Smith","clinicName":"clinic1"}'

echo -e "\n\n[5] Get Patient"
curl -s $BASE/doctor/getPatient/1 -H "x-access-token: $TOKEN"

echo -e "\n\n[6] Search Patient"
curl -s -X POST $BASE/doctor/searchPatient -H "x-access-token: $TOKEN" \
  -d 'mydata={"firstname":"John"}'

echo -e "\n\n[7] Save Chief Complaint"
curl -s -X POST $BASE/doctor/saveChiefComplaint -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId":1,"chiefComplaintDetails":"Tooth pain upper left","medicalHistory":"No allergies","anyOtherInformation":"Cold sensitive"}'

echo -e "\n\n[8] Save Diagnosis"
curl -s -X POST $BASE/doctor/saveDiagnosisInformation -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId":1,"patientid":1,"commentid":0,"diagnosisData":{"tooth11":"cavity","tooth21":"crack"}}'

echo -e "\n\n[9] Save Treatment Plan"
curl -s -X POST $BASE/doctor/savetreatmentPlan -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId":1,"patientid":1,"commentid":0,"treatmentPlanData":{"restoration":{"tooth11":["filling","crown"]},"rootCanal":{"tooth21":["pulpectomy"]}}}'

echo -e "\n\n[10] Checkin Patient"
curl -s -X POST $BASE/doctor/checkinPatient/ -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientid":1}'

echo -e "\n\n[11] Update Payment Plan to Checkin"
curl -s -X POST $BASE/doctor/updatePaymentPlanToPatientCheckin/ -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId":1,"treatmentAmount":500,"miscAmount":200,"comments":"Crown + consultation"}'

echo -e "\n\n[12] Save Payment Estimate"
curl -s -X POST $BASE/doctor/savePaymentEstimate -H "x-access-token: $TOKEN" \
  -d 'mydata={"patientId":1,"paymentEstimateName":"Root Canal Estimate","estimateAmount":3000,"estimateelemnt":[{"treatmenttype":"Root Canal","amount":2000},{"treatmenttype":"Crown","amount":1000}]}'

echo -e "\n\n[13] Save Payment"
curl -s -X POST $BASE/doctor/savePayment -H "x-access-token: $TOKEN" \
  -d 'mydata={"lastCheckin":{"patientId":1,"lastPaidAmount":700,"miscPayment":200,"treatmentPayment":500,"comments":"Partial payment"}}'

echo -e "\n\n[14] Get Today Checkins"
curl -s $BASE/doctor/getTodayCheckInDetails -H "x-access-token: $TOKEN"

echo -e "\n\n[15] Get Treatment Types"
curl -s $BASE/doctor/treatmenttypes -H "x-access-token: $TOKEN"

echo -e "\n\nAll tests completed!"
```

---

## Data Model Overview

```
users                    → doctor login accounts (global, non-tenant)
clinic1__patients        → patient records per clinic
clinic1__diagnosiss      → individual diagnosis records
clinic1__diagnosisMasters → diagnosis history per patient
clinic1__treatmentplans  → individual treatment plans
clinic1__treatmentplanmasters → treatment plan history per patient
clinic1__chiefcomplaintinformations → chief complaints
clinic1__commentss       → clinical notes / comments
clinic1__paymentmasters  → master payment record per patient
clinic1__patientcheckins → individual checkin records
clinic1__payments        → individual payment transactions
clinic1__paymentestimates → payment estimates
```

> Collections are namespaced by clinicName — `{clinicName}__{modelName}s`

---

## Stopping the Server

```bash
# Stop Node app
pkill -f "node app.js"

# Stop MongoDB
~/mongodb/bin/mongod --dbpath ~/mongodb/data --shutdown
```
