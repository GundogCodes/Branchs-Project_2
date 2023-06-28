const express = require('express')
const router = express.Router()
const messageController =  require('../controllers/messagesController')
const userController = require('../controllers/userController')

//INDUCES
//Main forum
router.get('/', userController.auth, messageController.getAllMessages)
router.post('/new',userController.auth, messageController.sendMessage)
router.delete('/:id',userController.auth, messageController.deleteMessage)
router.put('/:id', userController.auth, messageController.updateMessage)
router.get('/:id', userController.auth,  messageController.showAMessage)



module.exports = router