// const Post = require('../models/Post')
import Post from '../models/Post.js'




class PostController {
    async create(req, res) {
        try {
            const { taskName, taskValue, userId } = req.body
            const post = await Post.create({ taskName, taskValue, userId })
            // console.log(post);


            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async get(req, res) {
        try {
            const userId = req.params.userId
            const posts = await Post.find({userId})
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const post = req.body
            if (!post._id) {
                res.status(400).json({ messege: 'Id не указан' })
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ messege: 'Id не указан' })
            }
            const post = await Post.findByIdAndDelete(id)

            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}



// module.exports = new PostController()
export default new PostController()








