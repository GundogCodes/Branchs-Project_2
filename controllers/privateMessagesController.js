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

        sendingUser.contacts.addToSet(receivingUser.username,receivingUser.id)
        receivingUser.contacts.addToSet(message.sender,receivingUser.id)

        sendingUser.chats.name = receivingUser.username
        sendingUser.chats.messages.addToSet(message)
        receivingUser.chats.name = sendingUser.username
        receivingUser.chats.messages.addToSet(message)  

        //sendingUser.chats.addToSet(receivingUser.username)
        //receivingUser.chats.addToSet(message.sender)

        console.log('receiving User: ',receivingUser)
        console.log('sending User: ',sendingUser)

        await sendingUser.save()
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