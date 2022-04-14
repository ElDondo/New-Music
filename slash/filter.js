const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Applies an audio filter (bassboost, earrape, nightcore, 8d)")
        .addStringOption((option) => option.setName("filter").setDescription("the filter name").setRequired(true)),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        let filter = interaction.options.getString("filter")
        let reply = "Applied filter: " + filter

        switch(filter) {
            case "earrape":
                await queue.setFilters({
                    earrape: !queue.getFiltersEnabled().includes(filter)
                });
                reply = "Applied filter: " + filter
                if (!queue.getFiltersEnabled().includes(filter)) {
                    reply = "Disabled filter: " + filter
                }
                break;
            case "nightcore":
                await queue.setFilters({
                    nightcore: !queue.getFiltersEnabled().includes(filter)
                });
                reply = "Applied filter: " + filter
                if (!queue.getFiltersEnabled().includes(filter)) {
                    reply = "Disabled filter: " + filter
                }
                break;
            case "bassboost":
                await queue.setFilters({
                    bassboost_high: !queue.getFiltersEnabled().includes('bassboost_high')
                });
                reply = "Applied filter: " + filter
                if (!queue.getFiltersEnabled().includes('bassboost_high')) {
                    reply = "Disabled filter: " + filter
                }
                break;
            case "8d":
                await queue.setFilters({
                    '8D': !queue.getFiltersEnabled().includes('8D')
                });
                reply = "Applied filter: " + '8D'
                if (!queue.getFiltersEnabled().includes('8D')) {
                    reply = "Disabled filter: " + '8D'
                }
                break;
            default:
                reply = ("Unknown filter!")
        }

        await interaction.editReply(reply)
    }
}