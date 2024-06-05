const axios = require('axios');
const fs = require('fs');

let fontEnabled = true;

function formatFont(text) { 
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (fontEnabled && char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Modify by Marky",
    description: "Talk to GPT4 CONTINUES AI",
    usePrefix: true,
    commandCategory: "AI",
    usages: " [question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, botname, admin}) {
    const prompt = args.join(' '), id = event.senderID
   
    if (!prompt)
      return api.sendMessage("Please provide a question first.", event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
        const info1 = await new Promise(resolve => {
        api.sendMessage("⏳ Please bear with me while I ponder your request...", event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });

        const uid = event.senderID;
        const info = await api.getUserInfo(event.senderID);
        const name = formatFont(info[event.senderID].name);

      const userInput = encodeURIComponent(prompt);

        const apiUrl = `https://markdevs-last-api-4437ab147726.herokuapp.com/gpt4?prompt=${prompt}&uid=${id}`;
        
        const respons = await axios.get(apiUrl);
        const answer = formatFont(respons.data.gpt4);
        api.setMessageReaction("✅", event.messageID, () => {}, true);
    const mark = `📦 𝙶𝙿𝚃4+ 𝙲𝙾𝙽𝚃𝙸𝙽𝚄𝙴𝚂 𝙰𝙸\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`;
      api.editMessage(mark, info1.messageID, () => {});
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
