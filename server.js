
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up our port
var port = process.env.port||3000;

// express App
var app = express();
var router = express.Router();
// Require our routes
require("./config/routes")(router);
// Designate our public folder as static directory
app.use(express.static(__dirname +"/public"));

//Connect HB to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout:"main"
}));
app.set("view engine","handlebars");

//use body parse in our app
app.use(bodyParser.urlencoded({
  extended:false
}));
//Have every request go through our router middleware
app.use(router);
//If deployed, use the deployed database. Otherwise use the local mongHeadlines db
var db =process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//Connect mongoose to our database log any errors connecting
mongoose.connect(db, function(error){
  if (error){
    console.log(error);
  }
  //or log a success message
  else{
    console.log("mongoose connection is successful");
  }
});

app.listen(port,function(){
  console.log("listening on port:" + port);
});



// // Require axios and cheerio. This makes the scraping possible
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Initialize Express


// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });
