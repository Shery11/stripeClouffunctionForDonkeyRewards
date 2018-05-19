const functions = require('firebase-functions');


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors')

var app = express();



//connect to our local database
// mongoose.connect('mongodb://localhost/cbtat', function (err) {
//     if (err) {
//         console.log('Not connected to the database : ' + err);
//     }
//     else {
//         console.log('Connected successfully to mongoDB');
//     }
// });

mongoose.connect('mongodb://shery:welcome@ds219100.mlab.com:19100/cbtats');


//init app


var port = process.env.PORT || 3000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

app.use(cors());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(path.join(__dirname, 'public'))); // set the static files location /public/img will be /img for users

//these are like interceptors, they gonna look at the request before any1 else.
app.use(cookieParser());


// routes ==================================================
//require('./routes/router')(app); // pass our application into our routes

var usersRoute = require('./app/routes/users.js');
var projectRoute = require('./app/routes/project.js');
var taskRoute = require('./app/routes/tasks.js');
var UserActivityRoute = require('./app/routes/user_activity.js');

//send app and passport to our social file
require('./app/passport/passport')(app,passport);

app.use('/users/', usersRoute);
app.use('/project/',projectRoute);
app.use('/task/',taskRoute);
app.use('/userActivity/',UserActivityRoute);


// start app ===============================================
// app.listen(port);
// console.log('Magic happens on port ' + port);           // shoutout to the user
// exports = module.exports = app;                         // expose app


exports.cbtat = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.cbtat = functions.https.onRequest((request, response) => {
//    response.send("Hello from Firebase!");
// });
