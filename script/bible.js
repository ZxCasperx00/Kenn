const axios = require("axios");

module.exports.config = {
    name: "bible",
    version: "1.0.0",
    role: 0,
    credits: "churchill",
    description: "Get a random Bible verse.",
    hasPrefix: true,
    aliases: ["bibleverse", "randombibleverse"],
    usage: "",
    cooldown: 3,
};

module.exports.run = async function({ api, event }) {
    try {

    const info = await new Promise(resolve => {
            api.sendMessage("⏱️ | Fetching a random Bible verse, please wait...", event.threadID, (err, info) => {
            resolve(info);
           }, event.messageID);
          });
       
        const response = await axios.get("https://labs.bible.org/api/?passage=random&type=json");
        const bookname = response.data[0].bookname;
        const chapter = response.data[0].chapter;
        const verse = response.data[0].verse;
        const text = response.data[0].text;

      const message = `📖 ${bookname} ${chapter}:${verse}\n\n${text}`;
        api.setMessageReaction("😇", event.messageID, () => {}, true);
      api.editMessage(message, info.messageID, () => {
          
      });
    } catch (error) {
        api.sendMessage("An error occurred while fetching the Bible verse.", event.threadID);
    }
};