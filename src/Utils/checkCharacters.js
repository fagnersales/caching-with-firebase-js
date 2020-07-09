const availableCharacters = require('./availableCharacters')

const checkCharacters = string => {
    string = String(string)

    const invalidValue = string.split('').find(char => !availableCharacters.split('').includes(char))
    if (invalidValue) return invalidValue
    return true
}

module.exports = checkCharacters