const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'sends a test embed',
    execute(message) {
        const testEmbed = new Discord.MessageEmbed()
            .setColor('#1337AF')
            .setTitle('test embed')
            .setURL('https://discord.gg/clover')
            .setAuthor('me')
            .setDescription('i love coding')
            .setTimestamp()
        message.channel.send(testEmbed);
    }
}