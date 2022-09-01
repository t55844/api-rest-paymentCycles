const PaymentCycles = require('../../config/paymentCycles/PaymentCycles')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const count = await PaymentCycles.estimatedDocumentCount()
    res.send({ count })
})

module.exports = router