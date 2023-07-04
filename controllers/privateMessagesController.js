require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pMessages =  require('../models/privateMessages')
const User = require('../models/user')
//privateMessages

exports.sendPrivateMessage = async (req,res) => {
    try {

        const sendingUser = await User.findOne({'_id':req.user._id})
        req.body.sender = sendingUser.username
        const message = await pMessages.create(req.body)
        console.log('message ',message)

        const receivingUser =  await User.findOne({'_id':req.params.id})

        console.log('receiving user', receivingUser.username)
        console.log('sending user',sendingUser.username)

        sendingUser.chats.addToSet(`${message.sender}: ${message.text}`)
        await sendingUser.save()

        receivingUser.chats.addToSet(`${message.sender}: ${message.text}`)
        await receivingUser.save()

        res.json(sendingUser.chats)

    } catch (error) {
        res.json({message:error.message})
    }
}

exports.seeChats  = async (req,res)=>{
    try {
        const foundUserChats = await User.findOne({'_id':req.user.id})
        res.json(foundUserChats.chats)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}