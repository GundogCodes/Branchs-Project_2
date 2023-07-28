const Forum =  require('../models/Forum')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comments')

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

exports.makeAPost = async (req,res)=>{
    try {
        const forum = await Forum.findOne({_id:req.params.id})
        const newPost = await Post.create(req.body)
        forum.posts.addToSet(newPost)
        await newPost.save()
        res.json(forum)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/*

//post routes
router.post('/:id', userController.auth, forumController.makeAPost) id of the forum
router.delete('/:id', userController.auth, forumController.deleteAPost) id of the post
router.put('/:id', userController.auth, forumController.updateAPost)
router.get('/:id', userController.auth, forumController.showAPost)

//comment routes

router.post('/:id', userController.auth, forumController.addComment)
router.delete('/:id', userController.auth, forumController.deleteComment)
router.put('/:id', userController.auth, forumController.editComment)
router.get('/:id', userController.auth, forumController.showAComment)

*/