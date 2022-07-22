const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.get('/login', auth.login);

router.get('/', auth.validateRequest);

module.exports = router;
