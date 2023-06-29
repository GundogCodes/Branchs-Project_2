const express = require('express')
const router = express.Router()
const privateMessageController =  require('../controllers/privateMessagesController')
const userController = require('../controllers/userController')


//privateMessages
router.post('/:id', userController.auth, privateMessageController.sendPrivateMessage)
router.get('/:id', userController.auth, privateMessageController.seeChats)

module.exports = router
