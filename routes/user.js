const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

/*
return last login dates
url: /users
request header : { session-id: '' }
response { userName: '', lastLoginDate: [] }
 */
router.get("/",[authMiddleware.auth], userController.getLastLoginTime );

module.exports = router
