const express = require('express');
const timestamp = require('./timestamp');
const router = express.Router();

router.get('/:stamp', function(req, res, next){
    const params = req.params;
    var object = {};
    object.title = 'timestamp';
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
