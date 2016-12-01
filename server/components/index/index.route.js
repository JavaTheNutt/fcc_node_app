const express = require('express');
const router = express.Router();

function renderIndex(req, res, next){
  res.render('index', {});
}
router.get('/', renderIndex);
module.exports = router;
