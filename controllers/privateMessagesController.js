require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pMessages =  require('../models/privateMessages')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/post')
//privateMessages

exports.sendPrivateMessage = async (req,res) => {
    try {
        const sendingUser = await User.findOne({'_id':req.user._id})
        const receivingUser =  await User.findOne({'_id':req.params.id})
        console.log('sending User', sendingUser)
        console.log('receiving User',receivingUser)
        req.body.sender = toString(sendingUser.username)
        const message = await pMessages.create(req.body)
        console.log('message: ', message)

        console.log('message text: ',message.text)

        sendingUser.contacts.addToSet(receivingUser.username)

        receivingUser.contacts.addToSet(sendingUser.username)
        

        sendingUser.chats.addToSet(`me: ${message.text} to ${receivingUser.username}`)


        receivingUser.chats.addToSet(`${sendingUser.username}: ${message.text}`)


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
        const foundUserChats = await User.findOne({'_id':req.user._id})
        res.json(foundUserChats.chats)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

/*

        const sendingUser = await User.findOne({'_id':req.user._id})
        const receivingUser =  await User.findOne({'_id':req.params.id})
        console.log('sending User', sendingUser)
        console.log('receiving User',receivingUser)
        req.body.sender = toString(sendingUser.username)
        const message = await pMessages.create(req.body)

        console.log('message ',message)

        sendingUser.contacts.addToSet(receivingUser.username,receivingUser._id)
        receivingUser.contacts.addToSet(message.sender,receivingUser._id)

        sendingUser.chats.sender = receivingUser.username
        sendingUser.chats.text = `me: ${message.text}`

        receivingUser.chats.sender = sendingUser.username
        receivingUser.chats.text = `${sendingUser.username}: ${message.text}`

        console.log('receiving User: ',receivingUser)
        console.log('sending User: ',sendingUser)

        await sendingUser.save()
        await receivingUser.save()

        res.json(sendingUser.chats)
        
*/