const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: "search",
    description: "search for an anime",
    cooldown: 5,
    args: true,
    async execute(message, args) {
        const querystring = require('querystring');


        if (!args.length) return message.channel.send('You need to supply a search term!');
	    const query = querystring.stringify({ term: args.join(' ') });

        const { results } = await fetch(`https://api.jikan.moe/v3/search/anime?q=${args}`).then(response => response.json());  
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`First Five MyAnimeList Search Results For ${args}`)
            .setDescription(`[${results[0].title}](${results[0].url})\n**Rating**: ${results[0].score}/10\n   **Episodes**: ${results[0].episodes}\n     **Type**: ${results[0].type}
            \n[${results[1].title}](${results[1].url})\n**Rating**: ${results[1].score}/10\n**Episodes**: ${results[1].episodes}\n    **Type**: ${results[1].type}
            \n[${results[2].title}](${results[2].url})\n**Rating**: ${results[2].score}/10\n**Episodes**: ${results[2].episodes}\n     **Type**: ${results[2].type}
            \n[${results[3].title}](${results[3].url})\n**Rating**: ${results[3].score}/10\n**Episodes**: ${results[3].episodes}\n     **Type**: ${results[3].type}
            \n[${results[4].title}](${results[4].url})\n**Rating**: ${results[4].score}/10\n**Episodes**: ${results[4].episodes}\n     **Type**: ${results[4].type}
            \n`)
            .setThumbnail(results[0].image_url)

        message.channel.send(embed);
    }
}
