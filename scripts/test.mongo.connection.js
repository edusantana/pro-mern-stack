const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

// Use connect method to connect to the Server
client.connect().then(
  client => {
    console.log("Connected successfully to server");
    client.close();
  }).catch(err =>{
    console.log("Erro", err);
  });
