const { rangeError } = require('../service/errorsHandler')

const fieldCheck = (payment, fields) => {
    let count = 0
    const missingFields = []

    while (count < fields.length) {
        const field = fields[count]


        if (payment[field] == undefined || payment[field] == null) {
            missingFields.push(field)
        }
        count++
    }
    return missingFields
}

const rangeOutCheck = (year, credits, debts) => {

    if (year < 1970 || year > 2100) {
        const mensage = rangeError(year, 1970, 2100)
        return mensage
    }

    const creditsArray = credits.filter(credit => credit.value < 0)
    if (creditsArray.length != 0) {
        const resArray = creditsArray.map(credit => rangeError(credit.value, 0))
        return resArray[0]
    }

    const debtsArray = debts.filter(debt => debt.value < 0)
    if (debtsArray.length != 0) {
        const resArray = debtsArray.map(debt => rangeError(debt.value, 0))
        return resArray[0]
    }

}

module.exports = {
    fieldCheck,
    rangeOutCheck
}