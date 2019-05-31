exports.run = async (client, message, args) => {
    let user;
    message.mentions.users.forEach(function(guildMember) {
        user = guildMember;
    });
    if(!user) user = message.author;
    try {
        const donation = await client.getDonation(user);
        client.showPlayerCard(message.channel, user, donation);
    } catch (e) {
        return client.errorMessage("This user has no donation profile yet", message.channel);
    }
}

exports.help = {
    name: "profile"
};