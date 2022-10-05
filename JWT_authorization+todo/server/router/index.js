// const Router = require('express').Router                            // импортируем сюда Router из express
// const userController = require('../controllers/user-controller')      // импортируем контроллер из ../controllers/user-controller
// const router = new Router()                                         // создаем экземпляр роутера
// const {body} = require('express-validator')                         // устанавливаем npm i express validator. и берем от туда функцию body для валидации тела запроса
// const authMiddleware = require('../middlewares/auth-middleware')

import Router from 'express'
import userController from '../controllers/user-controller.js'
import {body} from 'express-validator'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = new Router() 


// обозначаем какие endpoint в приложении у нас будут:

router.post('/registration',
    body('email').isEmail(),                                                   // валидируем email
    body('password').isLength({min: 3, max: 32}),                              // валидируем пароль на кольчество символов
    userController.registration
    )                                                                          // post запрос для registration   // для маршрута registration вызываем функцию registration из userController (и так для всех endpoint) 
router.post('/login', userController.login)                                    // post запрос для login
router.post('/logout', userController. logout)                                 // post запрос для logout из акаунта. внутри этого endpoint будет refreshToken удалятся из базы данных
router.get('/activate/:link', userController.activate)                         // get запрос для activate акаунта по ссылке которая будет приходить на почту
router.get('/refresh', userController.refresh)                                // endpoint который будет refresh(перезаписывать) аксесТокен в случае если он умер. мы будем отправлять refreshToken и получать обратно аксесТокен и refreshToken
router.get('/users', authMiddleware, userController.getUsers)                  // тестовый endpoint, будем получать список пользователей. будет доступен только для авторизованых узеров


export default router                                // от сюда роутер експортируем в >server/index.js




















