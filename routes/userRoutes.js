const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers) //works
router.post('/',userController.createUser) //works
router.post('/login', userController.loginUser) //works
router.put('/:id', userController.auth, userController.updateUser) //works
router.delete('/:id', userController.auth, userController.deleteUser) //works

module.exports = router

/*
{
    "newUser": {
        "name": "Gunish",
        "email": "gunishsharma20@gmail.com",
        "password": "$2b$08$voD/N6VQMiZSR0Gx8Du8d.q9PVm2UYWNV0h.nEZ5Ka/ysl7IENTg.",
        "_id": "6493b44a1dc59c9ae29a72dc",
        "createdAt": "2023-06-22T02:39:06.779Z",
        "updatedAt": "2023-06-22T02:39:06.779Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkzYjQ0YTFkYzU5YzlhZTI5YTcyZGMiLCJpYXQiOjE2ODc0MDE1NDZ9.dSSDq0PqBZe7dtbhdixHhVFAaEzfy153SuzbWoZtjrw"
}
*/