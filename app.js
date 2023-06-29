const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
const privateMessagesRoutes = require('./routes/privateMessagesRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.use('/users', userRoutes)
app.use('/messages', messagesRoutes)
app.use('/pm', privateMessagesRoutes)

module.exports = app