const PaymentCycles = require('../../config/paymentCycles/PaymentCycles')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const email = req.query.email

    const debtsCredits = await PaymentCycles.aggregate().
        match({ email }).
        group({ _id: null, debts: { $push: '$debts.value' }, credits: { $push: '$credits.value' } }).
        exec();

    if (debtsCredits.length == 0) {
        return res.status(404).send({ mensage: ['Não a nada armazenado'] })
    }
    const credits = [
        ...debtsCredits[0]['credits']
            .flatMap(creditsArrays => creditsArrays)]
        .reduce((previus, current) => previus + current)

    const debts = [
        ...debtsCredits[0]['debts']
            .flatMap(debtsArrays => debtsArrays)]
        .reduce((previus, current) => previus + current)

    res.send({ credits, debts })
})

module.exports = router