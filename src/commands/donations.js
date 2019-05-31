exports.run = async (client, message, args) => {
    let user;
    message.mentions.users.forEach(function(guildMember) {
        user = guildMember;
    });
    if(!user) return client.errorMessage("Please give a user\n#help for a list of commands\n", message.channel);
    if(args[0] == "money"){
        if(args[1] == "add"){
            try {
                await updateDonation(client, user, "money", "add", args[3], message.channel);
            } catch (e) {
                return console.error(e);
            }
        }else if(args[1] == "remove"){
            try {
                await updateDonation(client, user, "money", "remove", args[3], message.channel);
            } catch (e) {
                return console.error(e);
            }
        }
    }else if(args[0] == "contribution"){
        if(args[1] == "add"){
            try {
                await updateDonation(client, user, "contribution", "add", args[3], message.channel);
            } catch (e) {
                return console.error(e);
            }
        }else if(args[1] == "remove"){
            try {
                await updateDonation(client, user, "contribution", "remove", args[3], message.channel);
            } catch (e) {
                return console.error(e);
            }
        }
    }
};

exports.help = {
    name: "donations"
};

async function updateDonation(client, user, type, todo, amount, channel){
    const donation = await client.getDonation(user);
    const amt = parseInt(amount, 10);
    const newDonation = {
        user_id: user.id,
        contribution: 0,
        money: 0
    };
    if(!donation){
        await client.createDonation(newDonation, channel);
    }

    if(type === "money"){
        const newAmount = donation.money + amt;
        await client.updateDonation(user, {money: newAmount});
    }
    else if(type === "contribution"){
        const newAmount = donation.contribution + amt;
        await client.updateDonation(user, {contribution: newAmount});
    }
}