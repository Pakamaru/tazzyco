var Datastore = require('nedb')
    , db = new Datastore({ filename: './tazzyco.nedb', autoload: true });
const discord = require('discord.js');

module.exports = client => {
    client.getDonation = (user) => {
        return new Promise((resolve, reject) => {
            db.findOne({user_id: user.id}, (err, doc) => {
                if(!doc) return reject(err);
                return resolve(doc);
            });
        });
    };

    client.createDonation = (settings) => {
        return new Promise((resolve, reject) => {
            db.insert(settings);
            db.findOne({user_id: settings.user_id}, (err, doc) => {
                if(!doc) return reject(err);
                return resolve(doc);
            });
        });
    };

    client.updateDonation = (user, settings) => {
        return new Promise((resolve, reject) => {
            db.update({ user_id: user.id }, { $set: settings } , {}, (err, numReplaced) => {
                if (numReplaced == 0) return reject(err);
                if (numReplaced == 1) return resolve();
            });
        });


    };


    client.deleteDonation = async (user) => {

    };

    client.errorMessage = (message, channel) => {
        let errorMsg = new discord.RichEmbed()
            .setDescription(`Error:\n${message}`)
            .setColor('#ff2626');
        channel.send(errorMsg);
    };

    client.wrongCommandMessage = (message, channel) => {
        let errorMsg = new discord.RichEmbed()
            .setDescription(`Error:\n${message}\n#help for a list of commands`)
            .setColor('#7d1c80');
        channel.send(errorMsg);
    };

    client.normalMessage = (message, channel) => {
        let normalMessage = new discord.RichEmbed()
            .setDescription(message)
            .setColor('#285eff');
        channel.send(normalMessage);
    };

    client.helpMessage = (user, defaultCommands, adminCommands) => {
        let helpMessage = "```css\n" +
            "This is a list of commands\n" +
            "For more information you can message the developer :o\n\n" +
            "Default commands:\n";
            defaultCommands.forEach(defaultCommand => {
                helpMessage += defaultCommand.help.desc + " Usage:\n" + defaultCommand.help.guide + "\n";
            });
            helpMessage += "\nAdmin commands:";
            adminCommands.forEach(adminCommand => {
                helpMessage += adminCommand.help.desc + " Usage:\n" + adminCommand.help.guide + "\n";
            });
            helpMessage += "\n```";
        user.send(helpMessage);
    };

    client.showPlayerCard = (channel, user, donation) => {
        let playercard = new discord.RichEmbed()
            .setTitle(`Playercard for ${user.username}`)
            .setThumbnail(user.avatarURL)
            .setColor('#7fff16')
            .setFooter(`This profile belongs to ${user.username}`, client.user.avatarURL)
            .addField(`Total donations: ${donation.money+donation.contribution}`, `Total money donated: ${donation.money}\nTotal faction contribution: ${donation.contribution}`)
        return channel.send(playercard);
    }

};