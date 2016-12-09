const express = require('express');
const router = express.Router();

function renderIndex(req, res, next){
  res.render('index', {title: 'Home -- FCC API Development'});
}

router.get('/', renderIndex);
module.exports = router;
