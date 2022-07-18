const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => process.stdout.write(`Auth on port ${PORT}`));
