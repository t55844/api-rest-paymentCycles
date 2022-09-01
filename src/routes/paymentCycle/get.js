const router = require('express').Router()
const paymentCycle = require('../../config/paymentCycles/PaymentCycles')

router.get('/', async (req, res) => {
    const email = req.query.email

    const paymentList = await paymentCycle.find({ email: `${email}` })


    if (paymentList.length == 0) {
        return res.status(404).send({ mensage: ['Nenhum item encontrado'] })
    }
    return res.status(200).send(paymentList)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const paymentRequired = await paymentCycle.findOne({ _id: id })

    if (paymentRequired === undefined || paymentRequired === null) {
        return res.status(404).send({ mensage: ['Item  não encontrado'] })
    }
    return res.status(200).send(paymentRequired)
})

module.exports = router