const fs = require('fs-extra');
const path = require('path');

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
    const dirName = dirPath.substring(dirPath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dirName;
    console.log(destPath);
    performCopy(dirPath, destPath);
}
function copyFile(filePath){
    'use strict';
    const dir = filePath.substring(filePath.length - 2) === 'js' ? 'js/': 'css/';
    console.log(dir);
    const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
    const destPath = destRootPath + dir + fileName;
    console.log(destPath);
    performCopy(filePath, destPath);
}
function performCopy(srcPath, destPath){
    'use strict';
    console.log('performing copy from ' + srcPath + ' to ' + destPath);
    fs.copy(srcPath, destPath, function (err) {
        if(err){
            console.log(err);
        }else{
            console.log('success');
        }
    })
}


