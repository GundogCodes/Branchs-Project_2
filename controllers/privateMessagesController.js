require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pMessages =  require('../models/privateMessages')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/post')
//privateMessages

exports.sendPrivateMessage = async (req,res) => {
    try {
        if(!req.body.text){
            res.json(" Include a 'text' key in your message")
        } else{
            //req.user.id !== req.params.id
            const sendingUser = await User.findOne({'_id':req.user.id})
            const receivingUser =  await User.findOne({'_id':req.params.id})
            req.body.sender = sendingUser.username
            const message = await pMessages.create(req.body)
            console.log('SU before',sendingUser)
            console.log('RU before', receivingUser)
            sendingUser.interactions.addToSet(receivingUser.username)
            receivingUser.interactions.addToSet(sendingUser.username)
            
            await sendingUser.save()
            await receivingUser.save()
            
            console.log('SU after',sendingUser)
            console.log('RU after', receivingUser)
            res.json(message)//sendingUser.chats)
        }
    
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.seeChats  = async (req,res)=>{
    try {
        console.log('rui',req.user.id)
        console.log('rpd',req.params.id)
        if(req.params.id === req.user.id){
            
            const foundUser = await User.findOne({'_id':req.user._id})
            const chats = foundUser.chats
            const user = foundUser.username +"'s Chats:"
            res.json({user,chats})

        
        } else if(req.params.id !== req.user.id){
            res.json('Not Authorized to see these chats, please login')
        }
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