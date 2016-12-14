const moment = require('moment');
var exports = module.exports ={};

/**
 * This function will take the month and return its numeric value.
 * @param month {string} the month in memonic format
 */
function getNumericMonth(month){
    'use strict';
    const months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];
    return months.indexOf(month) + 1;
}
/**
 * This function takes a timestamp and ensures that it is a valid number
 * @param timestamp {string} the timestamp
 * @return {Boolean}
 */
exports.isValidNumeric = function (timestamp) {
    'use strict';
    console.log('checking if ' + timestamp +' is a valid 10 digit numeric timestampOut');
    //todo: refine regex
    var numericRegex = /^\d{10}$/;
    return numericRegex.test(timestamp);
};
/**
 * This function takes a valid timestampOut and converts it to a memonic date
 * @param timestamp {string} the timestampOut
 * @return {string} the date in memonic form
 */
exports.formatToMemonic = function (timestamp) {
    'use strict';
    var natural = new Date(timestamp*1000);
    //todo: uncomment and test using moment to parse the timestampOut
    //var natural = moment.unix(timestampOut);
    var naturalMoment = moment(natural);
    console.log('natural: ' + natural);
    console.log('naturalMoment: ' + naturalMoment);
    return naturalMoment.format('MMMM Do, YYYY');
};

/**
 * Take a natural date and return a UNIX timestamp
 * @param timestamp {string} in the format: December 15, 2015
 * @returns {number}
 */
exports.formatToUnix = function (timestamp) {
    console.log('calling moment on timestamp', moment(timestamp, 'D/M/YYYY H:mm'));
    const ts = (moment(timestamp, 'D/M/YYYY H:mm').valueOf())/1000;
    console.log('unix timestampOut: ' + ts);
    return ts;
};
/**
 * Get the numeric month
 * @param timestamp {string}
 * @returns {number}
 */
exports.getMonth = function (timestamp) {
    return getNumericMonth(timestamp.substring(0, timestamp.indexOf(' ')).toLowerCase());
};
