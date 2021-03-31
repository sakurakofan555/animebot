// this bot will be an anime search bot that uses the api of an anime indexing site (mal, etc) to fetch the name, release date, poster, episode count, and a short description of the anime.
const fs = require('fs');

const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.cooldowns = new Discord.Collection();

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
  console.log(`help me please \n prefix: ${prefix}`);
});

client.on('message', msg => {
if (!msg.content.startsWith(prefix) || msg.author.bot) return;

const args = msg.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

const command = client.commands.get(commandName)
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return;

if (command.guildOnly && msg.channel.type === 'dm') {
	return msg.reply(`${prefix}${command.name} is only available to use in guilds.`);
}


if (command.args && !args.length) {
  let reply = `You didn't provide any arguments, ${msg.author}!`;
   if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
  return msg.channel.send(reply);
}

const { cooldowns } = client; 

if (!cooldowns.has(command.name)) {
  cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 1) * 1000;

if (timestamps.has(msg.author.id)) {
  const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

  if (now < expirationTime) {
    const timeLeft = (expirationTime - now) / 1000;
    return msg.reply(`This command has a ${command.cooldown} second cooldown. Please wait before retrying (${timeLeft.toFixed(1)} second(s) left.).`)
  }
}

timestamps.set(msg.author.id, now);
setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

try {
  command.execute(msg, args); 
} catch (error) {
  console.error(error);
  msg.reply('uh oh');
}
});

client.login(token);

