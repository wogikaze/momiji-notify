// discord.js v14では、下記のようにRESTとRoutesはdiscord.jsパッケージから直接インポートできます
const { REST, Routes } = require('discord.js');
const { commands } = require('./config.json');
const { client_id, server_id, token } = require('./config.json');
console.log(commands)
regist_commands(commands)

function regist_commands(cmdNames) {
    let commands = [];
    cmdNames.forEach(name => {
        const commandfile = require(`./commands/${name}.js`);
        commands.push(commandfile.data.toJSON());
    });

    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {
            await rest.put(
                // Routes.applicationCommands(client_id),
                Routes.applicationGuildCommands(client_id, server_id),
                { body: commands },
                // { body: [] }
            );
            console.log(`${cmdNames}が登録されました！`);
        } catch (error) {
            console.error('コマンドの登録中にエラーが発生しました:', error);
        }
    })();
}
