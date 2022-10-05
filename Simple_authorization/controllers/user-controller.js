import 'dotenv/config'
import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

const generateAccessToken = (id, roles) => {       // передаем id, roles чтобы спрятать туда эту информацию. эта информация называется payload
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY_RANDOM, { expiresIn: '1d' })
}




class UserController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }


            const { username, password } = req.body
            const candidate = await User.findOne({username})          // проверяем есть ли в баде такой username
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: userRole.value})
            await user.save()                                            // сохранили пользователя в базу данных
            return res.json({message: 'Пользователь был успешно зарегистрирован'})
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Registration errore'})
        }
    }


    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({username})
            
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден.`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Registration errore'})
        }
    }


    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch(e) {
            console.log(e);
            
        }
    }



    async create(req, res) {
        try {
            // const userRole = new Role()
            // const adminRole = new Role({value: "ADMIN"})
            const { username, password, roles } = req.body
            const user = await User.create({ username, password, roles })
            res.json(user)
        } catch(e) {
            console.log(e);
            
        }
    }




}


export default new UserController()








