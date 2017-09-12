/**
 * Title        :   Angular Main Controller for customers app
 * Created      :   12/09/2017
 * Updated      :  
 * Author       :   Julien Bongars
 * Description  :   Main Controller for customer app
 */

"use strict";

(function () {
    Angular.module("myApp").controller("MyCtrl", MyCtrl)

    myCtrl.$inject = ["$http"];

    MyCtrl = function () {
        this = myCtrl; //vm

        myCtrl.data = [];
        myCtrl.maxSqlTableCol = 5;

        myCtrl.getTableCols = function () {
            result = [];
            for (var i = 0; i < myCtrl.sqlTableCol; i++) {
                result.push(i);
            }
            return result;
        }

        myCtrl.getDataCols = function () {
            return Object.keys(myCtrl.data);
        }

        //init
        myCtrl.init = function () {
            console.log("initializing..");
            myCtrl.dataKeys = myCtrl.getTableCols();
        }

    };

})()