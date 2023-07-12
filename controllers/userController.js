require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User =  require('../models/user')



exports.auth = async (req,res,next) =>{
    try {
        const token =  req.header("Authorization").replace('Bearer ','')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })

        if(!user){
            res.json({message:`INVALID CREDENTIALS - PLEASE LOGIN`})
        }

            req.user = user
            next()
        
    } catch (error) {
        res.status(401).json({message: error.message})        
    }
}


exports.createUser = async (req,res) =>{
    try {
        const newUser = await User.create(req.body)
        await newUser.save()
        res.json({newUser:newUser, loginHere:'/users/login'})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}

exports.createUserPrompt = async (req,res) =>{
    try {

        res.json({message:"Post a request with a 'username, email, and password",
                login:'post a login with your credentials: /localhost:3000/users/login'})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}

exports.loginUser = async (req,res)=>{
    try {
        const user =  await User.findOne({email:req.body.email})

        // console.log('user',user)
        // console.log('user.id',user.id)
        // console.log('user.pass',user.password)
        // console.log('req.body.pass',req.body.password)

        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            res.json({message: 'INVALID CREDENTIALS'})
        } else{
            const token = await user.generateAuthToken()
            res.json({user:user,token:token,goToProfile:`yourProfile/users/${user.id}`, note:'Save that Token!'})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.updateUser = async (req,res)=>{
    try {
    
        if(req.user.id !== req.params.id){
            res.json('INVALID CREDENTIALS - PLEASE LOGIN')
        
        } else if(req.user.id === req.params.id){
            const updatingUser = await User.findOneAndUpdate({'_id':req.params.id}, req.body, {new:true})
            res.json({updated:updatingUser,goToProfile:`yourProfile/users/${user.id}`})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        if(req.user.id !== req.params.id){
            res.json('INVALID CREDENTIALS - PLEASE LOGIN')
        } else if(req.user.id === req.params.id){

            await User.findOneAndDelete({'_id':req.params.id})
            res.json({message:'User Deleted',goToProfile:`yourProfile/users/${user.id}`})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.getAllUsers = async (req,res)=>{
    try {
        const foundUsers = await User.find({})
        res.json(foundUsers)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.seeAProfile = async (req,res)=>{
    try {
        const user = await User.findOne({'_id':req.params.id})
        console.log('rpi',req.params.id)
        console.log('rui',req.user.id)
        if(req.user.id=== req.params.id){
            res.json({user:user.username,id:user.id,email:user.email,posts:user.posts,friends:user.friends,chats:user.chats})
        } else if(req.params.id !== req.user.id){
            res.json({user:user.username,id:user.id,posts:user.posts})
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
