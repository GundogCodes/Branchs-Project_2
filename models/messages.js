const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const messageSchema = new mongoose.Schema({
    text:{Type:String, require:true},
    sender:{Type:mongoose.Schema.Types.ObjectId, ref:'User'}
}, {timestamps:true})

messageSchema.pre('save', async function(next){
    this.text = await bcrypt.hash(this.text,8)
    null;
    next()
})


const Messages = mongoose.model('Messages', messageSchema)

module.exports = Messages