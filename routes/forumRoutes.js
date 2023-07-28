const express = require('express')
const router = express.Router()
const forumController = require('../controllers/forumController')
const userController = require('../controllers/userController')

//INDUCES

//forum routes
router.get('/', userController.auth, forumController.showAllForums)
router.post('/new', userController.auth, forumController.createNewForum)
router.put('/:id', userController.auth, forumController.updateNewForum)
router.get('/:id', userController.auth, forumController.showAforum)
router.delete('/:id', userController.auth, forumController.deleteAForum)

//post routes
router.post('/:id', userController.auth, forumController.makeAPost)
router.delete('/:id', userController.auth, forumController.deleteAPost)
router.put('/:id', userController.auth, forumController.updateAPost)
router.get('/:id', userController.auth, forumController.showAPost)

//comment routes

router.post('/post/:id', userController.auth, forumController.addComment)
router.delete('/post/:id', userController.auth, forumController.deleteComment)
router.put('/post/:id', userController.auth, forumController.editComment)
router.get('/post/:id', userController.auth, forumController.showAComment)

module.exports = router