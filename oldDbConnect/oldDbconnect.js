// Connect to Old Database

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kbalandregistryproject2023:Login123@cluster0.kadygun.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) throw err;
  console.log("Connected successfully to MongoDB in the cloud");
  const db = client.db("test");
  client.close();
});