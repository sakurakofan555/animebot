const fetch = require('node-fetch');

module.exports = {
    name: "randomcat",
    description: "returns a picture of a random cat",
    async execute(message) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        console.log(file);
        message.channel.send(file);
    }
}