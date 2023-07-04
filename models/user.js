const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    username:{type:String, require:true,unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    friends:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    chats:{type:mongoose.Schema.Types.ObjectId, ref:'privateMessage'},
    contacts:[{type:Array}]

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