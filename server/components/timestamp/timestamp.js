var moment = require('moment');
var exports = module.exports = {};

/**
  * This function takes a timestamp and ensures that it is a valid number
  * @param timestamp {string} the timestamp
  * @return {Boolean}
  */
function isValidNumeric(timestamp) {
    'use strict'
    console.log('checking if ' + timestamp +' is a valid 10 digit numeric timestamp');
    //todo: refine regex
    var numericRegex = /^\d{10}$/;
    return numericRegex.test(timestamp);

}

/**
  * This function will create a null timestamp object to be returned, along with an error message
  * @param error {string}
  * @param errorCallback {function}
  * @callback the callback to return the error to the timestamp router
  */
function createNullTimestampObject(error, errorCallback){
    'use strict';
    if(error) console.log(error);
    errorCallback(error, {
        "unix": null,
        "natural": null
    })
}

/**
  * This function takes a valid timestamp and converts it to a memonic date
  * @param timestamp {string} the timestamp
  * @return {string} the date in memonic form
  */
function formatToMemonic(timestamp){
    'use strict';
    var natural = new Date(timestamp*1000);
    var naturalMoment = moment(natural);
    console.log('natural: ' + natural);
    console.log('naturalMoment: ' + naturalMoment);
    return naturalMoment.format('MMMM Do, YYYY');
}

/**
  * This function will create a valid timestampObject and call the callback to return the object to timestamp.router
  * @param unix {string} the timestamp in Unix format
  * @param natural {string} the timestamp in memonic, human readable format
  * @param success {function} the success callback
  * @callback the callback to return the data to the router
  */
function createValidObject(unix, natural, success) {
    success({"unix": unix, "natural": natural});
}

/**
  * This function is called when a timestamp is assumed to be numeric, since there are no spaces in the string
  * @param timestamp {string} the timestamp passed in
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router 
  * @callback err return the error to the router
  */
function numericFormat(timestamp, success, err){
    'use strict';
    if(!isValidNumeric(timestamp)) return createNullTimestampObject('Timestamp must be a 10 digit numeric string if it does not contain spaces', err);
    console.log('timestamp is valid numeric');

    createValidObject(timestamp, formatToMemonic(timestamp), success);
}

/**
  * This function will handle all of the initial logic for the timestamp.
  * @param timestamp {string} the timestamp
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router
  * @callback err return the error to the router
  */
function isValidTimestamp(timestamp, success, err){
    'use strict';
    console.log('checking: ', timestamp);
    if(timestamp.split(' ').length == 1){
        numericFormat(timestamp, success, err);
    }else{
        console.log('contains spaces');
    }

}

/**
  * This is the publically exposed function that will be called by the router
  * @param timestamp {string} the timestamp
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router
  * @callback err return the error to the router
  */
exports.getTimeObject = function getTimeObject(timestamp, success, err) {
    'use strict';
    console.log('recieved request to check: ' + timestamp);
    isValidTimestamp(timestamp, success, err);
};

