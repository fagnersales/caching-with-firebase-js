const isObjectEmpty = require('./isObjectEmpty')

const clearObject = (o) => Object.entries(o).reduce((obj, [k, v]) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) v = clearObject(v)
    if (!isObjectEmpty(v)) obj[k] = v;
    return obj
}, {})


module.exports = clearObject