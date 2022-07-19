const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const swaggerDocs = require('./swagger.json');

const model = require('./customer.model');

const app = express();
const routes = require('./customer.routes');

app.use(logger('dev'));
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    res.status(status || 500).send({ message });
  }
  next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`\nCustomer on port ${PORT}\n`));
