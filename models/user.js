const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:'Messages'}]

}, {
    timestamps:true
})

userSchema.pre('save', async function(next){
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password,8):
    null
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this.id}, process.env.SECRET)
    return token
}

const User =  mongoose.model('User', userSchema)

module.exports = User