'use strict'
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const log = require('./util/logger');
//route files
const index = require('./components/index/index.route');

const timestamp = require('./components/timestamp/timestamp.route');

const app = express();
//folders containing view files
const viewFolders = [
    path.join(__dirname, 'components/shared/'),
    path.join(__dirname, 'components/timestamp/'),
    path.join(__dirname, 'components/index/')
];
// view engine setup
app.set('views', viewFolders);
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/scripts', express.static(path.join(__dirname, '../node')))

//define routes
app.use('/', index);
app.use('/timestamp', timestamp);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
