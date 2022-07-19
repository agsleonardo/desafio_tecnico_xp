const express = require('express');
const swaggerUi = require('swagger-ui-express');
const router = require('./auth.routes');
const swaggerDocs = require('./swagger.json');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use(router);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, _req, res, next) => {
  if (err) {
    res.status(401).json();
  }
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => process.stdout.write(`\nAuth on port ${PORT}\n`));
