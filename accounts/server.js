const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger.json');
const model = require('./accounts.model');
const router = require('./accounts.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
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
