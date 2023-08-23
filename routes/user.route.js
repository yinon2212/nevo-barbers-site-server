const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/add_user', UserController.add_user);

router.get('/get_hours', UserController.get_hours)

router.get('/get_users', UserController.get_users);


module.exports = router;