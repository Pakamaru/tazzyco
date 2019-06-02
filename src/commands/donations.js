const Donation = require("../models/Donation.js");

exports.run = async (client, message, args, role) => {
    if(role !== "admin") return client.errorMessage("You do not have permissions for this command", message.channel);
    let user;
    message.mentions.users.forEach(function(guildMember) {
        user = guildMember;
    });
    if(!user) return client.errorMessage("Please give a user", message.channel);
    if(args[0] !== "money" && args[0] !== "contribution") return client.errorMessage("Would you like to modify the money or the contribution");
    if(args[1] !== "add" && args[1] !== "remove") return client.errorMessage("Would you like to remove or add balance to the user");
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
    name: "donations",
    rank: "admin",
    desc: "Allows an administrator to remove or add money or contribution points from or to a user",
    guide: "#donations [type:money/contribution] [todo:add/remove] [user] [amount:as a number]"
};

async function updateDonation(client, user, type, todo, amount, channel){
    let donation;
    try {
        donation = await client.getDonation(user);
    } catch (e) {
        client.errorMessage("This user has no donation profile yet", channel);
    }
    const amt = parseInt(amount, 10);
    const newDonation = new Donation(user.id, 0, 0);
    if(!donation){
        try {
            await client.createDonation(newDonation);
            return client.normalMessage(`New profile for ${user.username+user.tag} has been saved`, channel);
        } catch (e) {
            console.error(e);
            return client.errorMessage("Something went wrong")
        }
    }

    const newAmount = ((todo === "add")?donation.money + amt: donation.money - amt);
    if(type === "money"){
        try {
            await client.updateDonation(user, {money: newAmount});
            return client.normalMessage('Succesfully '+ ((todo === "add")?`added ${amount} to`:`removed ${amount} from`) +` ${user.username} their account`, channel);
        } catch (e) {
            console.error(e);
            return client.errorMessage("This user has no donation profile yet", channel);
        }
    }
    else if(type === "contribution"){
        try {
            await client.updateDonation(user, {contribution: newAmount});
            return client.normalMessage('Succesfully '+ ((todo === "add")?`added ${amount} to`:`removed ${amount} from`) +` ${user.username} their account`, channel);
        } catch (e) {
            console.error(e);
            return client.errorMessage("This user has no donation profile yet", channel);
        }
    }
}