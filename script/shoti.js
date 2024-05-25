module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  hasPermission: 0,
  credits: "libyzxy0",
  //Modified by Neth
  description: "Generate a random shoti video, for simps.",
  usage: "{p}shoti",
  cooldowns: 0,
  usePrefix: true,
};

module.exports.run = async ({ api, event, args }) => {
 // return;
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
  api.sendTypingIndicator(event.threadID, true);
  const {
  messageID,
  threadID
  } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");

  if (!prompt[0]) {
  api.sendMessage("Downloading...", threadID, messageID);
  }

 try {
  const response = await axios.post(`https://shoti-srv1.onrender.com/api/v1/get`, {
    apikey: `$shoti-1hsh6lalkkv4u5mpj9o`
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_shoti.mp4`;
  const file = fs.createWriteStream(path);
  const rqs = request(encodeURI(response.data.data.url));
  rqs.pipe(file);
  file.on(`finish`, () => {
     setTimeout(function() {
       api.setMessageReaction("✅", event.messageID, (err) => {
          }, true);
      return api.sendMessage({
      body: `💋 SHOTI Downloaded\n\nUsername: @${response.data.data.user.username}\nNickname: ${response.data.data.user.nickname}\nUser ID: ${response.data.data.user.userID}\nDuration: ${response.data.data.duration}`, 
      attachment: fs.createReadStream(path)
      }, threadID, () => {
        setTimeout(() => {
        fs.unlinkSync(path);
        }, 5*1000);
      }, messageID);
      }, 5000);
        });
  file.on(`error`, (err) => {
      api.sendMessage(`Error: ${err}`, threadID, messageID);
  });
   } catch (err) {
    api.sendMessage(`Error: ${err}`, threadID, messageID);
  };
};
