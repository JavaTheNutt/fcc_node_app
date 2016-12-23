const gulp  = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');

const config = require('./server/app.config');
const log = require('./server/util/logger');

gulp.task('scripts', ['vendorScripts', 'minifyCustomJs'], ()=>{
    'use strict';
    log.info('scripts task running');
});

gulp.task('vendorScripts', () =>{
    'use strict';
    log.info('copy task running');
    return gulp.src(config.getJs())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('server/dist'));
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
        gulp.dest('server/dist')
         ],
    cb)
});


