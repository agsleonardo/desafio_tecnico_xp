const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 10000;
const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3100/';
const CUSTOMER_URL = process.env.CUSTOMER_URL || 'http://localhost:4100/';
const ACCOUNTS_URL = process.env.ACCOUNTS_URL || 'http://localhost:5100/';
const STOCKS_URL = process.env.STOCKS_URL || 'http://localhost:7100/';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
  });

app.use(logger('dev'));

app.use(express.json());

app.use('/auth', httpProxy(AUTH_URL));

app.use('/customers', httpProxy(CUSTOMER_URL));

app.use('/accounts', httpProxy(ACCOUNTS_URL));

app.use('/stocks', httpProxy(STOCKS_URL));

app.use('/*', (_req, res) => res.status(404).send('Bad Route!'));

app.use(express.json());
 
app.listen(PORT, () => {
    console.log('API Gateway running!');
});