const express = require('express');
const router = express.Router();

function renderIndex(req, res, next){
    var timestampTestUrls = getUrls(true);
  res.render('index', {});
}
//fixme build a separate service to deal with data injection for each route
function getUrls(isDev){
    'use strict';
    var devBaseUrl = 'localhost:3000/timestamp/';
    var prodBaseUrl = 'https://fathomless-castle-93664.herokuapp.com/timestamp/';
    var testUnix = '1450137600';
    var testMemonic = encodeURI('December 15, 2015');

    var usedUrl = isDev ? devBaseUrl : prodBaseUrl;

    return{
        'unixUrl': usedUrl + testUnix,
        'memonicUrl': usedUrl + testMemonic
    }

}
router.get('/', renderIndex);
module.exports = router;
