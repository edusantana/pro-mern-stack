'use strict';

const MongoClient = require('mongodb');

function testWithCallbacks(){
  MongoClient.connect('mongodb://localhost/playground', function(err,db){
    db.collection('employees').insertOne({id: 1, name: 'A. Callback'}, function(err, result){
      console.log('Result of insert: ', result.insertedId);
      db.collection('employees').find({id: 1}).toArray(function(err, docs){
        console.log('Result of find:', docs);
        db.close();
      });
    });
  });
}

function testWithPromises(){
  let db;
  MongoClient.connect('mongodb://localhost/playground').then(connection => {
    db = connection;
    return db.collection('employees').insertOne({id: 1, name: 'B. Promises'});
  }).then(result => {
    console.log('Result of insert: ', result.insertedId);
    return db.collection('employees').find({id: 1}).toArray();
  }).then(docs => {
    console.log('Result of find:', docs);
    db.close();
  }).catch(err =>{
    console.log('Error ', err);
  })
}

function testWithGenerator(){
  const co = require('co');
  co(function*(){
    const db = yield MongoClient.connect('mongodb://localhost/playground');

    result = yield db.collection('employees').insertOne({id: 1, name: 'C. generator'});
    console.log('Result of insert: ', result.insertedId);

    const docs = yield db.collection('employees').find({id: 1}).toArray();
    console.log('Result of find:', docs);
  }).catch(err => {
    console.log('Error: ', error);
  });
}

function testWithAsync(){
  const async = require('async');
  let db;
  async.waterfall([
    next => {
      MongoClient.connect('mongodb://localhost/playground', next)
    },
    (connection, next) => {
      db = connection;
      db.collection('employees').insertOne({id: 1, name: 'D. Async'}, next);
    },
    (insertResult, next) => {
      console.log('Insert result: ', insertResult.insertedId);
      db.collection('employees').find({id: 1}).toArray(next);
    },
    (docs, next) => {
      console.log('Result of find: ', docs);
      db.close();
      next(null, 'All done');
    }
  ], (err, result) => {
    if(err){
      console.log('ERROR', err);
    } else {
      console.log(result);
    }
  });
}

function usage(){
  console.log("Usage:");
  console.log('node ', __filename, '<option>');
  console.log('Aonde <option> pode ser:');
  console.log('  callbacks  Usa paradigma callbacks');
  console.log('  promises   Use paradigma promises');
  console.log('  generator  Use paradigma generator');
  console.log('  async      Usa o módulo async');
}

if (process.argv.length < 3){
  console.log("Numero incorreto de argumentos");
  usage();
}else{
  if(process.argv[2] === 'callbacks'){
    testWithCallbacks();
  }else if(process.argv[2] === 'promises'){
    testWithPromises();
  }else if(process.argv[2] === 'generator'){
    testWithGenerator();
  }else if(process.argv[2]==='async'){
    testWithAsync();
  }else{
    console.log("Opção inválida: ", process.argv[2]);
    usage();
  }
}
