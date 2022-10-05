import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
})

export default mongoose.model('User', User)









