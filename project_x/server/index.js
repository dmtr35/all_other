import express from 'express'
import mongoose from 'mongoose';
import postRouter from "./router/postRouter.js";
import userRouter from "./router/userRouter.js";
import cors from 'cors'

const PORT = 5000;
const DB_URL = 'mongodb+srv://test:test@cluster0.3u3xr.mongodb.net/project?retryWrites=true&w=majority'

const app = express()






app.use(cors())

app.use(express.json())          // для преобразования json формата
app.use('/api', postRouter)
app.use('/api', userRouter)




async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT) )

    } catch (e) {
        console.log(e);
    }
}

startApp()







