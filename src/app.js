const express = require('express');
const crypto = require('crypto');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const routers = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// body-parser
app.use(bodyParser.json());

// Cors
app.use(cors());


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan

app.use(morgan('dev'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Routers

app.use(routers);


module.exports = app;