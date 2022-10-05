import mongoose from 'mongoose'


const Post = new mongoose.Schema({
    taskName: {type: String, required: true},
    taskValue: {type: String, required: true},
})



export default mongoose.model('Post', Post)










