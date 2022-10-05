// const {Schema, model} = require('mongoose')                      // импортируем схему и модель из пакета 'mongoose'
import mongoose from 'mongoose'

// const UserSchema = new Schema({ 
const UserSchema = new mongoose.Schema({                                 // создаем схему, схема описывает какие поля будет содержать сущьность пользователя.  Передаем обьект и какие поля будут у пользователя
    email: {type: String, unique: true, required: true},         // ?email типа String, unique: true - поле должно быть уникальным, required: true - поле дожно быть обязательным
    password: {type: String, required: true},                    // password: строка, не уникальна, required: true -обязательное поле
    isActivated: {type: Boolean, default: false},                // isActivated (свидетельствует о том подтвердим пользователь почту или нет), default: false - если юзер почту подтвердил делаем поле true
    activationLink: {type: String},                              // activationLink (храним ссылку для активации) (строковое необязательное значение)
})

export default mongoose.model('User', UserSchema)                       // из этого файла экспортируем модель которую создаем на основании схемы которую мы сделали. (первый параметр название модели, а вторым передаем схему)












