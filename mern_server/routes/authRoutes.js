const express = require('express')
const auth_route = express.Router();
const path = require('path')
auth_route.use(express.static('public'));
const auth = require('../middleware/auth') 


const authController = require('../controllers/authController')
// for user register (jwt token is not required)
auth_route.post('/register',authController.registerUSer )
// for user login
auth_route.post('/login',authController.userlogin)
// for forgot password
auth_route.post('/forgot-password',authController.forgotpassword)
// for resetpassword
auth_route.post('/reset-password',authController.resetPassword)

module.exports = auth_route;