const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger');
const router = require('./wallets.routes');
const model = require('./wallets.model');
const allowRequest = require('./middlewares/auth');

const app = express();

const PORT = process.env.PORT || 8100;

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
app.use(allowRequest, router);

app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    return res.status(status || 500).send({ message });
  }
  return next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`\nWallets on port ${PORT}\n`));
