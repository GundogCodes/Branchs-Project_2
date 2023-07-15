const express = require('express')
const router = express.Router()
const newForumController = require('../controllers/forumController')
const userController = require('../controllers/userController')

//INDUCES

router.get('/', userController.auth, newForumController.showAllForums)
router.post('/new', userController.auth, newForumController.createNewForum)
router.put('/:id', userController.auth, newForumController.updateNewForum)
router.get('/:id', userController.auth, newForumController.showAforum)
router.delete('/:id', userController.auth, newForumController.deleteAForum)


module.exports = router