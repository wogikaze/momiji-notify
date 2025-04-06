const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hey')
		.setDescription('hey!'),
	execute: async function (interaction) {
		await interaction.reply('hey Discord.');
	},
};
