const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//INDUCES

//INDEX
router.get('/', userController.getAllUsers) //works
//CREATE
router.post('/new', userController.createUser) //works
router.get('/new', userController.createUserPrompt) //works
//UPDATE
router.post('/login', userController.loginUser) //works
//EDIT
router.put('/:id', userController.auth, userController.updateUser) //works
//DELETE
router.delete('/:id', userController.auth, userController.deleteUser) //works
//SHOW
router.get('/:id', userController.seeProfile)

module.exports = router
