var express = require('express');
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
        var namespace = namespace;
        var thing = thing;
        inputDB(id, namespace, thing);
        var retrieval = retrieveDB();
        console.log("Starting Processing!");
        ger.initialize_namespace(namespace)
            .then(function() {
                for (var i in retrieval) {
                    console.log("Iteration: " + i);
                    if (retrieval[i][1] !== namespace) continue;
                    ///For testing
                    console.log("Namespace: " + namespace)
                    console.log("Person: " + retrieval[i][2])
                    console.log("Action: " + retrieval[i][3])
                    console.log("Thing: " + retrieval[i][4])

                    // Train GER
                    ger.events([{
                        namespace: namespace,
                        person: retrieval[i][2],
                        action: retrieval[i][3],
                        thing: retrieval[i][4],
                        expires_at: retrieval[i][5]
                    }]);
                }
                return ger.recommendations_for_person(namespace, id, {actions: {likes: 1}}) || "No possible output, we are still gathering data!"; 

            })

    }

    function convertToJSON(str) {
        return JSON.stringify(str);
    }

    function process(id, namespace, retrieval) {
        console.log("Starting Processing");
        var id = id;
        var namespace = namespace;
        ger.initialize_namespace(namespace);
        var retrieval = retrieval;
        for (var i in retrieval) {
            console.log("Iteration: " + i);
            if (retrieval[i][1] !== namespace) continue;
            console.log("Namespace: " + namespace)
            console.log("Person: " + retrieval[i][2])
            console.log("Action: " + retrieval[i][3])
            console.log("Thing: " + retrieval[i][4])

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
            console.log("Result: " + convertToJSON(result))
            return convertToJSON(result);
        });
    }

    function inputDB(id, namespace, thing) {
        var id = id;
        console.log(id);
        var namespace = namespace;
        console.log(namespace);
        var thing = thing;
        console.log(thing);
        var query = "INSERT INTO entries (namespace, person, action, thing, expires_at) VALUES (" + "'" + namespace + "'" + "," + "'" + id + "'" + "," + "'likes'" + "," + "'" + thing + "'" + "," + "'2020-06-06'" + ")";
        // var values = [namespace, id, "likes", thing, "2020-06-06"];
        console.log("Query: " + query);
        con.query(query, function(err, result) {
            if (err) console.log(err);
            console.log("Sucessful input.");
        });
    }
    var output = dianying(req.body.namespace, req.body.in);
    res.render('recommend', {
        output: output
    });
});
module.exports = router;
