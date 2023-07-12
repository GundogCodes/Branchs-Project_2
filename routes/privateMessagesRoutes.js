const express = require('express')
const router = express.Router()
const privateMessageController =  require('../controllers/privateMessagesController')
const userController = require('../controllers/userController')

//INDUCES
//privateMessages
//INDEX
router.get('/:id', userController.auth, privateMessageController.seeChats)
//NEW/CREATE
router.post('/:id', userController.auth, privateMessageController.sendPrivateMessage)
//DELETE
router.delete('/:id', userController.auth, privateMessageController.deleteMessage)
//UPDATE/EDIT
router.put('/:id', userController.auth, privateMessageController.editMessage)
//SHOW
//router.get('/:id', userController.auth, privateMessageController.showAMessage)


module.exports = router
