const express = require('express');
const authrouter = require('./routes/auth.routes');
const menurouter = require('./routes/menu.routes')
const cookieParser = require('cookie-parser')


const app = express()


app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authrouter)
app.use('/api/menuiteams',menurouter)

module.exports = app