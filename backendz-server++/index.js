import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js"
import fileupload from 'express-fileupload'

const PORT = 5000
const DB_URL = 'mongodb+srv://root:root@cluster0.hnmws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.use(express.json())                                    // express по умолчанию не может преобразовать json формат
app.use(express.static('static'))
app.use(fileupload({}))
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopoLogy: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server connect PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()




















