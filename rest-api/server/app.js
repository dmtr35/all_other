import express from 'express'
import mongoose from 'mongoose'
import Post from './Post.js'
import cors from 'cors'
import 'dotenv/config'



const PORT = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://root:root@cluster0.hnmws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



const app = express()

// app.use(express.static(__dirname, 'public'))
app.use(express.json())
app.use(cors())


app.post('/create', async(req, res) => {
    try {
        const {taskName, taskValue} = req.body
        const post = await Post.create({taskName, taskValue})
        res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})

app.get('/get/', async(req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
})

app.get('/get/:id', async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            res.status(400).json({messege: 'Id не указан'})
        }
        const post = await Post.findById(id)
        return res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})


app.put('/update', async(req, res) => {
    try {
        const post = req.body
        if (!post._id) {
            res.status(400).json({messege: 'Id не указан'})
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return res.json(updatedPost)
    } catch (e) {
        res.status(500).json(e)
    }
})


app.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            res.status(400).json({messege: 'Id не указан'})
        }
        const post = await Post.findByIdAndDelete(id)
        
        return res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})



















async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server working, port: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()



















