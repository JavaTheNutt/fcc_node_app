/**
 * Created by joewe on 14/12/2016.
 */
const express = require('express');
const router  = express.Router();
const timestampService = require('./timestamp');

/**
 * This will be the model that will be used to get the data into the view
 * @type {{title: string}}
 */
const model = {
    title: 'Timestamp Service'
};

/**
 * base router. Sets the model object to defaults at each request.
 */
router.get('/', function (req, res, next) {
    model.isInput = true;
    model.hasErrors = false;
    model.errorMsg = undefined;
    model.content = {};
    route(req, res, next);
});

/**
 * This will route the request to the appropriate view
 * @param req the request
 * @param res  the response
 * @param next next piece of middleware
 */
function route(req, res, next) {
    console.log('request received by timestamp service');
    console.log(req.query);
    //if the date param is present, show the output. Otherwise show input
    req.query.hasOwnProperty('date') ? getOutputData(req.query.date, res): renderInput(res);
}

/**
 * Validate and convert date
 *
 * @param timestamp the timestamp pulled from the query string
 * @param res the response
 */
function getOutputData(timestamp, res) {
    console.log('parsing: ' + timestamp);
    model.isInput = false;
    timestampService.getTimeObject(timestamp, function (timeObject) {
        timestampConversionSuccessful(timeObject, res);
    }, function (err, timeObject) { //fixme: refactor so that the error string should be included in the timeObject
        timestampConversionFailed(err, timeObject, res);
    });
}

/**
 * Date conversion successful
 *
 * @param timeObject {{unix: string, natural: string}} the returned time object containing the values
 * @param res the response object
 */
function timestampConversionSuccessful(timeObject, res){
    'use strict';
    model.hasErrors = false;
    model.content = timeObject;
    renderOutput(res)
}

/**
 * Date conversion failed
 *
 * @param err {string} the error message
 * @param timeObject {{unix: string, natural: string}} the time object containing null in string form
 * @param res the response
 */
function timestampConversionFailed(err, timeObject, res) {
    'use strict';
    model.hasErrors = true;
    model.errorMsg = err;
    model.content = timeObject;
    renderOutput(res)
}

/**
 * Display the output view
 *
 * @param res the response object
 */
function renderOutput(res){
    'use strict';
    console.log('render output called with this model: ' + JSON.parse(JSON.stringify(model)));
    res.render('timestamp', model);
}

/**
 * Display the input view
 *
 * @param res the response object
 */
function renderInput(res){
    'use strict';
    console.log('render input called with this model: ' + JSON.parse(JSON.stringify(model.isInput)));
    res.render('timestamp', model);
}


module.exports = router;
