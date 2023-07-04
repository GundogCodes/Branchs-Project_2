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

        sendingUser.chats.sender = receivingUser.username
        sendingUser.chats.text = `me: ${message.text}`

        receivingUser.chats.sender = sendingUser.username
        receivingUser.chats.text = `${sendingUser.username}: ${message.text}`

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
        console.log(req.body.id)
        const foundUserChats = await User.findOne({'_id':req.user.id})
        res.json(foundUserChats.chats)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}