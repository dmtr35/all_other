// чтобы контроллер небыл толстым, всю логику будем выносить в Service. У нас будет три Service.
// Service для рабаты с пользователями, создание, удаление, поиск и тд


// const UserModel = require('../models/user-model')         // импортируем модель пользователя которую создавали (../models/user-model)
// const bcrypt = require('bcrypt')                           // импортируем в этот файл bcrypt
// const uuid = require('uuid')                               // импортируем uuid
// const mailService = require('./mail-service')              // импортируем mailService
// const tokenService = require('./token-service')            // 
// const UserDto = require('../dtos/user-dto')
// const ApiError = require('../exceptions/api-error')

import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'



class UserService {
    async registration(email, password) {                                               // асинхронная функция для регистрации пользователя. параметры принимает email, и password(который мы будем получать в теле запроса)
        const candidate = await UserModel.findOne({ email })                               // убеждаемся что в базе данных с таким email нет записи, findOne осуществит поиск по полю email
        if (candidate) {                                                                 // делаем проверку, если candidat не равен null(в нем что то находится), то мы пробрасываем ошибку
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)                               // сейчас идет регистрация password который юзер написал в форме, но нам такое не подходит, мы password захешируем. для этого обращаемся к bcrypt и вызываем параметр hash(password, salt)
        const activationLink = uuidv4()          // нужно указать ссылку по которой пользователь будет активировать аккаунт и подтверждать что email принадлежит ему // uuid.v4() вернет нам рандомную уникальную строку
        const user = await UserModel.create({ email, password: hashPassword, activationLink })              // если условие не выполнилось, то создаем пользователя и сохраняем его в базу данных. вызываем create и передаем туда {email, password}. пороль сначала нужно закодоровать. // передаем уже захешированый password
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)      // вызываем функцию из ('../mail-service') (email, пока что activationLink)
        
        const userDto = new UserDto(user)                                               // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)                   // refreshToken нужно сохранить в базу данных, (id пользователя, refreshToken)

        return {...tokens, user: userDto}                                       // возвращаем обьект, в него добавляем ACCESS и REFRESH токен(разворачиваем обьект tokens) и Dto (следом за токеном будем отправлять информацию о пользователе)
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некоректная сылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEqals = await bcrypt.compare(password, user.password)      // сравниваем пароль пользователя с захешированым паролем который хранится в базе данных. у bcrypt функция compare(пароль, пароль из базы данных который захешированый)
        if (!isPassEqals) {                                                    // если пароли не совпадают
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }



}

// module.exports = new UserService()                         // Service это просто class и из файла мы экспортируем экземпляр этого class
export default new UserService()                         // Service это просто class и из файла мы экспортируем экземпляр этого class




/*
закодировать пароль. устанавливим еще несколько модулей
jsonwebtoken для генерации JWT и bcrypt 
так же установим uuid для генерации рандомных строк, их мы будем привязывать к ссылке для активации аккаунта которую мы будем отправлять на почту.
server>npm i jsonwebtoken bcrypt uuid
*/










