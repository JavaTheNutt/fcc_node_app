/**
 * Created by joewe on 14/12/2016.
 */
const express = require('express');
const router  = express.Router();
const timestampService = require('./timestamp');

const model = {
    title: 'Timestamp Service',
    isInput : true
};
router.get('/', function (req, res, next) {
    model.isInput = true;
    model.hasErrors = false;
    model.errorMsg = undefined;
    model.content = {};
    route(req, res, next);
});
function route(req, res, next) {
    console.log('request received by timestamp service');
    console.log(req.query);
    req.query.hasOwnProperty('date') ? getOutputData(req.query.date, res): renderInput(res);
}
function getOutputData(timestamp, res) {
    console.log('parsing: ' + timestamp);
    model.isInput = false;
    timestampService.getTimeObject(timestamp, function (timeObject) {
        timestampConversionSuccessful(timeObject, res);
    }, function (err, timeObject) { //fixme: refactor so that the error string should be included in the timeObject
        timestampConversionFailed(err, timeObject, res);
    });
}
function timestampConversionSuccessful(timeObject){
    'use strict';
    model.hasErrors = false;
    model.content = timeObject;
    renderOutput(res)
}
function timestampConversionFailed(err, timeObject, res) {
    'use strict';
    model.hasErrors = true;
    model.errorMsg = err;
    model.content = timeObject;
    renderOutput(res)
}
function renderOutput(res){
    'use strict';
    console.log('render output called with this model: ' + JSON.parse(JSON.stringify(model)));
    res.render('timestamp', model);
}
function renderInput(res){
    'use strict';
    console.log('render input called with this model: ' + JSON.parse(JSON.stringify(model.isInput)));
    res.render('timestamp', model);
}


module.exports = router;
