create table  payment (
    patientId VARCHAR(50),
    paymentMasterId VARCHAR(50),
    paymentCheckinId VARCHAR(50),
    name VARCHAR(50),
    paymentDate TIMESTAMP,
    plannedAmount FLOAT,
    paidAmount FLOAT,
    comments VARCHAR(250),
);

SELECT * FROM payment WHERE patientId='';
SELECT * FROM payment WHERE patientId='' AND paymentCheckinId='';
SELECT * FROM payment WHERE paymentDate='TODAY';

create table patientCheckin (
    patientId VARCHAR(50),
    name VARCHAR(50),
    checkinDate TIMESTAMP,
    plannedAmount FLOAT,
    lastPaidAmount FLOAT DEFAULT NULL,
    comments VARCHAR(50),
    checkInStatus VARCHAR(50),
    paymentCompleteVARCHAR(50),
    paymentType VARCHAR(50)
);
SELECT * FROM patientCheckin WHERE patientId='';
SELECT * FROM patientCheckin WHERE patientId='' AND paymentCheckinId='';
SELECT * FROM patientCheckin WHERE paymentDate='TODAY';
SELECT * FROM patientCheckin WHERE lastPaidAmount='NULL';

create table paymentMaster (
    patientId VARCHAR(50),
    firstname   VARCHAR(50),
    lastname   VARCHAR(50),
    totalEstimateAmount FLOAT ,
    totalMiscAmount  FLOAT,
    totalPaidAmount FLOAT,
    netPendingAmount FLOAT,
    totalAdjustedAmount FLOAT,
   );
SELECT * from paymentMaster where patientId='' join paymentEstimate and payment
create table paymentEstimate (
    paymentEstimateId VARCHAR(50),
    patientId VARCHAR(50),
    paymentMasterId VARCHAR(50),
    paymentEstimateName VARCHAR(50),
    estimateelemnt [],
    paymentEstimateDate TIMESTAMP,
    estimateAmount VARCHAR(50)
);
select * from paymentEstimate where patientId='';
select * from paymentEstimate where patientid=''and paymentEstimateId='';

