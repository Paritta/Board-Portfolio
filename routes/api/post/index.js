const router = require('express').Router()
const controller = require('./post.controller')
const authMiddleware = require('../../../middlewares/auth')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch')

// let token = localStorage.getItem('token')
// console.log(token);


router.get(`/index`, authMiddleware)
router.get(`/index`, controller.index)
// router.get('/index', controller.index)
router.get('/add', controller.add)
router.get('/detail/:id', controller.detail)
router.get('/delete/:id', controller.delete)
router.get('/updatePage/:id', controller.updatePage)
router.get('/update/:id', controller.update)
router.post('/write', controller.write)

module.exports = router