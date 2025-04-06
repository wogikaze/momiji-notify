const fetch = require('node-fetch');
const { URL, CHANNEL_ID} = require('../config.json');

let lastContent = '';

module.exports = async function startWatcher(client) {
  setInterval(async () => {
    try {
      const res = await fetch(URL);
      const text = await res.text();

      if (lastContent && text !== lastContent) {
        const channel = await client.channels.fetch(CHANNEL_ID);
        channel.send(`🔔 サイトが変更されました！: ${URL}`);
      }

      lastContent = text;
    } catch (err) {
      console.error('[watcher] 取得失敗:', err);
    }
  }, 10 * 60 * 1000); // 10分おき
};
