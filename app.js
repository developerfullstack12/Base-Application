
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Rout Setting
var indexRouter = require('./routes/index');
const { I18n } = require('i18n');
var cors = require('cors')
var mongoose = require('mongoose');


var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Locals setup
const i18n = new I18n({
  locales: ['en', 'hi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en'
})
app.use(i18n.init)

//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });



app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pages
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
