require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User =  require('../models/user')



exports.auth = async (req,res,next) =>{
    try {
        const token =  req.header("Authorization").replace('Bearer ','')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        req.user = user
        if(user.id !== data._id){
            res.json({message:`
            INVALID CREDENTIALS - PLEASE LOGIN
            localhost:3000/users/login
            `})
        }
        else{
            next()
        }
    } catch (error) {
        res.status(401).json({message: error.message})        
    }
}


exports.createUser = async (req,res) =>{
    try {
        const newUser = await User.create(req.body)
        await newUser.save()
        res.json({newUser})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}

exports.loginUser = async (req,res)=>{
    try {
        const user =  await User.findOne({email:req.body.email})
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            res.json({message: 'INVALID CREDENTIALS'})
        } else{
            const token = await user.generateAuthToken()
            res.json({user,token})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.updateUser = async (req,res)=>{
    try {
        const updatingUser = await User.findOneAndUpdate({'_id':req.params.id}, req.body, {new:true})
        await updatingUser.save()
        if(!updatingUser){
            res.json({message:'Could not find User'})
        } else{
            res.json({updatingUser})
        }
    } catch (error) {
        res.json.status(400)({message:error.message})
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        await User.findOneAndDelete({'_id':req.params.id})
        res.json({message:'User Deleted'})
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

exports.seeProfile = async (req,res)=>{
    try {
        const foundUser = await User.findOne({'_id':req.params.id})
        res.json(foundUser)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}