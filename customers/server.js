const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger');
const allowRequest = require('./middlewares/auth');
const model = require('./customer.model');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(cors());
  next();
});
const routes = require('./customer.routes');

app.use(logger('dev'));
const PORT = process.env.PORT_CUSTOMERS || 4100;

app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(allowRequest, routes);

app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    return res.status(status || 500).send({ message });
  }
  return next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`\nCustomer on port ${PORT}\n`));
