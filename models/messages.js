const {model,Schema} = require('mongoose')
const bcrypt = require('bcrypt')

const messageSchema = new Schema({
    
    text:{type:String},

    sender:{type:Schema.Types.ObjectId, ref:'User', required:true}

}, {
    timestamps:true
})

/*
messageSchema.pre('save', async function(next){
    this.text = await bcrypt.hash(this.text,8)
    null;
    next()
})

*/

const Messages = model('Messages', messageSchema)

module.exports = Messages