var express = require('express');
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);

function dianying(namespace){
    return ger.initialize_namespace(String(this));
}
var router = express.Router();


module.exports = router;
