const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

winston.level = process.env.LOG_LEVEL || 'error';

winston.info('logger level: %s', process.env.LOG_LEVEL);
const srcRootPath = 'node_modules/';
const destRootPath = './server/public/vendor/';

const vendorJS = [
    path.join(srcRootPath, 'jquery/dist/jquery.js'),
    path.join(srcRootPath, 'jquery-ui/build/release.js'),
    path.join(srcRootPath, 'bootstrap/dist/js/bootstrap.js')
];
const vendorCss = [
    path.join(srcRootPath, 'bootstrap/dist/css/bootstrap.css'),
    path.join(srcRootPath, 'bootstrap/dist/css/bootstrap-theme.css'),
    path.join(srcRootPath, 'font-awesome/css/font-awesome.css')
];
const fonts = [path.join(srcRootPath, 'font-awesome/fonts')];

vendorJS.forEach(copyFile);
vendorCss.forEach(copyFile);
fonts.forEach(copyDir);

function copyDir(dirPath){
    'use strict';
    winston.info('Copy Dir called for ' + dirPath);
    const dirName = dirPath.substring(dirPath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dirName;
    console.log(destPath);
    performCopy(dirPath, destPath);
}
function copyFile(filePath){
    'use strict';
    winston.info('copying file %s', filePath);
    const dir = filePath.substring(filePath.length - 2) === 'js' ? 'js/': 'css/';
    winston.info('directory name: %s', dir);
    const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dir + fileName;
    winston.info('full destination path %s', destPath);
    performCopy(filePath, destPath);
}
function performCopy(srcPath, destPath){
    'use strict';
    winston.info('performing copy from %s to %s', srcPath, destPath);
    console.log('performing copy from ' + srcPath + ' to ' + destPath);
    fs.copy(srcPath, destPath, function (err) {
        if(err){
            winston.error('An error has occurred.', err);
        }else{
            winston.info('file copied successfully');
        }
    })
}


