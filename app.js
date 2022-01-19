const express = require("express");
const bp = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bp.urlencoded({ extended: true }));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

const firstName = req.body.firstName;
const lastName = req.body.lastName;
const email = req.body.email;

var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
}
var jsonData = JSON.stringify(data);
const url = "https://us20.api.mailchimp.com/3.0/lists/862d2289cd";
const options = {
    method: "POST",
    auth: "Donald:59fbdb00eac51ac4e575332f678a7acd-us20"

  }
const request = https.request(url, options, function(response){

  response.on("data",function(data){
    var Stat = JSON.parse(data);
    console.log(Stat.error_count);
    if (Stat.error_count >0){
      res.write("<h1>Error</h1>");
      res.send
    }
    if (Stat.error_count == 0){
      res.write("<h1>Good Stuff</h1>");
      res.send
    }
  })



});
request.write(jsonData);
request.end();

})



app.listen(process.evn.PORT || 3000,function(){

  console.log("Server is running on port 3000");

});

// curl -X PUT \
//   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}/members/{subscriber_hash}?skip_merge_validation=<SOME_BOOLEAN_VALUE>' \
//   --user "anystring:${apikey}"' \
//   -d '{"email_address":"","status_if_new":"subscribed","email_type":"","status":"subscribed","merge_fields":{},"interests":{},"language":"","vip":false,"location":{"latitude":0,"longitude":0},"marketing_permissions":[],"ip_signup":"","timestamp_signup":"","ip_opt":"","timestamp_opt":""}'

// 59fbdb00eac51ac4e575332f678a7acd-us20
// 862d2289cd
