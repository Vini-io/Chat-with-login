require('dotenv').config()
const userRouter = require('./routes/Route')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socketIO = require('socket.io')
const app = express()


app.use(cors())
app.use(express.json())
app.use(userRouter)


const server = app.listen(process.env.PORT, () => {
    console.log("Server ruinmg")
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_DB).then(() => console.log("Banco carregado"))
})


let messages = []

const io = socketIO(server)

io.on('connection', (socket) => {
    
    socket.emit('update_messages', messages)

    socket.on('new_message', (data) => {
        messages.push(data)
        io.emit('update_messages', messages)
    })



})

