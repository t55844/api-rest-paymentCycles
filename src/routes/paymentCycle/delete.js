const PaymentCycles = require('../../config/paymentCycles/PaymentCycles')

const router = require('express').Router()

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const response = await PaymentCycles.deleteOne({ _id: id })

    if (response.ok == 0) {
        return res.status(404).send({ mensage: ['Item  não encontrado'] })
    }
    return res.status(200).send(response)
})

module.exports = router