exports.run = async (client, message, args, role) => {
    let donations=[];
    try {
        donations = await client.getTopDonations();
    } catch (e) {
        return client.errorMessage("There are no donations", message.channel);
    }
    let output="";
    for(let i = 0; i < donations.length; i++){

        let guildMember = message.guild.members.find(m => m.id === donations[i].user_id);
        output+= `${i+1}. ${donations[i].contribution+donations[i].money} ${(!guildMember)? 'User is not in the server': guildMember.displayName}\n`;
    }
    client.showTopDonations(message.channel, output, donations.length);
};

exports.help = {
    name: "top",
    rank: "default",
    desc: "Shows the top donators of the server",
    guide: "#top"
};