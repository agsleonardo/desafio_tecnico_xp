const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
require('dotenv').config();

const PORT = process.env.PORT || 10000;
const AUTH_URL = process.env.AUTH_URL;
const CUSTOMER_URL = process.env.CUSTOMER_URL;
const ACCOUNTS_URL = process.env.ACCOUNTS_URL;
const ORDERS_URL = process.env.ORDERS_URL;
const STOCKS_URL = process.env.STOCKS_URL;
const WALLETS_URL = process.env.WALLETS_URL;

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

app.use('/orders', httpProxy(ORDERS_URL));

app.use('/wallets', httpProxy(WALLETS_URL));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/*', (_req, res) => res.status(404).send('Bad Route!'));

app.use(express.json());
 
app.listen(PORT, () => {
    console.log('API Gateway running!');
});