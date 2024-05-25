const axios = require("axios");

module.exports.config = {
    name: "gemini",
    role: 0,
    credits: "joshua Apostol",
    description: "Talk to Gemini (conversational)",
    hasPrefix: true,
    version: "5.6.7",
    aliases: ["bard"],
    usage: "gemini [prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    let prompt = args.join(" "),
        uid = event.senderID,
        url;
  
    if (!prompt) return api.sendMessage(`Please enter a prompt.`, event.threadID);

  let replyUrl = "";
  if (event.type == "message"){
    replyUrl = "prompt=" + encodeURIComponent(prompt);
  } else if (event.type == "message_reply"){
    replyUrl = `prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(event.messageReply.attachments[0].url)}`;
  }
  
api.setMessageReaction("⏳", event.messageID, () => {}, true);

  const info1 = await new Promise(resolve => {
    api.sendMessage("🔍 Gemini is searching for your question...", event.threadID, (err, info1) => {
    resolve(info1);
      api.sendTypingIndicator(event.threadID);
   }, event.messageID);
  });
  
    try {
      const geminiApi = `https://deku-rest-api.vercel.app/gemini`;
      const response = await axios.get(`${geminiApi}?${replyUrl}&uid=${uid}`); 
      const answer = response.data.gemini;
      const info = await api.getUserInfo(event.senderID);
      const name = info[event.senderID].name
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      const gemq = `❓ ${name} questioned: ${prompt}\n\n🤖: ${answer}`
      api.editMessage(gemq, info1.messageID, () => {});
         return;
    } catch (error) {
        console.error(error);
        return api.sendMessage('❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that\'s causing the problem, and it might resolve on retrying.', event.threadID);
    }
};
