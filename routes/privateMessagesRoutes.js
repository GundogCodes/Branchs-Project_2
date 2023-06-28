const express = require('express')
const router = express.Router()
const messageController =  require('../controllers/messagesController')
const userController = require('../controllers/userController')
const privateMessageController = require('../controllers/privateMessagesController')

//Private Messages

router.get('/:id',userController.auth, privateMessageController.showPrivateMessagesPage)
router.post('/:id', userController.auth, privateMessageController.sendPrivateMessage)
//router.delete('/:id', userController.auth, privateMessageController.deletePrivateMessagesPage)

module.exports =  router