const Messages =  require('../models/messages')
const User = require('../models/user')
const Page = require('../models/messagePage')


exports.showPrivateMessagesPage = async (req,res)=>{
    try {
        const messageToerson = await User.findOne({_id:req.params.id})

        
    } catch (error) {
        res.statusCode(400).json({message:error.message})
    }
}

exports.sendPrivateMessage = async (req,res)=>{
    try {
        const newMessage = await Messages.create(req.body)
        const userOne = req.user
        const userTwo = await User.findOne({'_id':req.params.id})
        const pageBody = {userOne:userOne._id,userTwo:userTwo.Id,messages:newMessage}
        const findPage =  await Page.create(pageBody)
        res.json(findPage)
    } catch (error) {
        res.statusCode(400).json({message:error.message})    }
}

// exports.deletePrivateMessagePage = async (req,res) =>{
//     try {
//         console.log('hi')
//     } catch (error) {
//         res.statusCode(400).json({message:error.message})
//     }
// }

