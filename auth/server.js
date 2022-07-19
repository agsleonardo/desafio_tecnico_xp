const express = require('express');
const router = require('./auth.routes');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use(router);

app.use((err, _req, res, next) => {
  if (err) {
    res.status(401).json({ message: err.message });
  }
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => process.stdout.write(`Auth on port ${PORT}`));
