const express = require('express');
require('express-async-errors');
const cors = require('cors');
const model = require('./customer.model');

const app = express();
const routes = require('./customer.routes');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    res.status(status || 500).send({ message });
  }
  next();
});

model.recreateDatabase();
app.listen(PORT, () => process.stdout.write(`Customer on port ${PORT}`));
