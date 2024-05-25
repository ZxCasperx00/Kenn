module.exports.config = {
  name: "neko",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Neth",
  description: "Neko images, with NSFW on/off(admin only).",
  usages: "{p}neko [turn on/off nsfw]",
  cooldown: 0
};

let nsfw = false;

module.exports.run = async ({ api, event, args, admin }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const {
  threadID,
  messageID
  } = event;
  const query = args.join(" ");
    if (query && query.toLowerCase() === 'nsfw') {
        if (admin[0] == event.senderID){
        nsfw = nsfw;
        const statusMsg = nsfw ? 'NSFW mode is now ON.' : 'NSFW mode is now OFF.';
        api.sendMessage(statusMsg, threadID, messageID);
        } else {
        api.sendMessage("Only admins can access this command", threadID, messageID);
        }
        return;
      } else { api.sendMessage('Finding neko images...', threadID, messageID);
    }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_Ughhhhh.png`;
  
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  const fuck = nsfw ? 'neko1' : 'neko';
  const url = (await axios.get(`https://deku-rest-api.vercel.app/${fuck}`, {
  responseType: 'arraybuffer'
  })).data;
  fs.writeFileSync(path, Buffer.from(url, "utf-8"));
  api.setMessageReaction("✅", event.messageID, () => {}, true);
  api.sendMessage({
    body: nsfw ? "Magjajabol nayan! 🥵" : "Neko image 🧸",
    attachment: fs.createReadStream(path)
    }, threadID,
    () => {
    setTimeout(() => {
    fs.unlinkSync(path);
    }, 5*1000);
    }, messageID);
    } catch (error) {
      console.error(error);
    api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
