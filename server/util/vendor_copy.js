const fs = require('fs-extra');
const path = require('path');

const log = require('./logger');



const srcRootPath = 'node_modules/';
const destRootPath = './server/public/vendor/';

const vendorJS = [
    path.join(srcRootPath, 'jquery/dist/jquery.js'),
    path.join(srcRootPath, 'jquery-ui-dist/jquery-ui.js'),
    path.join(srcRootPath, 'bootstrap/dist/js/bootstrap.js')
];
const vendorCss = [
    path.join(srcRootPath, 'normalize.css'),
    path.join(srcRootPath, 'bootstrap/dist/css/bootstrap.css'),
    path.join(srcRootPath, 'bootstrap/dist/css/bootstrap-theme.css'),
    path.join(srcRootPath, 'font-awesome/css/font-awesome.css')
];
const fonts = [path.join(srcRootPath, 'font-awesome/fonts'), path.join(srcRootPath, 'bootstrap/fonts')];

vendorJS.forEach(copyFile);
vendorCss.forEach(copyFile);
fonts.forEach(copyDir);

function copyDir(dirPath){
    'use strict';
    log.info('Copy Dir called for ' + dirPath);
    const dirName = dirPath.substring(dirPath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dirName;
    //console.log(destPath);
    performCopy(dirPath, destPath);
}
function copyFile(filePath){
    'use strict';
    log.info('copying file %s', filePath);
    log.info('the index of \'node_modules\' is %s', filePath.indexOf('node_modules'));
    if(filePath.indexOf('node_modules') !== -1){
        filePath = filePath.substring(filePath.indexOf('node_modules') + 'node_modules'.length);
        log.info(filePath);
    }
    const dir = filePath.substring(filePath.length - 2) === 'js' ? 'js/': 'css/';

    log.info('directory name: %s', dir);
    const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dir + fileName;
    log.info('full destination path %s', destPath);
    performCopy(filePath, destPath);
}
function performCopy(srcPath, destPath){
    'use strict';
    log.info('performing copy from %s to %s', srcPath, destPath);
    //console.log('performing copy from ' + srcPath + ' to ' + destPath);
    fs.copy(srcPath, destPath, (err) => {
        if(err)
            log.error('An error has occurred.', err);
        else
            log.info('file copied successfully');
    })
}

function buildNormalizePath(){
    'use strict';
    let outerDir = path.dirname(path.join(srcRootPath, 'normalize.css'));
    log.info('normalize path: %s ',  path);
}
//buildNormalizePath();


