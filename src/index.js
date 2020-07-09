const { writeFileSync } = require('fs')
const { join } = require('path')
const moment = require('moment')
moment.locale('pt-br')

const Utils = require('./Utils')

class Cache {
    constructor(database, timeout = 60000) {
        this.database = database
        this.timeout = timeout
        
        try {
            database.ref().once('value').then(result => {
                this.data = {}
                if (result.val() !== null) this.data = result.val()
            })
        } catch (err) {
            throw new Error('Something got wrong fetching from the firebase', err)
        }

        setTimeout(() => setInterval(() => this.save(), timeout), timeout)

    }

    async save() {
        let savedOn = "database"

        try {
            await this.database.ref().set(this.data)
        } catch (error) {
            savedOn = error.message
            writeFileSync(join(`${__dirname}/storage.json`), JSON.stringify(this.data, null, 2))
        } finally {
            savedOn == "database" ? console.log(`[${moment().format("LLL")}] Sucessfully saved on database.`) : console.log(`[${moment().format("LLL")}] Needed to save on local storage because of this err: ${savedOn}`) 
        }
    }

    get(reference) {
        const checked = Utils.checkCharacters(reference)
        if (checked !== true) throw new Error(`The character ${checked} is not valid`)

        if (!reference) return this.data

        const [keys] = Utils.splitReference(reference)

        let actual = this.data

        for (const key of keys) {
            if (!actual[key]) return null
            actual = actual[key]
        }

        return actual
    }

    set(reference, value) {
        const checked = Utils.checkCharacters(reference)
        if (checked !== true) throw new Error(`The character ${checked} is not valid`)
        if (!reference) throw new Error('Expect a reference.')

        const [keys, len] = Utils.splitReference(reference)
        
        let actual = this.data
        
        for (let i = 0; i < len - 1; i++) {
            if (!actual[keys[i]]) actual[keys[i]] = {}
            actual = actual[keys[i]]
        }
        
        const reversed = keys.reverse()[0]
        if (value == null) delete actual[reversed]
        else {
            actual[reversed] = value
        }

        this.data = Utils.clearObject(this.data)

        return { reference, value }
    }
    
    add(reference, value) {
        const checked = Utils.checkCharacters(reference)
        if (checked !== true) throw new Error(`The character ${checked} is not valid`)
        if (!reference) throw new Error('Expect a reference.')
        
        const [keys, len] = Utils.splitReference(reference)
        
        let actual = this.data
        
        for (let i = 0; i < len - 1; i++) {
            if (!actual[keys[i]]) actual[keys[i]] = {}
            actual = actual[keys[i]]
        }
        
        const reversed = keys.reverse()[0]
        if (["number", "string"].includes(typeof value)) actual[reversed] = value
        else if (Array.isArray(value)) actual[reversed] = [...(actual[reversed] || []), ...value]
        else if (typeof value == "object") actual[reversed] = { ...actual[reversed], ...value }

        this.data = Utils.clearObject(this.data)

        return { reference, value }
    }

    ref(reference) {
        return {
            get: () => this.get(reference),
            add: value => this.add(reference, value)
        }
    }

}

module.exports = Cache