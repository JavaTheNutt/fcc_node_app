var moment = require('moment');
var exports = module.exports ={};

function isValidNumeric(timestamp) {
    console.log('checking if ' + timestamp +' is a valid 10 digit numeric timestamp');
    var numericRegex = /^\d{10}$/;
    return numericRegex.test(timestamp);

}
function createNullTimestampObject(error, errorCallback){
    'use strict';
    if(error) console.log(error);
    errorCallback(error, {
        "unix": null,
        "natural": null
    })
}
function formatToMemonic(timestamp){
    'use strict';
    var natural = new Date(timestamp*1000);
    var naturalMoment = moment(natural);
    console.log('natural: ' + natural);
    console.log('naturalMoment: ' + naturalMoment);
    return naturalMoment.format('MMMM Do, YYYY');
}
function createValidObject(unix, natural, success) {
    success({"unix": unix, "natural": natural});
}
function numericFormat(timestamp, success, err){
    'use strict';
    if(!isValidNumeric(timestamp)) return createNullTimestampObject('Timestamp must be a 10 digit numeric string if it does not contain spaces', err);
    console.log('timestamp is valid numeric');

    createValidObject(timestamp, formatToMemonic(timestamp, success, err), success);
}
function isValidTimestamp(timestamp, success, err){
    'use strict';
    console.log('checking: ', timestamp);
    if(timestamp.split(' ').length == 1){
        numericFormat(timestamp, success, err);
    }else{
        console.log('contains spaces');
    }

}
exports.getTimeObject = function getTimeObject(timestamp, success, err) {
    'use strict';
    console.log('recieved request to check: ' + timestamp);
    isValidTimestamp(timestamp, success, err);
};

