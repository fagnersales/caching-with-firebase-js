const database = require('./database')

const { Client } = require("discord.js")
require("dotenv").config()

const Cache = require('../src/index')
const { readdirSync } = require('fs')
const { join } = require('path')

const client = new Client()

client.cache = new Cache(database, 6000000)

const commands = {}

readdirSync(join(__dirname, 'commands'))
.forEach(command => commands[command.split('.')[0]] = join(__dirname, 'commands', command))

function discordMessage(message) {
    if (message.author.id !== "474407357649256448") return

    const command = message.content.split(' ')[0]
    const args = message.content.split(' ').slice(1)

    if (commands[command.toLowerCase()]) require(commands[command.toLowerCase()]).run(client, message, args)


}

client.on('message', discordMessage)

client.login(process.env.TOKEN)