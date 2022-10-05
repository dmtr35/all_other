import Router from 'express'
import User from "../models/User.js"


const userRouter = new Router()



userRouter.get('/user', async(req, res) => {
    const user = await User.find({})
    res.json(user)
})

userRouter.post('/user', async(req, res) => {
    const {firstName, lastName, age} = req.body
    const user = await User.create({firstName, lastName, age})
    res.json(user)
})

userRouter.put('/user/:id/update', async(req, res) => {
    
    const userId = req.params.id
    const updatData = req.body
    const updetedUser = await User.findByIdAndUpdate(userId, updatData, { new: true })
    res.json(updetedUser)
})











export default userRouter
