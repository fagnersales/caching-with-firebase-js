const { MessageEmbed } = require('discord.js')

const cb = str => "```js\n" + str + "```"

module.exports.run = (client, message, args) => {
    if (!args[0]) return message.channel.send('Busque por uma chave!')
    try {
        const data = client.cache.get(args[0])

        const embed = new MessageEmbed()
            .setTitle('Got Data')
            .setColor('RANDOM')
            .setDescription(`\n> **Reference**\n${cb(args[0])}\n${cb("Data " + JSON.stringify(data, null, 2))}`)

        message.channel.send(embed)
    } catch (error) {
        message.channel.send(error.message)
    }
} 