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
/*
describe('Test all user endpoints', ()=>{
    
    test('create a new todo', async ()=>{
        const response = await request(app)
        .post('/users/todos')
        .send({title:'testTitle', description:'testDescription',completed:true})

        expect(response.body.createdTodo.title).toEqual('testTitle')
        expect(response.body.createdTodo.description).toEqual('testDescription')
        expect(response.body.createdTodo.completed).toEqual(true)
        expect(response.statusCode).toBe(200)
        expect(response.body.createdTodo).toHaveProperty('created_at')
    })
*/