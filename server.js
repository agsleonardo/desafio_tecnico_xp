const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
 
app.use(logger('dev'));

app.use('/auth', httpProxy('http://localhost:3000/'));

app.use('/customers', httpProxy('http://localhost:4000/'));

app.use('/accounts', httpProxy('http://localhost:5000/'));

app.use('/*', (req, res) => res.status(404).send('Bad Route!'));

app.use(express.json());
 
app.listen(10000, () => {
    console.log('API Gateway running!');
});