import Post from "./Post.js"
import fileService from "./fileService.js"

class PostService {                                 // создаем здесь класс
    async create(post, picture) {
        const fileName = fileService.saveFile(picture)
        const createdPost = await Post.create({...post, picture: fileName})  // присваеваем созданый пост которому уже был присвоен id
        return createdPost
    }

    async getAll() {
        const posts = await Post.find()
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
            const post = await Post.findById(id)
            return post
    }

    async update(post) {
        if (!post._id) {
            throw new Error('Id не указан')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})  // вернется обновленная версия поста
        return updatedPost
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}





export default new PostService()                   // экспортируем обьект созданый из этого класса

