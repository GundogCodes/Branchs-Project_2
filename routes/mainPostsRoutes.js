const express = require('express')
const router = express.Router()
const mainPostsController =  require('../controllers/mainPostsController')
const userController = require('../controllers/userController')

//INDUCES
//Main forum
router.get('/:id', userController.auth, mainPostsController.allPosts)
router.post('/new',userController.auth, mainPostsController.makePost)
router.delete('/:id',userController.auth, mainPostsController.deletePost)
router.put('/:id', userController.auth, mainPostsController.updatePost)
router.get('/:id', userController.auth,  mainPostsController.showPost)




module.exports = router