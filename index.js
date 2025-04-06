const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token, commands } = require('./config.json');
const startWatcher = require('./commands/watcher');
const client = new Client({
    intents: [
        // GatewayIntentBits.MessageContent,
        // GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const files = commands.map(n => require(`./commands/${n}`))

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, c => {
    console.log(`準備OKです! ${c.user.tag}がログインします。`);
});


client.once("ready", async () => {
    console.log(files.map(f => f.data.name))

    await startWatcher(client);
})
client.on(Events.InteractionCreate, async interaction => {

    if (files.map(f => f.data.name).includes(interaction.commandName)) {
        cmdFile = files[files.map(f => f.data.name).indexOf(interaction.commandName)]
        try {
            await cmdFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

// ログインします
client.login(token);
