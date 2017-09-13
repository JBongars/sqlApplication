/**
 * Title        :   Server side router
 * Created      :   12/09/2017
 * Updated      :
 * Author       :   Julien Bongars
 * Description  :   Modularise server side requests
 */

"use strict";

const sql = require("mysql");

//TO DO - change connection to appropriate db
var pool = sql.createPool({
    host: "localhost",
    port: 3306, //Server
    user: "superadmin",
    password: "password",
    database: "sakila",
    connectionLimit: 16
})

const makeSQLQuery = function (SQLquery, pool) {
    return function () {
        
        //get parameters
        var params = [];
        for (var i in arguments) {
            params.push(arguments[i]);
        }

        console.log(">> SQLquery >> ", SQLquery, " >> Params >> ", params);

        //SQL call as promise
        var p = new Promise(function (resolve, reject) {
            pool.getConnection(function (e, conn) {

                if (e) reject(e);
                else {
                    conn.query(SQLquery, params, function (e, result) {
                        if (e) reject(e);
                        else {
                            resolve(result);
                        }
                    });
                }
                conn.release();
            });
        });

        return p;
    }
}

const SAKILA_FILM_VIEW = ""

module.exports = function () {

    return {
        //Return SQL queries as attributes
        makeFilmQuery: makeSQLQuery("SELECT * FROM sakila.film", pool),
        makeFilmQuerybyID: makeSQLQuery("SELECT * FROM sakila.film WHERE film_id=?", pool),
        makeFilmQuerybyNAME: makeSQLQuery("SELECT * FROM sakila.film WHERE title=?", pool),
        makeFilmQuerybyYEAR: makeSQLQuery("SELECT * FROM sakila.film WHERE release_year=?", pool)
    }
}
