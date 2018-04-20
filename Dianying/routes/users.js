var express = require('express');
var mysql = require('mysql');
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
var retrieve = "SELECT * FROM entries";
var con = mysql.createConnection({
      host: "146.148.51.94",
      user: "root",
      password: "",
      database:"db"
});
    
con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
});
var output;
function retrieveDB(){
  con.query(retrieve, function (err, result) {
      if (err) throw err;
      output = result;
      console.log("Sucessful retrieval.");
  });
}
function inputDB(input){
    con.query(input, function (err, result){
        if(err) throw err;
        console.log("Sucessful input.")
    });
}
function dianying(namespace){
    return ger.initialize_namespace(String(this));
}
var router = express.Router();


module.exports = router;
