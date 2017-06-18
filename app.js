var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var index = require('./routes/index');
var api = require('./routes/api');
var mongoose = require('mongoose');
var exec = require('child_process').exec;

exec('node ./node_modules/handlebars/bin/handlebars public/library/daw/templates -f public/library/daw/templates/__templates.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log('Creating __templates.js');
});





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(session({
    secret: 'thisisoursupersecretkeylolxdxd1234',
    maxAge: new Date(Date.now() + 3600000), //how long we store app session cookie
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(app, passport);
require('./routes/auth')(app, passport);

app.use('/', index);
app.use('/api', api);

var port = process.env.PORT || 8000;

var server = http.createServer(app).listen(port, function () {
    console.log("server started at port" + port);
});
var io = require('socket.io')(server);

var socketEvents = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.join("openmsc");

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};
socketEvents(io);
app.io = io;






// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;
