const express = require('express');
const crypto = require('crypto');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const routers = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');



// Cors
// app.use(cors({
//     // origin: '*'
// }));

app.use(cors());

app.use(cookieParser());

// body-parser
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));

// Morgan

app.use(morgan('dev'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Routers

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use(routers);


module.exports = app;