var express = require('express');
// var users = require('./users');
var router = express.Router();
var mysql = require('mysql');
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/process', function(req, res, next) {
    res.render('process', {
        title: 'Dianying'
    });
});
router.post('/recommend', function(req, res, next) {
    var con = mysql.createConnection({
        host: "146.148.51.94",
        user: "root",
        password: "",
        database: "db"
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    function dianying(namespace, thing) {
        var id = shortid.generate();
        console.log("ID: "+ String(id));
        var namespace = namespace;
        console.log("Namespace: " + namespace);
        var thing = thing;
        console.log("Thing: "+ thing);
        inputDB(id, namespace, thing);
        output = retrieveDB();
        return process(id, namespace, output);
    }

    function convertToJSON(str) {
        return JSON.stringify(str);
    }

    function process(id, namespace, retrieval) {
        var id = id;
        var namespace = namespace;
        ger.initialize_namespace(namespace);
        var retrieval = retrieval;
        for (var i in retrieval) {
            if (retrieval[i][1] !== namespace) continue;
            // Do JSON processing
            ger.events([{
                namespace: namespace,
                person: retrieval[i][2],
                action: retrieval[i][3],
                thing: retrieval[i][4],
                expires_at: retrieval[i][5]
            }]);
        }
        return ger.recommendations_for_person(namespace, id, {
            actions: {
                likes: 1
            }
        })
    }

    function retrieveDB() {
        var retrieve = "SELECT * FROM entries";
        con.query(retrieve, function(err, result) {
            if (err) throw err;
            console.log("Sucessful retrieval.");
            return convertToJSON(result);
        });
    }

    function inputDB(id, namespace, thing) {
        var id = id;
        var namespace = namespace;
        var thing = thing;
        var query = "INSERT INTO entries (namespace, person, action, thing, expires_at) VALUES ?";
        var values = [namespace, id, "likes", thing, "2020-06-06"];
        con.query(query, [values], function(err, result) {
            if (err) throw err;
            console.log("Sucessful input.");
        });
    }
    var output = dianying(req.body.namespace, req.body.in);
    res.render('recommend', {
        output: req.body.namespace
    });
});
module.exports = router;