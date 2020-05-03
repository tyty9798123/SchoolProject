var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/users/signup');
var logoutRouter = require('./routes/users/logout');
var express_ejs_extend = require('express-ejs-extend');
var loginRouter = require('./routes/users/login');
var managementRouter = require('./routes/management');
var mongoose = require('mongoose');
var mysql = require('./connections/mysql');
var captchaRouter = require('./routes/captcha');
const passport = require('./OAuth/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用 express-session
app.use(session({
  secret : 'keyboard cat',
  resave : true,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
app.engine('ejs', express_ejs_extend); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/management', managementRouter);
app.use('/captcha', captchaRouter);
//DB
var db = require("./connections/mongoose").mongoURI;

//Connect
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology : true})
.then(function(){
    console.log("MongoDB Connected")
})
.catch(function(err){
    console.log(err);
})

app.get('/', (req,res) => {
    res.send("Hello World");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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