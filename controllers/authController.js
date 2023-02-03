const jwt = require('jsonwebtoken')


module.exports = function (req, res) {
    const token = req.body.token
    if (!token) {
        return res.status(401).send("acesso negado")
    }

    try {
        const userVerified = jwt.verify(token, process.env.SECRET_TOKEN)
        res.json(userVerified)
    } catch (error) {
        res.status(401).send("acesso negado")
    }
}
