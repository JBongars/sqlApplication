/**
 * Title        :   Server side router
 * Created      :   12/09/2017
 * Updated      :
 * Author       :   Julien Bongars
 * Description  :   Modularise server side requests
 */

'use strict';

module.exports = function (app, sqlSvc) {

    app.get('/films', function (req, res) {

        console.log("touched");

        sqlSvc.makeFilmQuery().then(function (result) {
            console.info(result);
            res.status(200);
            res.json(result);

        }).catch(function (e) {
            console.error(e);
            res.status(500);
            res.send("Internal Server Failed");
        });
    });

    app.get('/films/id/:id', function (req, res) {

        var id = parseInt(req.params.id);

        sqlSvc.makeFilmQuerybyID(id).then(function (result) {
            //console.info(result);
            res.status(200);
            res.json(result);

        }).catch(function (e) {
            console.error(e);
            res.status(500);
            res.send("Internal Server Failed");
        });
    });

    app.get('/films/name/:name', function (req, res) {

        var name = req.params.name;

        sqlSvc.makeFilmQuerybyNAME(name).then(function (result) {
            console.info(result);
            res.status(200);
            res.json(result);

        }).catch(function (e) {
            console.error(e);
            res.status(500);
            res.send("Internal Server Failed");
        });
    });

    /*
    app.get('/films/year/:year', function (req, res) {

        year = new Date(req.query.year)

        sqlSvc.makeFilmQuerybyYEAR().then(function (result) {
            console.info(result);
            res.status(200);
            res.json(result);

        }).catch(function (e) {
            console.error(e);
            res.status(500);
            res.send("Internal Server Failed");
        });
    });
    */

    console.log("ROUTES LOADED");
};