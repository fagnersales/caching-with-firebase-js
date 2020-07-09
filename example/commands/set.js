const { MessageEmbed } = require('discord.js')

const cb = str => "```js\n" + str + "```"

module.exports.run = (client, message, args) => {
    if (!args[0] || !args[1]) return message.channel.send('Utilize uma chave e um valor para armazenar algo!')

    try {
        const value = JSON.parse(args.slice(1).join(" ").trim())

        client.cache.set(args[0], value)

        const embed = new MessageEmbed()
            .setTitle('Setted Data')
            .setColor('RANDOM')
            .setDescription(`\n> **Reference**\n${cb(args[0])}\n${cb("Data " + JSON.stringify(value, null, 2))}`)

        message.channel.send(embed)
    } catch (error) {
        message.channel.send(error.message)
    }
} 