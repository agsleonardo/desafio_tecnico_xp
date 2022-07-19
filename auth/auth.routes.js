const express = require('express');
const validateRequest = require('./auth');

const router = express.Router();

router.get('/', validateRequest);

module.exports = router;
