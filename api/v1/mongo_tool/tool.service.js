const { exec } = require("child_process");
const mongoose = require("mongoose");
const restore = require("mongodb-restore-dump");
const path = require("path");

const myCollectionNames = [];

// 1 dump mongodb service
exports.mongodbDump = async () => {
  try {
    const uri = "db uri";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    collections.map((e) => myCollectionNames.push(e.name));

    console.log(myCollectionNames);
    console.log(myCollectionNames.length);

    myCollectionNames.forEach(async (collectionName) => {
      const command = `mongodump --uri ${uri} --collection ${collectionName} --out ./dump/`;
      exec(command, (err, stdout, stderr) => {
        if (err) throw err;
        console.log(`Collection ${collectionName} backed up successfully!`);
      });
    });
    mongoose.disconnect();

    return { message: "Backup Completed..!", status: true };
  } catch (err) {
    console.log(err);
    return { message: err.message, status: false };
  }
};

// 2 restore database collections
exports.mongodbRestore = async () => {
  try {
    const uri = "mongodb://localhost:27017/dumpdb";

    // await restore.database({
    //   uri,
    //   database: "dumpdb",
    //   from: path.resolve("dump", "existdbname"),
    //   dropCollections: true,
    //   metadata: true,
    //   jsonArray: true,
    //   verbose: true,
    // });

    await restore.collection({
      uri,
      database: "which db u want to restore db name",
      collection: "exist collection name",
      from: path.resolve("dump", "dbname/collectionname.bson"),
    });

    return { message: "restore completed..!", status: true };
  } catch (err) {
    console.log(err);
    return { message: err.message, status: false };
  }
};
