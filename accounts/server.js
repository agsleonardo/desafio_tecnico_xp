const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger');
const model = require('./accounts.model');
const router = require('./accounts.routes');

const app = express();

const PORT = process.env.PORT || 5100;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(cors());
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    return res.status(status || 500).send({ message });
  }
  return next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`\nAccounts on port ${PORT}\n`));
