const express = require('express')
const router = express.Router()
const messageController =  require('../controllers/messagesController')
const userController = require('../controllers/userController')
const privateMessageController = require('../controllers/privateMessagesController')

//Private Messages

router.get('/:id',userController.auth, messageController.showPrivateMessages)
router.post('/:id', userController.auth, messageController.sendPrivateMessage)


module.exports =  router