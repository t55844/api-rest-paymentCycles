const router = require('express').Router()
const paymentCyclesSchema = require("../../config/paymentCycles/PaymentCycles")

const { mensageError } = require('../../service/errorsHandler')
const { fieldCheck, rangeOutCheck } = require('../../service/checkHandler')

const fieldsForCheck = ['email', 'name', 'month', 'year', 'credits', 'debts']

router.post('/', async (req, res) => {
    console.log(req.body)

    const missingFields = fieldCheck(req.body, fieldsForCheck)

    if (missingFields.length > 0) {
        const mensage = missingFields.map(field => mensageError(field, 'missingField'))
        return res.status(400).send({ mensage: [mensage] })
    }

    const debts = req.body.debts
    const credits = req.body.credits
    const year = req.body.year

    const rangeCheck = rangeOutCheck(year, credits, debts)
    if (!!rangeCheck) {
        const mensage = mensageError(rangeCheck, 'valueRangeOut')
        return res.status(400).send({ mensage: [mensage] })
    }

    const payment = await paymentCyclesSchema.create(req.body)
    res.status(200).send(payment)
})

module.exports = router