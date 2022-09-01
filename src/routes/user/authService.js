const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../config/paymentCycles/user')
require('dotenv/config')
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
const sendmensageFromDB = (res, dbmensage) => {
    const mensage = []
    _.forIn(dbmensage.mensage, error => mensage.push(error.message))
    return res.status(400).json({ mensage })
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ mensage: 'erro na busca do banco de daods' + err })
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const { _id, name, email, password } = user
            const token = jwt.sign({ _id, name, email, password }, process.env.JWT_SECRET, {
                expiresIn: "1 day"
            })
            res.json({ name, email, token })
        } else {

            return res.status(400).send({ mensage: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    if (!email.match(emailRegex)) {
        return res.status(400).send({ mensage: ['O e-mail informa está inválido'] })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            mensage: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20."
            ]
        })
    }
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ mensage: ['Senhas não conferem.'] })
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ mensage: 'erro na busca do banco de daods' + err })
        } else if (user) {
            return res.status(400).send({ mensage: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                if (err) {
                    return res.status(400).send({ mensage: 'erro na busca do banco de daods' + err })
                } else {
                    return res.status(200).send({ mensage: 'conta criada com sucesso', ok: 'ok' })
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken }