var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:32769/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tourofheroes");
  dbo.collection("heroes").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});