const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers) //works
router.post('/',userController.createUser) //works
router.post('/login', userController.loginUser) //works
router.put('/:id', userController.auth, userController.updateUser) //works
router.delete('/:id', userController.auth, userController.deleteUser) //works

module.exports = router
