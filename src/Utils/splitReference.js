const splitReference = reference => {
    if (!reference) return []

    if (reference.endsWith('.') || reference.endsWith('/')) reference = reference.slice(0, -1)

    if (reference.includes("/") && reference.includes(".")) reference = reference.replace('.', "")

    const split = reference.includes('/') ? reference.split('/') : reference.split('.')

    return [split, split.length]
}

module.exports = splitReference