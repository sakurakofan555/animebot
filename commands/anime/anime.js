const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: "anime",
    description: "returns detailed results on the first entry on MyAnimeList for the term provided",
    cooldown: 5,
    args: true,
    async execute(message, args) {
        const querystring = require('querystring');


        if (!args.length) return message.channel.send('You need to supply a search term!');
	    const query = querystring.stringify({ term: args.join(' ') });

        const { results } = await fetch(`https://api.jikan.moe/v3/search/anime?q=${args}`).then(response => response.json());  
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`MyAnimeList Top Result For ${args}`)
            .setDescription(`[${results[0].title}](${results[0].url})\n**Rating**: ${results[0].score}/10\n**Episodes**: ${results[0].episodes}\n**Type**: ${results[0].type}
            \n**Synopsis**: ${results[0].synopsis}\n**Originally Aired**: ${results[0].start_date}`)
            .setThumbnail(results[0].image_url)

        message.channel.send(embed);
    }
}
