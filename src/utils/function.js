var Datastore = require('nedb')
    , db = new Datastore({ filename: './tazzyco.nedb', autoload: true });
const Donation = require('../models/Donation.js');
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

    client.createDonation = async (settings, channel) => {
        const all = Object.assign(settings);
        const newDonation = await new Donation(all);
        return newDonation.save()
            .then(client.normalMessge(`New donationholder is saved`, channel));
    };

    client.updateDonation = (user, settings) => {
        let donation = client.getDonation(user);

        if(typeof donation != 'object') donation = {};
        for(const key in settings){
            if(donation[key] !== settings[key]) donation[key] = settings[key];
            else return ;
        }
        return await Donation.updateOne(donation);


        return new Promise((resolve, reject) => {
            db.update({ user_id: settings.user_id },  settings , { upsert: true }, (err, numReplaced, affectedDocs, isUpsert) => {
                //TODO: Try catch in other file
                if (isUpsert) client.normalMessge("New profile created");
            });
        });


    };


    client.deleteDonation = async (user) => {

    };

    client.errorMessage = (message, channel) => {
        let errorMsg = new discord.RichEmbed()
            .setDescription(`Error:\n${message}`)
            .setColor('#ff2626')
        channel.send(errorMsg);
    }

    client.normalMessge = (message, channel) => {
        let normalMessage = new discord.RichEmbed()
            .setDescription(message)
            .setColor('#285eff');
    }

    client.showPlayerCard = (channel, user, donation) => {
        let playercard = new discord.RichEmbed()
            .setTitle(`Playercard for ${user.username}`)
            .setThumbnail(user.avatarURL)
            .setColor('#7fff16')
            .addField(`Total donations: ${donation.money+donation.contribution}`, `Total money donated: ${donation.money}\nTotal faction contribution: ${donation.contribution}`)
        return channel.send(playercard);
    }

};