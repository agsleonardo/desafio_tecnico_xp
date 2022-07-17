const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => process.stdout.write(`Customer on port ${PORT}`));