require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Messages =  require('../models/messages')

/*

router.post('/new',messageController.sendMessage)
router.delete('/:id', messageController.deleteMessage)
router.put('/', messageController.updateMessage)
router.get('/:id', messageController.showAMessage)

 */

exports.getAllMessages = async (req,res) =>{
    try {
        const allMessages = await Messages.find({})
        res.json(allMessages)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.sendMessage = async (req,res)=>{
    try {
        const newMessage = await Messages.create(req.body)
        res.json({message:"Message Sent!"})
    } catch (error) {
        res.status(400).json({message:error.message})

    }
}

exports.deleteMessage = async (req,res) =>{
    try {
        await Messages.findOneAndDelete({'_id':req.params.id})
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