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

const makeSQLQuery = function (query, pool) {
    return function () {

        //get Arguments
        var params = [];
        for (var i in arguments) {
            params.push(arguments[i]);
        }

        var p = new Promise(function (resolve, reject) {
            pool.getConnection(function (e, conn) {
                if (e) {
                    console.error(e);
                    reject(e);
                } else {
                    conn.query(query, params, function (e, result) {
                        if (e) {
                            console.error(e);
                            reject(e);
                        } else {
                            console.info(result);
                            resolve(result);
                        }
                    });
                }
                conn.release();
            });
        });
    }
}

const makeFilmQuerybyID = makeSQLQuery("SELECT * FROM sakila.film WHERE film_id=?", pool);
const makeFilmQuerybyNAME = makeSQLQuery("SELECT * FROM sakila.film WHERE title=?", pool);
const makeFilmQuerybyYEAR = makeSQLQuery("SELECT * FROM sakila.film WHERE release_year=?", pool);
