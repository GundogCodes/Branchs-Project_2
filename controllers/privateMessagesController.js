require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pMessages =  require('../models/privateMessages')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/post')
//privateMessages

exports.sendPrivateMessage = async (req,res) => {
    try {
        
            //req.user.id !== req.params.id
            const sendingUser = await User.findOne({'_id':req.user.id})
            const receivingUser =  await User.findOne({'_id':req.params.id})
            req.body.sender = sendingUser.username
            req.body.receiver = receivingUser.username
            const message = await pMessages.create(req.body)
            if(!message.text){
        
                res.json(" Include a 'text' key in your message")
               
            } else{

                // const messageText = message.text
                // console.log('messageText',message.text)
                // console.log('message',message)
                // console.log('SU before',sendingUser)
                // console.log('RU before', receivingUser)
                //sendingUser.chats.addToSet(receivingUser.username)
                for(let i=0; i<=sendingUser.interactions.length; i++){
                    if (sendingUser.interactions[i] !== sendingUser.username){
                        sendingUser.interactions.addToSet(receivingUser.username)
                        
                        sendingUser.chats.addToSet(message)
                    } else{
                        sendingUser.chats.addToSet(message)
                    }
                }
                
                for(let i=0; i<=receivingUser.interactions.length; i++){
                    if (receivingUser.interactions[i] !== receivingUser.username){
                        receivingUser.interactions.addToSet(sendingUser.username)
                        
                        receivingUser.chats.addToSet(message)
                    } else{
                        receivingUser.chats.addToSet(message)
                    }
                }
                
                receivingUser.interactions.addToSet(sendingUser.username)
                
                await sendingUser.save()
                await receivingUser.save()
                
                // console.log('SU after',sendingUser)
                //console.log('RU after', receivingUser)
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
            
            const foundUser = await User.findOne({'_id':req.user._id}).populate('chats')
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
