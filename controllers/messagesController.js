require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Messages =  require('../models/messages')
const User = require('../models/user')
const { rawListeners } = require('../app')

exports.getAllMessages = async (req,res) =>{
    try {
        messagesList = []
        const allMessages = await Messages.find({})
        for(let message of allMessages){
            messagesList.push(`${message.sender}: ${message.text}`)
        }
        res.json(messagesList)
    } catch (error) {
        res.statusCode(400).json({message:error.message})
    }
}

exports.sendMessage = async (req,res)=>{
    try {

        const sendingUser = await User.findOne({'_id':req.user._id})
        req.body.sender = sendingUser.name
        const newMessage = await Messages.create(req.body)
        console.log('new MESSAGE: ',newMessage)
        req.user.messages?
        req.user.messages.addToSet({'_id':newMessage._id}):
        req.user.messages = [{_id:newMessage._id}]
        req.user.save()
        res.json(`${sendingUser.name} says ${newMessage.text}, (${newMessage._id})`)

    } catch (error) {
        res.status(400).json({message:error.message})

    }
}

exports.deleteMessage = async (req,res) =>{
    try {
        await Messages.findOneAndDelete(req.params.id)
        res.json({message:'message deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}   

exports.updateMessage = async (req,res) =>{
    try {
        const updateMessage = await Messages.findOneAndUpdate({'_id':req.params.id}, req.body,{new:true})
        res.json({message:"message was updated!"})
    } catch (error) {
        res.status(400).json({message:error.message})

    }
}

exports.showAMessage = async (req,res) =>{
    try {
        const message = await Messages.findOne({'_id':req.params.id})
        res.json(message)
    } catch (error) {
        res.status(400).json({message:error.message})

    }
}


