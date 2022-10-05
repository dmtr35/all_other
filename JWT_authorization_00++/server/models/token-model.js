const {Schema, model} = require('mongoose')                      // импортируем схему и модель из пакета 'mongoose'

const TokenSchema = new Schema({                                  // создаем схему, схема для хранения refreshToken и id пользователя (сюда можно добавить ip-адрес с которого зашел пользователь)
    user: {type: Schema.Types.ObjectId, ref: 'User'},             // ссылка на пользователя, тип: ObjectId который достаем из схемы поле Types. это поле будет ссылаться на модель пользователя(ref: 'User')
    refreshToken: {type: String, required: true},                 // refreshToken : просто строка, обязательная. для него мы будем генерировать и сохранять в базе данных
})

module.exports = model('Token', TokenSchema)                       // из этого файла экспортируем модель которую создаем на основании схемы которую мы сделали. (первый параметр название модели, а вторым передаем схему)














