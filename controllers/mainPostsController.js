require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post =  require('../models/post')
const User = require('../models/user')


exports.allPosts = async (req,res) =>{
    try {
        postList = []
        const allPosts = await Post.find({})
        for(let post of allPosts){
            console.log('post',post)
           // const posterUsername = await User.findOne({'_id':post.sender.id})
            postList.push(` ${post.sender}: ${post.text}`)
        }
        res.json(postList)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.makePost = async (req,res)=>{
    try {

        const sendingUser = await User.findOne({'_id':req.user._id})
        console.log(sendingUser)
        req.body.sender = sendingUser
        console.log(req.body.sender)
        const newPost = await Post.create(req.body)
        console.log('New Post: ',newPost)
        req.user.posts?
        req.user.posts.addToSet({'_id':newPost._id}):
        req.user.posts = [{_id:newPost._id}]
        req.user.save()
        res.json(`${sendingUser.username}: ${newPost.text}, (${newPost._id})`)

    } catch (error) {
        res.json({message:error.message})

    }
}

exports.deletePost = async (req,res) =>{
    try {
        await Post.findOneAndDelete(req.params.id)
        res.json({message:'post deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}   

exports.updatePost = async (req,res) =>{
    try {
        const updatedPost = await Post.findOneAndUpdate({'_id':req.params.id}, req.body,{new:true})
        res.json({message:`post was updated:${updatedPost}`})
    } catch (error) {
        res.status(400).json({message:error.message})

    }
}

exports.showPost = async (req,res) =>{
    try {
        const post = await Post.findOne({'_id':req.params.id})
        res.json(post)
    } catch (error) {
        res.status(400).json({message:error.message})

    }
}


