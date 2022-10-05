require('dotenv').config()                               // чтобы прочитать .env инпортируем в index.js пакет которы мы только что установили (строка 33) и вызываем функцию config()
const express = require('express')                     // импортируем express
const cors = require('cors')                           // импортируем cors
const cookieParser = require('cookie-parser')          // импортируем cookieParser
const mongoose = require('mongoose')
const router = require('./router/index.js')                                    // сюда импортируем из папки router
const errorMiddleware = require('./middlewares/error-middleware')  // middlewares ошибок должен идти последним в цепочке подключенных middlewares

const PORT = process.env.PORT || 5000                   // отдельная переменная для порта. для того чтобы получить значения из config()(строка 1) мы обращаемся "process.env.PORT ||"
const app = express()                                   // создаем экземпляр нашего приложения

app.use(express.json())                                        // подключаем Middleware
app.use(cookieParser())                                        // 
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))                                                // 
app.use('/api', router)                                          // у app вызываем функцию use(первым параметром маршрут по которому router будет отрабатывать, вторым сам router))
app.use(errorMiddleware)

const start = async () => {                                                           // запускаем приложение внутри асинхронной функции  
    try {
        await mongoose.connect(process.env.DB_URL, {                                    // подключаемся к базе данных, await - асинхронный процес. функцию connect параметром передаем DB_URL
            useNewUrlParser: true,                                          // просто указываем
            useUnifiedTopology: true                                        // просто указываем    
        })
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))       // прослушивать (5000 порт, функция калбек выведит сообщение если сервер успешно запустился)
    } catch (e) {
        console.log(e);
    }
}

start()




// переходим в >server в терминале, устанавливаем модуль 'npm i dotenv' , он предназначен для конфигураций, в корне проэкта создаем файл ".env"








