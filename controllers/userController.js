const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = require('../models/userSchema')


const register = async function (req, res) {

    let userSelect = await UserSchema.findOne({ email: req.body.email })
    if (userSelect) {
        return res.status(401).send("Email ja cadastrado!!")
    }

    let user = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    try {
        await user.save()
        res.send("Usuario registrado com sucesso")
    } catch (error) {
        res.status(400).send(error)
    }

}

const login = async function (req, res) {
    let userSelect = await UserSchema.findOne({ email: req.body.email })
    if (!userSelect) {
        return res.status(401).send("Email ou senha inválida")
    }
    const passwordAndBcryptMatch = bcrypt.compareSync(req.body.password, userSelect.password)
    if (!passwordAndBcryptMatch) {
        return res.status(401).send("Email ou senha inválida")
    }
    const token = jwt.sign({ _id: userSelect._id, name: userSelect.name }, process.env.SECRET_TOKEN)
    res.header("authoriztion-token", token);
    res.json({token})
}



module.exports = { register, login }
