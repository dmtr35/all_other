import mongoose from 'mongoose'


const Post = new mongoose.Schema({
    taskTitle: {type: String, required: true},
    taskBody: {type: String, required: true},
})



export default mongoose.model('Post', Post)









