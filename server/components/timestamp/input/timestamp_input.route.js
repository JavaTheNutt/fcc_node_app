const express = require('express');
const router  = express.Router();

router.get('/', function (req, res, next) {
    res.render('timestamp_input', {title: 'Test timestamp -- FCC API Development'})
});
module.exports = router;
