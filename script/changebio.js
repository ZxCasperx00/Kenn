const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "changebio",
    version: "1.0.0",
    role: 2,
    credits: "Kenneth Aceberos", //mamalasin ka kapag palitan mo ito
    description: "Change a bio on a bot.",
    usePrefix: true,
    usages: "Reply a text. type, {p}changebio",
    cooldown: 0
};

module.exports.run = async function ({ api, event, botname }) {

  if (event.type !== "message_reply"){
    return api.sendMessage("❌ No text detected. Reply the chat that you want to change your bio.", event.threadID, event.messageID);
  }
  
  const txt = event.messageReply.body;
  
    if (txt && txt.length > 101){
      return api.sendMessage(`❌ Max limit is 101 characters`, event.threadID, event.messageID); 
    }
    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
      const info = await new Promise(resolve => {
        api.sendMessage("⏳ Please wait...", event.threadID, (err, info) => {
        resolve(info);
       }, event.messageID);
      });

      api.changeBio(txt, false, (err, data) => {
           if (err){    api.setMessageReaction("🤷", event.messageID, () => {}, true);
             return api.editMessage(`Failed to change bio❌`, info.messageID, (err, data) => {});
           }
         api.setMessageReaction("✅", event.messageID, () => {}, true);
           api.editMessage(`✅ ${botname}'s bio is changed\n\nTry to stalk the bot's profile.`, info.messageID, (err, data) => {});
         });
         
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
