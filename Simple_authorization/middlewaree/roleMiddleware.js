import 'dotenv/config'
import jwt from 'jsonwebtoken'



function roleMiddl(roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]       // вытащим токен из заголовка. берем только вторую часть токена (без слова bearer) делим строку на две части по пробулу и берем вторую часть
            if (!token) {
                return res.status(403).json({ massege: "Пользователь не авторизован." })
            }
            const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY_RANDOM)
            let hasRole = false
            userRoles.split().forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({massege: "У вас нет доступа"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({ massege: "Пользователь не авторизован" })
        }

    }
}




export default roleMiddl







