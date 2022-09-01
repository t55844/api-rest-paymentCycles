const rangeError = (value, min, max = ' ') => {
    return {
        value,
        range: `${min}-${max}`
    }
}

const mensageError = (error, type) => {
    switch (type) {
        case 'missingField':
            return `O campo ${error} e necessario`

        case 'valueRangeOut':
            return `O valor ${error.value} nao esta dentro do permitido(${error.range})`

        default:
            break;
    }
}

module.exports = {
    rangeError,
    mensageError
}