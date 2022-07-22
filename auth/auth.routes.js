const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.post('/login', auth.login);

router.post('/', auth.isAuthenticated);

module.exports = router;
