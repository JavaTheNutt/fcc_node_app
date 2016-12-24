const gulp  = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssMin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');
const pump = require('pump');

const config = require('./server/app.config');
const log = require('./server/util/logger');

gulp.task('build', ['minifyVendorScripts','minifyVendorCss','fonts', 'minifyCustomJs', 'minifyCustomCss'], ()=>{
    'use strict';
    log.info('app built');
});
gulp.task('fonts', () => {
    'use strict';
    log.info('moving fonts');
    return gulp.src(config.getFonts())
        .pipe(gulp.dest('server/dist'))
});
gulp.task('scripts', ['vendorScripts', 'minifyCustomJs'], ()=>{
    'use strict';
    log.info('scripts task running');
});
gulp.task('minifyVendorScripts', ['concatVendorScripts'], () =>{
    'use strict';
    return gulp.src('server/.tmp/vendor.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('server/dist'))
});
gulp.task('concatVendorScripts', () =>{
    'use strict';
    log.info('copy task running');
    return gulp.src(config.getJs())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('server/.tmp'));
});
gulp.task('concatVendorCss', () => {
    'use strict';
    return gulp.src(config.getCss())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('server/.tmp'))
});
gulp.task('minifyVendorCss', ['concatVendorCss'], () => {
    'use strict';
    return gulp.src('server/.tmp/vendor.css')
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('server/dist'))

});
gulp.task('concatCustomJs', () =>{
    'use strict';
    return gulp.src('server/public/javascripts/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('server/.tmp'))
});
gulp.task('minifyCustomJs',['concatCustomJs'], (cb) =>{
    'use strict';
    log.info('custom scripts task running');
    pump([
        gulp.src('server/.tmp/app.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('server/dist')
         ],
    cb)
});
gulp.task('minifyCustomCss', ['concatCustomCss'], ()=>{
    'use strict';
    log.info('minfy custom css task running');
    return gulp.src('server/.tmp/app.css')
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('server/dist'))
});
gulp.task('concatCustomCss', ()=>{
    'use strict';
    log.info('custom css task running');
    return gulp.src('server/public/stylesheets/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('server/.tmp'))
});
gulp.task('clean', () => {
    'use strict';
    log.info('running clean task');
    clean('server/.tmp');
    clean('server/dist');
});
function clean(path){
    'use strict';
    log.info('running delete task for: %s', path);
    del(path).then(paths => {
        log.info('deleted files and folders:\n', paths.join('\n'));
    })
}

