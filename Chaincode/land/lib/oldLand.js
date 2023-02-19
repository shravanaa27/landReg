/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
//const { Client, EventHub } = require('fabric-client');
const util = require('util');
const { LandContract } = require ('./land-contract')

class oldLandRecord extends Contract {

  async initLedger(ctx) {
    console.info('Instantiate the ledger');
  }

  // async fetchAndVerifyRecords(ctx) {
  //   // Fetch records from old database
  //   const oldRecords = await this.fetchFromOldDB();

  //   // Verify records
  //   const verifiedRecords = await this.verifyRecords(oldRecords);

  //   // Return verified records
  //   return verifiedRecords;
  // }

  // async addLandRecord(ctx, landRecord) {
  //   // Add the verified land record to the blockchain network
  //   await ctx.stub.putState(landRecord.id, Buffer.from(JSON.stringify(landRecord)));
  // }

  async fetchFromOldDB() {
    
    // Connect to old database and fetch records
  const oldDb = await this.connectToOldDb();
  
  //const result = await oldDb.query('SELECT presentOwner, father_name, unique_id, personal_id, survey_number, village, mandal, district, state, amount_of_land FROM land_records');
  const result = await oldDb.query('SELECT presentOwner, unique_id, resurveyNo,areaAcres,areaCent,blockNo, village, taluk, subRegistrarOffice, district, amount_of_land FROM landRegistry');

  // Extract records from the result
  const records = result.map((record) => {
    return {
      name: record.presentOwner,
      //fatherName: record.father_name,
      uniqueId: record.unique_id,
      //personalId: record.personal_id,
      resurveyNumber: record.resurveyNo,
      areaAcers: record.areaAcers,
      areaCent: record.areaCent,
      blockNo: record.blockNo,
      village: record.village,
      taluk: record.taluk,
      subRegistrarOffice: record.subRegistrarOffice,
      district: record.district,
      amountOfLand: record.amount_of_land,
    };
  });

  return records;



  }

  async verifyRecords(records) {
    // Verify records using any validation method
    // ...
  }

  async connectToOldDb(){
    
    //fileURLToPath:"/home/shravan/Documents/landReg/oldDbConnect/oldDbconnect.js";
    
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://kbalandregistryproject2023:Login123@cluster0.kadygun.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    if (err) throw err;
    console.log("Connected successfully to MongoDB in the cloud");
  
    const db = client.db("landRegistry");
    const collection = db.collection("landdetails");
    collection.find({}).toArray((err, docs) => {
    if (err) throw err;
    console.log("Data retrieved from MongoDB:");
    console.log(docs);
    client.close();
  });
  
});


  }
}


module.exports = oldLandRecord;
