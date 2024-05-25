const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "gender",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Neth",
    description: "Determine gender from a name",
    usePrefix: true,
    usages: "[name]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, botname, admin}) {
    const name = args.join(' ');
    
    if (!name)
      return api.sendMessage("Input your name.", event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
        const KANTUTAN = await api.sendMessage("⏳ Please wait...", event.threadID, event.messageID);

      const userInput = encodeURIComponent(name);

        const apiUrl = `https://deku-rest-api.vercel.app/genderize?name=${userInput}`;
        
        const response = await axios.get(apiUrl);
        const results = response.data;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      const unique = [
        "You have a nice name 💖",
        "Your name is so unique, you're lucky! 🥰",
        "Such a cool name 😎",
        "Your name is...not bad 😁",
        "What a precious name, you're lucky! 🥰"
      ]
      const wie = "Baka gf ni neth yan 🤍😚";
        const NAPAKAPANGET_MO = `Your name is ${name}.\n\nℹ️ Your gender is ${name.toLowerCase() == "wiegine" ? "♀️ Female" : (results.gender == "male" ? "♂️ Male" : "♀️ Female")}\nℹ️Probability : ${name.toLowerCase() == "wiegine" ? "100" : results.probability}%\n\n${name.toLowerCase() == "wiegine" ? wie : unique[Math.floor(Math.random() * unique.length)]}`;
        api.editMessage(NAPAKAPANGET_MO, KANTUTAN.messageID, () => {});
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
