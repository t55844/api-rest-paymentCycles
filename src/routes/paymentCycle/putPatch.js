const PaymentCycles = require('../../config/paymentCycles/PaymentCycles')

const router = require('express').Router()

router.put('/:id', async (req, res) => {

})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { email, name, month, year, credits, debts } = req.body
    const payment = { email, name, month, year, credits, debts }

    const response = await PaymentCycles.updateOne({ _id: id }, payment)

    if (response.n == 0 || response.nModified == 0) {
        return res.status(404).send({ mensage: ['Item  não encontrado'] })
    }

    return res.status(200).send(response)
})

module.exports = router
