const router = require('express').Router()
const controller = require('./post.controller')

router.get('/main', controller.routing)
router.get('/add', controller.add)

module.exports = router