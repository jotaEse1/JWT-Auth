const express = require('express');
const router = express.Router()
const { signin, login } = require('../validator/valdiator')
const {signIn, logIn, checkToken, logOut} = require('../controllers/autentication')

//routes
router.route('/signin').post(signin, signIn)
router.route('/login').post(login, logIn)
router.route('/refresh_token').post(checkToken)
router.route('/logout').post(logOut)


module.exports = router;