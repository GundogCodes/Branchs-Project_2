const Messages =  require('../models/messages')
const User = require('../models/user')
const Page = require('../models/messagePage')


exports.showPrivateMessagesPage = async (req,res)=>{
    try {
        
    } catch (error) {
        res.statusCode(400).json({message:error.message})
    }
}

exports.sendPrivateMessage = async (req,res)=>{
    try {
        const newMessage = await Messages.create(req.body)
        const userOne = req.user
        const userTwo = await User.findOne({_id:req.params.id})
        const pageBody = {userOne,userTwo,newMessage}
        const findPage =  await Page.create(pageBody)
    } catch (error) {
        res.statusCode(400).json({message:error.message})    }
}

exports.deletePrivateMessagePage = async (req,res) =>{
    try {
        
    } catch (error) {
        res.statusCode(400).json({message:error.message})
    }
}

