const express = require('express');
const timestamp = require('./timestamp');
const router = express.Router();
/**
  * This function will get the Timestamp from the url and perform all processing to return the correct response.
  *
  */
//todo: break anonymous function into named function
router.get('/:stamp', function(req, res, next){
    const params = req.params;
    //todo: rename for clarity
    var object = {};
    object.title = 'timestamp';
    //todo: break success/error into seperate functions.
    timestamp.getTimeObject(params.stamp, function(data){
        'use strict';
        console.log("success!!", data);
        object.content = data;
    }, function(err, obj){
        'use strict';
        console.log("failed :(", err);
        //fixme error not printing
        //todo use promises instead of callbacks
        object.content = obj;
    });
    res.render('timestamp', object);
});

module.exports = router;