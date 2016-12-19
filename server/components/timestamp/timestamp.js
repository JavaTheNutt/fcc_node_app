var moment = require('moment');
const timestampService = require('./timestamp.service.js');
const log = require('../../util/logger');
var exports = module.exports = {};

/**
  * This function will create a null timestampOut object to be returned, along with an error message
  * @param error {string}
  * @param errorCallback {function}
  * @callback the callback to return the error to the timestampOut router
  */
function createNullTimestampObject(error, errorCallback){
    'use strict';
    if(error) log.error(error);
    errorCallback(error, {
        "unix": "null",
        "natural": "null"
    })
}

/**
  * This function will create a valid timestampObject and call the callback to return the object to timestampOut.router
  * @param unix {string} the timestampOut in Unix format
  * @param natural {string} the timestampOut in memonic, human readable format
  * @param success {function} the success callback
  * @callback the callback to return the data to the router
  */
function createValidObject(unix, natural, success) {
    success({"unix": unix, "natural": natural});
}

/**
  * This function is called when a timestampOut is assumed to be numeric, since there are no spaces in the string
  * @param timestamp {string} the timestampOut passed in
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router 
  * @callback err return the error to the router
  */
function numericFormat(timestamp, success, err){
    'use strict';
    if(!timestampService.isValidNumeric(timestamp)) return createNullTimestampObject('Timestamp must be a 10 digit numeric string if it does not contain spaces', err);
    log.info('timestampOut is valid numeric');
    createValidObject(timestamp, timestampService.formatToMemonic(timestamp), success);
}

/**
  * This is the function that will be called if the timestampOut is assumed to be in memonic form
  * @param timestamp {string} a timestampOut in the format of: MM dd, yyyy
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success the success callback passed in by timestampOut.route
  * @callback err the error callback passed in by timestampOut.route
  */
function memonicFormat(timestamp, success, err) {
    var ts = timestampService.formatToUnix(buildMemonic(timestamp, err));
    log.info('unix timestampOut: ' + ts);
    if(isNaN(ts)){
        log.warning('returned timestamp is NaN');
        createNullTimestampObject('The timestamp is invalid', err);
        return;
    }
    createValidObject(ts, timestamp, success);
}

/**
 * This function converts the memonic date into the format that moment expects
 *
 * @param timestamp {string} the timestamp
 * @param err {function} the error callback
 * @returns {*} the timestamp in the correct format, or throws the error callback
 */
function buildMemonic(timestamp, err){
    'use strict';
    const month = timestampService.getMonth(timestamp);
    if(month <= 0 || month >=13) return createNullTimestampObject('The month specified is not valid', err);
    const day = timestamp.substring(timestamp.indexOf(' '), timestamp.indexOf(','));
    const year = timestamp.substring(timestamp.lastIndexOf(' ')).trim();
    return day + '/' + month + '/' + year +' 00:00';
}

/**
  * This function will handle all of the initial logic for the timestampOut.
  * @param timestamp {string} the timestampOut
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router
  * @callback err return the error to the router
  */
function isValidTimestamp(timestamp, success, err){
    'use strict';
    log.info('checking: ', timestamp);
    if(timestamp.split(' ').length == 1){
        numericFormat(timestamp, success, err);
    }else{
        log.info('contains spaces');
        memonicFormat(timestamp, success, err);
    }
}

/**
  * This is the publically exposed function that will be called by the router
  * @param timestamp {string} the timestampOut
  * @param success {function} the success callback
  * @param err {function} the error callback
  * @callback success return the data to the router
  * @callback err return the error to the router
  */
exports.getTimeObject = function getTimeObject(timestamp, success, err) {
    'use strict';
    log.info('recieved request to check: ' + timestamp);
    isValidTimestamp(timestamp, success, err);
};

