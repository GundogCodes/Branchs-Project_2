const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.use('/', userRoutes)

module.exports = app