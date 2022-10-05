// const Router2 = require('express').Router
// const postController = require('../controllers/post-controller')      // импортируем контроллер из ../controllers/user-controller
// const router2 = new Router2()

import Router2 from 'express'
import postController from '../controllers/post-controller.js'
const router2 = new Router2()


router2.post('/create', postController.create)
router2.get('/get/:userId', postController.get)
router2.post('/update', postController.update)
router2.delete('/delete/:id', postController.delete)









export default router2