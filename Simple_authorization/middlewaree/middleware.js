import 'dotenv/config'
import jwt from 'jsonwebtoken'




function middl(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]       // вытащим токен из заголовка. берем только вторую часть токена (без слова bearer) делим строку на две части по пробулу и берем вторую часть
        if (!token) {
            return res.status(403).json({massege: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, process.env.SECRET_KEY_RANDOM)    // в decodedData лежит обьект с id и roles, тот самый payload
        req.user = decodedData                           // чтобы использовать эти данные в других функциях, в запросе создаем новое поле user и туда добавляем эти данные
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({massege: "Пользователь не авторизован"})
    }


}

export default middl


