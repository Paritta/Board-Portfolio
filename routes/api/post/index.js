const router = require('express').Router()
const controller = require('./post.controller')

router.get('/index', controller.index)
router.get('/add', controller.add)
router.get('/detail/:id', controller.detail)
router.get('/delete/:id', controller.delete)
router.post('/write', controller.write)

module.exports = router