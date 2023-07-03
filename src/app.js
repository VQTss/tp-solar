const express = require('express');
const crypto = require('crypto');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const routers = require('./routes/index');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers

app.use(routers);


module.exports = app;