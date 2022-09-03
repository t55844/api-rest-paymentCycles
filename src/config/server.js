const express = require('express')
const bodyParser = require('body-parser')
const { default: mongoose } = require("mongoose")
const cors = require('./cors')
const queryInt = require('express-query-int')
const auth = require('./auth')
const protectedApi = express.Router()
const openApi = express.Router()
require('dotenv/config')

const port = process.env.PORT || 3003
const urlMongodb = process.env.URL_MONGODB
const server = express()

mongoose.connect(urlMongodb)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)
server.use(queryInt())

protectedApi.use(auth)
server.use('/api', protectedApi)
server.use('/oapi', openApi)

const AuthService = require('../routes/user/authService')


server.get('/api', (req, res) => {
    res.status(200).send({ mensage: 'ok' })
})

openApi.post('/login', AuthService.login)
openApi.post('/signup', AuthService.signup)
openApi.post('/validateToken', AuthService.validateToken)


const getPayment = require('../routes/paymentCycle/get')
const postPayment = require('../routes/paymentCycle/post')
const deletePayment = require('../routes/paymentCycle/delete')
const putPatchPayment = require('../routes/paymentCycle/putPatch')
const countPayment = require('../routes/paymentCycle/count')
const summaryPayment = require('../routes/paymentCycle/summary')

server.use('/api/paymentCycle', getPayment)
server.use('/api/paymentCycle', postPayment)
server.use('/api/paymentCycle', deletePayment)
server.use('/api/paymentCycle', putPatchPayment)
server.use('/api/count', countPayment)
server.use('/api/summary', summaryPayment)



try {
    server.listen(port, function () {
        console.log(`server on port: ${port}`)
    })

} catch (error) {
    console.log(`Erro no iniciar do server : ${error}`)
}


