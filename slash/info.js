const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")

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
        const dateStart = index.date
        let secondsDiff = moment(currentDate).diff(moment(dateStart), 'seconds')

        let h = 0
        let m = 0
        let s = 0

        if (Math.floor(secondsDiff / 3600) > 0) {
            if (Math.floor(secondsDiff / 3600 > 100)) {
                secondsDiff = 0
            } else {
                h = Math.floor(secondsDiff / 3600)
                secondsDiff = secondsDiff - (h * 3600)
            }
        }
        if (Math.floor(secondsDiff / 60) > 0) {
            m = Math.floor(secondsDiff / 60)
            secondsDiff = secondsDiff - (m * 60)
        }
        s = secondsDiff

        m = (m<10) ? '0' + m : m;
        s = (s<10) ? '0' + s : s;

        let duration = queue.current.duration
        let split = duration.split(':')

        let dh = 0
        let dm = 0
        let ds = 0

        if (split.length > 2) {
            dh = split[0]
            dm = split[1]
            ds = split[2]
        } else {
            dm = split[0]
            ds = split[1]
        }
        if (dh < 10) {
            dh = dh.substring(1)
        }

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