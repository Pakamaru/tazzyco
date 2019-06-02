exports.run = async (client, message, args, role) => {
    let defaultCommands=[], adminCommands=[];
    client.commands.forEach(command => {
        if(command.help.rank === "default") defaultCommands.push(command);
        if(command.help.rank === "admin") adminCommands.push(command);
    });
        client.helpMessage(message.author, defaultCommands, adminCommands);
};

exports.help = {
    name: "help",
    rank: "default",
    desc: "Shows a list of commands via a message to the user DM",
    guide: "#help"
};