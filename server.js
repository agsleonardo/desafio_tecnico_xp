const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 10000;
const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3000/';
const CUSTOMER_URL = process.env.CUSTOMER_URL || 'http://localhost:4000/';
const ACCOUNTS_URL = process.env.ACCOUNTS_URL || 'http://localhost:5000/';

app.use(logger('dev'));

app.use('/auth', httpProxy(AUTH_URL));

app.use('/customers', httpProxy(CUSTOMER_URL));

app.use('/accounts', httpProxy(ACCOUNTS_URL));

app.use('/*', (_req, res) => res.status(404).send('Bad Route!'));

app.use(express.json());
 
app.listen(PORT, () => {
    console.log('API Gateway running!');
});