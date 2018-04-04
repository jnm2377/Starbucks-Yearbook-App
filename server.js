const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const db = mongoose.connection;
require('pretty-error').start();
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/Starbucks';
const PORT = process.env.PORT || 1990;

//set mongoose Promise Library
mongoose.Promise = global.Promise;
//Connect to Mongo
mongoose.connect(mongoURI);

//Error/Success
db.on('error', (err) => console.log(err.message + 'is Mongod Running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
//open the connection to mongo
db.on('open', ()=> {});


//Routes
const usersController = require('./controllers/usersController');
const sessionsController = require('./controllers/sessionsController');
const regularsController = require('./controllers/regularsController');
const baristasController = require('./controllers/baristasController');


//Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(session({
  secret: "homestarrunner.net... it's dot com!",
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}))

//enable controllers
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/regulars', regularssController);
app.use('/baristas', baristasController);


app.listen(PORT, () => {
  console.log("CONNECTED TO THE PAST: ", PORT);
}
