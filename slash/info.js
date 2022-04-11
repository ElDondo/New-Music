const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

const index = require('../index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Displays info about the currently playing song"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        let bar = queue.createProgressBar({
            queue: false,
            length: 18
        })
        
        const currentDate = new Date();
        const timenow = currentDate.getTime();

        let timestamp = timenow - index.time
        let h = new Date(timestamp).getHours();
        let m = new Date(timestamp).getMinutes();
        let s = new Date(timestamp).getSeconds();

        if (isNaN(parseFloat(h))) {
            h = 1
            m = 0
            s = 0
        }

        h = (h<10) ? '0' + h : h;
        m = (m<10) ? '0' + m : m;
        s = (s<10) ? '0' + s : s;
        h = h-1

        let duration = queue.current.duration
        let split = duration.split(':')
        let dh = "0"
        let dm = "0"
        let ds = "0"
        if (split.length > 2) {
            dh = split[0]
            dm = split[1]
            ds = split[2]
        } else {
            dm = split[0]
            ds = split[1]
        }

        if (dh > 0) {
            dh = (dh<10) ? '0' + dh : dh;
        }
        dm = (dm<10) ? '0' + dm : dm;
        ds = (ds<10) ? '0' + ds : ds;

        //COUNTDOWN TIMER
        //let seconds = Number(h * 3600) + Number(m * 60) + Number(s)
        //let dseconds = Number(dh * 3600) + Number(dm * 60) + Number(ds)

        //let diff = dseconds - seconds
        //console.log(dseconds.toString() + " - " + seconds.toString() + " = " + diff)

        // let hour = Math.floor(diff / 3600)
        // if (hour > 0) {
        //     diff = diff - (hour * 3600)
        // }
        // let min = Math.floor(diff / 60)
        // if (min > 0) {
        //     diff = diff - (60*min)
        // }
        // hour = (hour<10) ? '0' + hour : hour;
        // min = (min<10) ? '0' + min : min;
        // diff = (diff<10) ? '0' + diff : diff;

        //var output =  hour + ':' + min + ':' + diff

        var playTime =  h + ':' + m + ':' + s
        var dTime =  dh + ':' + dm + ':' + ds

        const song = queue.current
        await interaction.editReply({
            embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar + " ᲼ " + playTime + " / " + dTime)]
        })
    }
}