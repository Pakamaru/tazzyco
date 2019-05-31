const { Client, Collection } = require('discord.js');
const token = require('./config').token;
const fs = require("fs");
const client = new Client();

client.commands = new Collection();
client.mongoose = require('./utils/mongoose.js');
require('./utils/function.js')(client);

fs.readdir('src/events/', async (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`The event ${eventName} is loaded in.`);
        client.on(eventName, event.bind(null, client));
    })
});

fs.readdir('src/commands/', async (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`The command ${commandName} is loaded in.`);
        client.commands.set(commandName, props);
    })
});

client.mongoose.init();
client.login(token);