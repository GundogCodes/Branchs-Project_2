const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const userRoutes = require('./routes/userRoutes')
const mainPostsRoutes = require('./routes/mainPostsRoutes')
const privateMessagesRoutes = require('./routes/privateMessagesRoutes')
const homeRoutes = require('./routes/homeRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.use('/users', userRoutes)
app.use('/main', mainPostsRoutes)
app.use('/pm', privateMessagesRoutes)
app.use('/home', homeRoutes)

module.exports = app