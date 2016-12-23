/**
 * Created by joewe on 23/12/2016.
 */
const path = require('path');
const log = require('./util/logger');

const rootPath = path.join(__dirname, 'public/vendor');

function getVendorJs(){
    'use strict';
    const jsVendorList = [
        path.join(rootPath, 'jquery/dist/jquery.min.js'),
        path.join(rootPath, 'jquery-ui/jquery-ui.min.js'),
        path.join(rootPath, 'bootstrap/dist/js/bootstrap.min.js')
    ];
    jsVendorList.forEach((elem) =>{
        log.info('path: %s', elem);
    });
    return jsVendorList;
}
function getVendorCss(){
    'use strict';
    const cssVendorList = [
        path.join(rootPath, 'normalize-css/normalize.css'),
        path.join(rootPath, 'bootstrap/dist/css/bootstrap.min.css'),
        path.join(rootPath, 'bootstrap/dist/css/bootstrap-theme.min.css'),
        path.join(rootPath, 'font-awesome/css/font-awesome.css')
    ];
    cssVendorList.forEach((elem) =>{
        log.info('path: %s', elem);
    });
    return cssVendorList;
}

module.exports = {
    getJs: getVendorJs,
    getCss: getVendorCss
};
