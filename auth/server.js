const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const router = require('./auth.routes');
const swaggerDocs = require('./swagger');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(cors());
  next();
});
app.use(express.json());
app.use(router);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, _req, res, next) => {
  if (err) {
    return res.status(401).json({ message: err.message });
  }
  return next();
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => process.stdout.write(`\nAuth on port ${PORT}\n`));
