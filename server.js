const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
 
app.use(logger('dev'));

app.use('/customer', httpProxy('http://localhost:4000/'));

app.use('/auth', httpProxy('http://localhost:3000/'));

app.use(express.json());
 
app.listen(10000, () => {
    console.log('API Gateway running!');
});