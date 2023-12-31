const Forum =  require('../models/Forum')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comments')

exports.showAllForums = async (req,res) =>{
    try {
        const forumTitles = []
        const forumList = await Forum.find({})
        for(let form of forumList){
            forumTitles.push(`${form.title}, ID: ${form.id}`)
        }
        res.json(forumTitles)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.createNewForum = async (req,res) =>{
    try {
        const newForum = await Forum.create(req.body)
        const findUser = await User.findOne({_id:req.user.id})
        console.log(findUser)
        newForum.founder = findUser
        newForum.numOfMembers = 1
        newForum.members.addToSet(findUser)
        //findUser.foundedForums.addToSet(newForum)
        
        res.json(newForum)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.updateNewForum = async (req,res) =>{
    try {
        const foundForum = await Forum.findOne({_id:req.params.id})

        if(req.body.user=== foundForum.founder ){
            const updatingForum = await Forum.findOneAndUpdate({'_id':req.params.id}, req.body, {new:true})
            res.json(updatingForum)
        }else{
                res.json('You are not authorized to change this forum')
            }

        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.showAforum = async (req,res) =>{
    try {
        const forum = await Forum.findOne({'_id':req.params.id}).populate('posts')
        res.json(forum)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.deleteAForum = async (req,res) =>{
    try {
        const foundFourm = await Forum.findOne({_id:req.params.id})
        if(foundFourm.founder === req.body.user){
            await Forum.findOneAndDelete({'_id':req.params.id})
            res.json('Forum Deleted')
        } else{
            res.json('You are not authorized to delete this forum')
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.makeAPost = async (req,res)=>{
    try {
        const postingUser = await User.findOne({'_id':req.user.id})
        const newPost = await Post.create(req.body)
        newPost.sender = postingUser
        const forum = await Forum.findOne({_id:req.params.id})
        forum.posts.addToSet(newPost)
        console.log(newPost)
        console.log(postingUser)
        console.log(forum)
        await newPost.save()
        await forum.save()
        res.json(forum)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.deleteAPost = async (req,res)=>{
    try {
         await Post.findOneAndDelete({_id:req.params.id})
        res.json('post deleted')
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.updateAPost = async (req,res)=>{
    try {
        const foundPost = await Post.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        res.json(foundPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.showAPost = async (req,res)=>{
    try {
        const foundPost = await Post.findOne({_id:req.params.id})
        res.json(foundPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.addComment = async (req,res)=>{
    try {
        const findPost = await Post.findOne({_id:req.params.id})
        const newComment = await Comment.create(req.body)
        findPost.comments.addToSet(newComment)
        res.json(findPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.deleteComment = async (req,res)=>{
    try {
        await Comment.findOneAndDelete({_id:req.params.id})
        res.json('comment deleted')
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}
exports.editComment = async (req,res)=>{
    try {
        const updatedComment = await Comment.findOneAndUpdate({_id:req.params.id},req.body, {new:true})
        
        res.json(updatedComment)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.showAComment = async (req,res)=>{
    try {
        const foundComment = await Comment.findOne({_id:req.params.id})
        res.json(foundComment)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}


/*

//post routes

router.delete('/:id', userController.auth, forumController.deleteAPost) id of the post
router.put('/:id', userController.auth, forumController.updateAPost)
router.get('/:id', userController.auth, forumController.showAPost)

//comment routes

router.post('/:id', userController.auth, forumController.addComment)
router.delete('/:id', userController.auth, forumController.deleteComment)
router.put('/:id', userController.auth, forumController.editComment)
router.get('/:id', userController.auth, forumController.showAComment)

*/