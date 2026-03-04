'''
Created on 16-Nov-2014

@author: Vivek
'''
from pymongo import MongoClient

print "Hello World"

client = MongoClient('localhost', 27017)
role = 'doctor' 

clinicName = "angle"

db = client.uwO3mypu

users = db.users
 
for user in users.find():
    if user.has_key('local'):
        userDetails = user['local']
        document = {'username': userDetails['email'], 'role': role, 'clinicName': clinicName, 'password': userDetails['password']}
        print document
        
print "Inserting Diagnosis Details"
diagnosiscollection = db.diagnosisinformations
diagnosisMaster=db.diagnosismasters
count=0
for a in diagnosiscollection.find():
    diagnosis={}
    diagnosisMaster1={}
   # print a["patientId"]
    diagnosis["patientId"]=a["patientId"]
    diagnosis["diagnosisData"]=a
    diagnosis["dateOfDiagnosis"]=a["dateOfDiagnosis"]
    diagnosisMaster1["patientId"]=a["patientId"]
    diagnosisMaster1["currentDiagnosis"]=a
    diagnosisMaster1["diagnosisDetails"]=[a]
    #diagnosisMaster["diagnosisDetails"].push(diagnosis)
    #print diagnosisMaster1
    diagnosisMaster.insert(diagnosisMaster1)
    count=count+1
    print count
    
print "Inserting Treatment plan Details"
treatmentplancollection = db.treatmentplans
treatmentplanMaster=db.treatmentplanmasters
count=0
for a in treatmentplancollection.find():
    treatmentplan={}
    treatmentplanmaster11={}
    #print a
    updateda={"treatmentPlanData":{}}
    if "treatmentPlanData" in a:
        for b in a["treatmentPlanData"]:
            updateda["treatmentPlanData"][b]={}
            for c in a["treatmentPlanData"][b]:
                updateda["treatmentPlanData"][b][c]={}
                for d in a["treatmentPlanData"][b][c]:
                    #print b,c,d
                    updateda["treatmentPlanData"][b][c][d]="NotStarted"
                    #updateda[b][c]=d

        #print "updated a" ,updateda ,"End"
            
    a["treatmentPlanData"] =  updateda["treatmentPlanData"]
    treatmentplan["patientId"]=a["patientId"]
    treatmentplan["treatmentPlanData"]=a
    treatmentplan["dateOfTreatmentPlan"]=a["dateOfTreatmentPlan"]
    treatmentplanmaster11["patientId"]=a["patientId"]
    treatmentplanmaster11["currentTreatmentPlan"]=a
    treatmentplanmaster11["treatmentPlanDetails"]=[a]
    #diagnosisMaster["diagnosisDetails"].push(diagnosis)
    #print treatmentplanmaster11
    treatmentplanMaster.insert(treatmentplanmaster11)
    count=count+1
    print count