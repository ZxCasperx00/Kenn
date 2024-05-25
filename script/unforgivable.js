module.exports.config = {
  name: "unforgivable",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Neth",
  description: "Popcat api",
  usages: "{p}unforgivable [query]",
  cooldowns: 5,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const {
  threadID,
  messageID
  } = event;
  const query = args.join(" ");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_Unforgivableshit.png`;
  if (!query){
    return api.sendMessage("Input Query First!\nExample: [prefix]unforgivable hello neth", threadID, messageID);
  }
  api.setMessageReaction("😵‍💫", event.messageID, () => {}, true);
  const url = (await axios.get(`https://api.popcat.xyz/unforgivable?text=${query}`, {
  responseType: 'arraybuffer'
  })).data;
  fs.writeFileSync(path, Buffer.from(url, "utf-8"));
  api.setMessageReaction("👌", event.messageID, () => {}, true);
  setTimeout(function() {
  api.sendMessage({
    body: "So you know how some sins are unforgivable? 🧐",
    attachment: fs.createReadStream(path)
    }, threadID,
    () => {
    setTimeout(() => {
    fs.unlinkSync(path);
    }, 5*1000);
    }, messageID);
    }, 5*1000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
