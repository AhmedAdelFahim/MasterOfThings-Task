const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const validators = require('../middlewares/validators')

/*
url: /auth/users/signup
request : { firstName: '', lastName:'', userName:'', city:'', password:'', email:'', dateOfBirth:'' }
response {message:"You Registered Successfully." }
 */
router.post("/users/signup", [validators.signUpValidator], authController.signup);

/*
return user's name and sesssion id
url: /auth/users/signin
request : { email: '', password: '' }
response { name: '', sessionId: '' }
 */
router.post("/users/signin", authController.signin);

module.exports = router
