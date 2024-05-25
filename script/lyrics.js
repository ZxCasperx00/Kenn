const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'lyrics',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "Get a song lyrics",
  usage: "lyrics [song]",
  credits: 'Neth',
  // Cmd created, API by popcat
  // MAMALASIN KA KUNG TANGGALIN MO ANG CREDITS
  cooldown: 2,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
    try {
            const song = encodeURIComponent(args.join(" "));
            if (!song) {
            return api.sendMessage("🎵 Please enter a song.", event.threadID, event.messageID);
            }
            api.sendMessage("🎵 Please wait...", event.threadID, event.messageID);
            const apiUrl = "https://api.popcat.xyz/lyrics?song=";
            const response = await axios.get(apiUrl + song);
            const responseData = response.data;
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const pathPic = __dirname + '/cache/' + `${timestamp}_LyricsNethie.png`;
            const getPicture = (await axios.get(responseData.image, {
            responseType: 'arraybuffer'
            })).data;
            fs.writeFileSync(pathPic, Buffer.from(getPicture, 'utf-8'));
            return api.sendMessage({
             body: `🎵: ${responseData.title}, by: ${responseData.artist}\n${responseData.lyrics}`,
             attachment: fs.createReadStream(pathPic)
             }, event.threadID, () => fs.unlinkSync(pathPic), event.messageID);
              } catch (error) {
            console.error(error);
            return api.sendMessage(error.message, event.threadID, event.messageID);
        }
};
