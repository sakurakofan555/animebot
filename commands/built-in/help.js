const { prefix } = require('../../config.json')

module.exports = {
    name: 'help',
    aliases: 'h',
    description: 'a helpful help command',
    cooldown: 1,
    guildOnly: false,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nSend \`${prefix}help [command name]\` to get info on a specific command.`);

        return message.author.send(data, { split: true })
	        .then(() => {
		    if (message.channel.type === 'dm') return;
	        })
	    .catch(error => {
		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		message.reply('Enable DMs or contact bot owner for help.');
	    });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return message.reply('Please input a valid command.');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 1} second(s)`);

        message.channel.send(data, { split: true });
    }


}