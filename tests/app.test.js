const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')

const server = app.listen(8080, ()=>{ console.log('Testing on PORT 8080')})

const User = require('../models/user')
const pMessages = require('../models/privateMessages')
const Post = require('../models/post')

let mongoServer;

beforeAll(async ()=>{
    mongoServer =  await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })

})
afterAll(async ()=>{
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing Home endpoint', ()=>{

    test('get to homepage', async ()=>{
        const response = await request(app)
        .get('/home')
        expect(response.body.createAnAccountHere).toEqual("localhost:3000/users/new")
        expect(response.body.loginHere).toEqual("/users/login")
        expect(response.body.a).toEqual("Master Branch is a social networking app that enables users to create accounts, build profiles")
        expect(response.body.b).toEqual("and engage in discussions on a centralized platform. Users can explore topics, create focused")
        expect(response.body.c).toEqual("branches, and enjoy direct messaging for open and encrypted conversations. With its flexible")
        expect(response.body.d).toEqual("structure, Master Branch fosters meaningful connections and empowers users to exchange ideas")
        expect(response.body.e).toEqual("in a dynamic and collaborative environment.")
        expect(response.status).toBe(200)

    })
})

describe('Testing all User endpoints', ()=>{

    test('get to create User Page', async ()=>{
        const response = await request(app)
        .get('/users/new')
        expect(response.body.message).toEqual("Post a request with a 'username, email, and password")
        expect(response.body.login).toEqual("post a login with your credentials: /localhost:3000/users/login")
        expect(response.status).toBe(200)
    })
    test('create a new user', async ()=>{
        const response = await request(app)
        .post('/users/new')
        .send({username:'Gundog',email:'g@g.com',password:'g'})
        expect(response.body).toHaveProperty('newUser')
        expect(response.body).toHaveProperty('loginHere')
        expect(response.body.newUser).toHaveProperty('username')
        expect(response.body.newUser.username).toEqual('Gundog')
        expect(response.body.newUser.email).toEqual('g@g.com')
        expect(response.body.newUser).toHaveProperty('email')
        expect(response.body.newUser).toHaveProperty('password')
        expect(response.body.newUser).toHaveProperty('posts')
        expect(response.body.newUser).toHaveProperty('friends')
        expect(response.body.newUser).toHaveProperty('chats')
        expect(response.body.newUser).toHaveProperty('interactions')
        expect(response.body.newUser).toHaveProperty('_id')
        expect(response.body.newUser).toHaveProperty('createdAt')
        expect(response.body.newUser).toHaveProperty('updatedAt')
        expect(response.body.newUser).toHaveProperty('__v')
        expect(response.body.loginHere).toEqual('/users/login')
        expect(response.status).toBe(200)
    })
    test('login a user', async ()=>{
        const response =  await request(app)
        .post('/users/login')
        .send({username:'Gundog',email:'g@g.com',password:'g'})
        expect(response.body).toHaveProperty('user')
        expect(response.body).toHaveProperty('token')
        expect(response.body.user).toHaveProperty('username')
        expect(response.body.user.username).toEqual('Gundog')
        expect(response.body.user.email).toEqual('g@g.com')
        expect(response.body.user).toHaveProperty('email')
        expect(response.body.user).toHaveProperty('password')
        expect(response.body.user).toHaveProperty('posts')
        expect(response.body.user).toHaveProperty('friends')
        expect(response.body.user).toHaveProperty('chats')
        expect(response.body.user).toHaveProperty('interactions')
        expect(response.body.user).toHaveProperty('_id')
        expect(response.body.user).toHaveProperty('createdAt')
        expect(response.body.user).toHaveProperty('updatedAt')
        expect(response.body.user).toHaveProperty('__v')
        expect(response.status).toBe(200)
        
    })
    test('see a user profile', async ()=>{
        const user = await User.findOne({email:'g@g.com'})
        const response =  await request(app)
        .get(`/users/${user._id}`)
        expect(response.body._id).toEqual(`${user._id}`)
        expect(response.body.username).toEqual('Gundog')
        expect(response.body.email).toEqual('g@g.com')
        expect(response.body).toHaveProperty('password')
        expect(response.body).toHaveProperty('posts')
        expect(response.body).toHaveProperty('friends')
        expect(response.body).toHaveProperty('chats')
        expect(response.body).toHaveProperty('interactions')
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('__v')
        expect(response.status).toBe(200)
    })
    test('see all users', async ()=>{
        const response = await request(app)
        .get('/users')
        response.body.forEach(function(user){
            expect(user).toHaveProperty('username')
            expect(user).toHaveProperty('email')
            expect(user).toHaveProperty('password')
            expect(user).toHaveProperty('posts')
            expect(user).toHaveProperty('friends')
            expect(user).toHaveProperty('chats')
            expect(user).toHaveProperty('interactions')
            expect(user).toHaveProperty('_id')
            expect(user).toHaveProperty('createdAt')
            expect(user).toHaveProperty('updatedAt')
            expect(user).toHaveProperty('__v')
            expect(response.status).toBe(200)
        })
    })

    test('updating user info', async ()=>{

        const user =  new User ({username:'Bao',email:'b@b.com',password:'b'})
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)

        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({username:'GundoggyDog',email:'b@b.com',password:'g'})

        //console.log('response', response)

        expect(response.body).toHaveProperty('updatingUser')
        expect(response.body.updatingUser).toHaveProperty('_id')
        expect(response.body.updatingUser).toHaveProperty('username')
       expect(response.body.updatingUser.username).toEqual('GundoggyDog')
        expect(response.body.updatingUser).toHaveProperty('email')
        expect(response.body.updatingUser).toHaveProperty('password')
        expect(response.body.updatingUser).toHaveProperty('posts')
        expect(response.body.updatingUser).toHaveProperty('friends')
        expect(response.body.updatingUser).toHaveProperty('chats')
        expect(response.body.updatingUser).toHaveProperty('interactions')
        expect(response.body.updatingUser).toHaveProperty('_id')
        expect(response.body.updatingUser).toHaveProperty('createdAt')
        expect(response.body.updatingUser).toHaveProperty('updatedAt')
        expect(response.body.updatingUser).toHaveProperty('__v')
        expect(response.status).toBe(200)
    })
    
    test('deleting a user test', async ()=>{
        const user =  new User ({username:'gao',email:'ga@b.com',password:'b'})
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)

        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        console.log('response',response)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual('User Deleted')
        expect(response.status).toBe(200)
    })
    
    /*
    router.put('/:id', userController.auth, userController.updateUser) //works
    router.delete('/:id', userController.auth, userController.deleteUser) //works

    */
})
describe('Testing all main forums endpoints', ()=>{
    /*
    router.get('/', userController.auth, mainPostsController.allPosts)
    router.post('/new',userController.auth, mainPostsController.makePost)
    router.delete('/:id',userController.auth, mainPostsController.deletePost)
    router.put('/:id', userController.auth, mainPostsController.updatePost)
    router.get('/:id', userController.auth,  mainPostsController.showPost)
    */
})
describe('Testing all private messages endpoints', ()=>{

    /*
    router.post('/:id', userController.auth, privateMessageController.sendPrivateMessage)
    router.get('/:id', userController.auth, privateMessageController.seeChats)
    */
})
