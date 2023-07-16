const Forum =  require('../models/Forum')
const User = require('../models/user')
const Post = require('../models/post')

exports.showAllForums = async (req,res) =>{
    try {
        const forumList = await Forum.find({})
        re.json(forumList)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.createNewForum = async (req,res) =>{
    try {
        const newForum = await Forum.create(req.body)
        res.json(newForum)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.updateNewForum = async (req,res) =>{
    try {
        const updatingForum = await Forum.findOneAndUpdate({'_id':req.params.id}, req.body, {new:true})
        res.json(updatingForum)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.showAforum = async (req,res) =>{
    try {
        const forum = await Forum.findOne({'_id':req.params.id})
        res.json(forum)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.deleteAForum = async (req,res) =>{
    try {
        await Forum.findOneAndDelete({'_id':req.params.id})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

