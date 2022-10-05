import 'dotenv/config'
import express from "express"
import mongoose from 'mongoose'
import router from './router/router.js'




const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use('/api', router)













const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 
        app.listen(PORT, () => console.log(`Server working, PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
        
    }
}



start()














