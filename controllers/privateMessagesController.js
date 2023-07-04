require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pMessages =  require('../models/privateMessages')
const User = require('../models/user')
//privateMessages

exports.sendPrivateMessage = async (req,res) => {
    try {

        const sendingUser = await User.findOne({'_id':req.user._id})
        const receivingUser =  await User.findOne({'_id':req.params.id})
        req.body.sender = sendingUser.username
        const message = await pMessages.create(req.body)
        console.log('message ',message)

        sendingUser.contacts.addToSet(receivingUser.username)
        sendingUser.chats.addToSet(receivingUser.username)
        receivingUser.contacts.addToSet(message.sender)

        for(let name in sendingUser.contacts){
            if(name === receivingUser.username)
            sendingUser.contacts[receivingUser.username.name] = sendingUser.chats.addToSet(message.sender,`${message.sender}: ${message.text}`)
        }
        await sendingUser.save()
        
        receivingUser.chats.addToSet(message.sender,`${message.sender}: ${message.text}`)
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