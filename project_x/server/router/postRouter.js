import Router from 'express'
import Post from "../models/Post.js"

const postRouter = new Router()                                                           //?new



postRouter.get('/posts/:id', async(req, res) => {
    const id = req.params.id                                                                // params.id передаем id из передаваемого обьекта
    const posts = await Post.findOne({_id:id}).populate("author")                           // findOne вытаскиваем id строкой.   populate подставляем данные в author
    res.json(posts)
})

postRouter.post('/arr/posts', async(req, res) => {
    const arrPosts = req.body
    
    const post = await Post.insertMany(arrPosts)                                               // передаем несколько обьектов в массиве
    res.json('okey')
})

postRouter.get('/posts', async(req, res) => {
        const posts = await Post.find({}).populate('author')
    res.json(posts)
})

postRouter.post('/posts', async(req, res) => {
    const {author, title, content, picture} = req.body                                           // передаем весь обьект
    const post = await Post.create({author, title, content, picture})                        // присваеваем строки из передаваемого обьекта в наши переменные
    res.json('oks')
})

postRouter.put('/posts/:id/update', async(req, res) => {
    const postId = req.params.id                                                              // передаем id
    const updatData = req.body                                                                // передаем обьект
    const updetedPost = await Post.findByIdAndUpdate(postId, updatData, { new: true })        // ищем по id и заменяем значения {возвращаем измененный обьект}
    res.json(updetedPost)
})

postRouter.delete('/posts/:id/delete', async(req, res) => {
        const postId = req.params.id                                                           // передаем id
        const deletePosts = await Post.findByIdAndDelete(postId)                               // ищем по id и удалить
        console.log(deletePosts)
        if (!deletePosts) {
            return res.status(404).send('not found')
        }
        res.json('ok')
    })


export default postRouter















