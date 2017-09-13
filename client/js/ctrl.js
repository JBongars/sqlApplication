/**
 * Title        :   Angular Main Controller for customers app
 * Created      :   12/09/2017
 * Updated      :  
 * Author       :   Julien Bongars
 * Description  :   Main Controller for customer app
 */

"use strict";

(function () {
    console.log("controller hit");
    angular.module("myApp").controller("MyCtrl", MyCtrl)

    MyCtrl.$inject = ["$http"];

    function MyCtrl($http) {
        var myCtrl = this; //vm

        //myCtrl.data = [];
        myCtrl.sqlData = {};
        myCtrl.maxSqlTableCol = 5;

        //initiate program
        myCtrl.init = function () {
            console.log("initializing..");

            $http.get('/films').then(function (result) {
                console.log(result);

                //Get Data, Data keys
                myCtrl.sqlData = result.data;
                myCtrl.dataKeys = Object.keys(result.data[0]);

                //Get Table Keys
                myCtrl.tableKeys = [];
                myCtrl.tableKeysPos = [];
                for (var i = 0; i < myCtrl.maxSqlTableCol; i++) {
                    myCtrl.tableKeys.push(myCtrl.dataKeys[i]);
                    myCtrl.tableKeysPos.push(i);
                }

                //Get Details for current Entry
                myCtrl.currentEntry = myCtrl.sqlData[0];

                //console.log("table keys: ", myCtrl.tableKeys);
                console.log("data>> ", myCtrl.sqlData);

            }).catch(function (e) {
                console.log(e);
            })
        }
        myCtrl.init();

        myCtrl.colChange = function(input){
            console.log(input);
        }
    };

})()