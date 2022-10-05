import Router from "express";
import controller from "../controllers/user-controller.js"
import { body } from 'express-validator'
import middl from '../middlewaree/middleware.js'
import roleMiddl from '../middlewaree/roleMiddleware.js'
const router = new Router() 




router.post('/registration', 
    body('username', "Имя пользователя не может быть пустым").notEmpty(),
    body('password', "Пароль минимум 4, максимум 32 символа.").isLength({min: 4, max: 32}),
    controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddl('ADMIN'), controller.getUsers)
router.post('/create', controller.create)

export default router









