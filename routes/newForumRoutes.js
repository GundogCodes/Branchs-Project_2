const express = require('express')
const router = express.Router()
const newForumController = require('../controllers/forumController')
const userController = require('../controllers/userController')

//INDUCES

router.get('/', userController.auth, newForumController.showAllForums)
router.post('/', userController.auth, newForumController.createNewForum)
router.put('/', userController.auth, newForumController.updateNewForum)
router.get('/', userController.auth, newForumController.showAforum)


module.exports = router