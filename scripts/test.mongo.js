var db = new Mongo().getDB("playground");

db.employees.find();

db.employees.update({"_id" : ObjectId("5c2d162ed7eaa73b1c18c7f3")}, {$set: {name: {first: "Dudu", middle: "Santana Medeiros", last: "Alexandre"}}})
