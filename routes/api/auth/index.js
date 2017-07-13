const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middlewares/auth')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/check', authMiddleware)
router.get('/check', controller.check)
router.get('/loginpage', controller.loginpage)

module.exports = router