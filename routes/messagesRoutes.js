const express = require('express')
const router = express.Router()
const messageController =  require('../controllers/messageController')

//INDUCES

router.get('/', messageController.getAllMessages)
router.post('/new',messageController.sendMessage)
router.delete('/:id', messageController.deleteMessage)
router.put('/:id', messageController.updateMessage)
router.get('/:id', messageController.showAMessage)


module.exports = router