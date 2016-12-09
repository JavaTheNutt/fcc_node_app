var moment = require('moment');
var exports = module.exports = {};

/**
  * This function takes a timestampOut and ensures that it is a valid number
  * @param timestamp {string} the timestampOut
  * @return {Boolean}
  */
function isValidNumeric(timestamp) {
    'use strict';
    console.log('checking if ' + timestamp +' is a valid 10 digit numeric timestampOut');
    //todo: refine regex
    var numericRegex = /^\d{10}$/;
    return numericRegex.test(timestamp);

}

/**
  * This function will create a null timestampOut object to be returned, along with an error message
  * @param error {string}
  * @param errorCallback {function}
  * @callback the callback to return the error to the timestampOut router
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
  * This function takes a valid timestampOut and converts it to a memonic date
  * @param timestamp {string} the timestampOut
  * @return {string} the date in memonic form
  */
function formatToMemonic(timestamp){
    'use strict';
    var natural = new Date(timestamp*1000);
    //todo: uncomment and test using moment to parse the timestampOut
    //var natural = moment.unix(timestampOut);
    var naturalMoment = moment(natural);
    console.log('natural: ' + natural);
    console.log('naturalMoment: ' + naturalMoment);
    return naturalMoment.format('MMMM Do, YYYY');
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
    if(!isValidNumeric(timestamp)) return createNullTimestampObject('Timestamp must be a 10 digit numeric string if it does not contain spaces', err);
    console.log('timestampOut is valid numeric');

    createValidObject(timestamp, formatToMemonic(timestamp), success);
}

/**
  * This function will take the month and return its numeric value. 
  * @param month {string} the month in memonic format
  * @param err {function} the callback to be called if the month is not recognised.
  * @callback err is the callback passed in by timestampOut.route
  */
function getNumericMonth(month, err){
    'use strict';
    switch(month){
        case 'january':
            return 1;
        case 'february':
            return 2;
        case 'march':
            return 3;
        case 'april':
            return 4;
        case 'may':
            return 5;
        case 'june':
            return 6;
        case 'july':
            return 7;
        case 'august':
            return 8;
        case 'september':
            return 9;
        case 'october':
            return 10;
        case 'november':
            return 11;
        case 'december':
            return 12;
        default:
            createNullTimestampObject('The month specified does not match formal params', err);
    }
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
    console.log('timestampOut is assumed memonic');
    console.log('month segment ' + timestamp.substring(0, timestamp.indexOf(' ')).toLowerCase());
    var month = getNumericMonth(timestamp.substring(0, timestamp.indexOf(' ')).toLowerCase(), err);
    var year = timestamp.substring(timestamp.lastIndexOf(' '));
    console.log('year: ' + year);
    var day = timestamp.substring(timestamp.indexOf(' '), timestamp.indexOf(','));
    console.log('day: ' + day);
    var ts = (moment(day + '/' + month + '/' + year +' 00:00', 'D/M/YYYY H:mm').valueOf())/1000;
    console.log('unix timestampOut: ' + ts);
    console.log("Month is " + month);
    createValidObject(ts, timestamp, success);
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
    console.log('checking: ', timestamp);
    if(timestamp.split(' ').length == 1){
        numericFormat(timestamp, success, err);
    }else{
        console.log('contains spaces');
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
    console.log('recieved request to check: ' + timestamp);
    isValidTimestamp(timestamp, success, err);
};

