const express = require('express')
const Router = express.Router()
const path = require('path')

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// chat main
Router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})


// Autenticação de usuário API
Router.post("/register", userController.register)
Router.post("/login", userController.login)


// Pages Autenticação de usuário

Router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/register.html'))
})
Router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/login.html'))
})

// auth usuário
Router.post("/auth", authController)


module.exports = Router;
