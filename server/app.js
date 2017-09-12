/**
 * Title        :   Express Server
 * Created      :   12/09/2017
 * Updated      :  
 * Author       :   Julien Bongars
 * Description  :   Server Application for customers application
 */

'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//start instance of express
var app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/../client"));

//Services
var SQL_SERVICE = require('./sqlSvc')();

//Routes
require('./router')(app, SQL_SERVICE);

//route not found
app.use(function(req, res){
    res.send("App not found!");
})

//Listen
const NODE_PORT = process.env.NODE_PORT || 3000;
app.listen(NODE_PORT, function () {
    console.log("Application started at %d, on port %d", (new Date()).toUTCString(), NODE_PORT);
})

module.exports = app;

