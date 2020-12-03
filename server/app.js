const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const connectMongoDB = require('./config/mongoose')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

connectMongoDB()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

module.exports = app
