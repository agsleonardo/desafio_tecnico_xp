const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger');
const model = require('./accounts.model');
const router = require('./accounts.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
    res.status(status || 500).send({ message });
  }
  next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`\nAccounts on port ${PORT}\n`));
