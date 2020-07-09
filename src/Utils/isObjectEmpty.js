const isObjectEmpty = (object) => {
    if (typeof object === 'undefined' || object === null) return true
    if (Array.isArray(object)) return object.length === 0
    if (typeof object === 'string') return !object
    if (typeof object === 'object') return Object.keys(object).length === 0 && object.constructor === Object
    return false
}

module.exports = isObjectEmpty