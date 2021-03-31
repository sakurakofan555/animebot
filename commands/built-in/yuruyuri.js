module.exports = {
    name: 'test',
    aliases: ['testing', 'bestshow'],
    description: 'test comand',
    cooldown: 1,
    guildOnly: true,
    args: true,
    usage: "sneed",
    execute(msg, args) {
        if (args[0] === 'best'){
        msg.channel.send('yuru yuri');
    }
    },
};