import express from 'express'
import mongoose from 'mongoose'
import Post from './Post.js'
import cors from 'cors'


const PORT = 5000
const DB_URL = 'mongodb+srv://root:root@cluster0.hnmws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



const app = express()

app.use(express.json())
app.use(cors())


app.post('/create', async(req, res) => {
    try {
        const {taskTitle, taskBody} = req.body
        const post = await Post.create({taskTitle, taskBody})
        res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})

app.get('/', async(req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
})

app.get('/:id', async(req, res) => {
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


app.put('/', async(req, res) => {
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


app.delete('/:id', async(req, res) => {
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
        app.listen(5000, () => console.log(`Server working, port: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()



















