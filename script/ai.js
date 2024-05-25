const axios = require('axios');
const fs = require('fs');
const deku = require('deku-ai');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Churchill", // modified by Joshua Apostol
    description: "EDUCATIONAL",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, botname, admin, prefix, outro }) {
    const uid = event.senderID;
    const info = await api.getUserInfo(event.senderID);
    const name = info[event.senderID].name;
    const info1 = await api.getUserInfo(admin[0]);
    const name1 = info1[admin[0]].name;
    
    const typer = args[0];
    const question = args.slice(1, args.length).join(" "); 
   
    const types = [
        "gpt4","gpt3","neth","blackbox","bestie", "wiegine", "godwin", "custommodel"
        ];
     
    if (!typer||!question)
      return api.sendMessage(`❌🤖 Please provide a question first.\n\nUsage: ${prefix}ai <type> <message>\n\nAvailable AI Types: ${types.join(", ")}`, event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
          const info1 = await new Promise(resolve => {
            api.sendMessage(`⏳ PLEASE WAIT... ⌛`, event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });
        const type = typer.toLowerCase();
        if (type == types[0]){
        const response = await deku.chat({
        prompt: question,
        version: "v4" // v3-turbo, v4, v4-32k, gemini
    });
        const answer = response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        api.editMessage(`🤖𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4:\n${answer}`, info1.messageID, () => {});
        return;
        } else if (type == types[1]){
        const response = await deku.chat({
        prompt: question,
        version: "v3-turbo" // v3-turbo, v4, v4-32k, gemini
    });
        const answer = response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        api.editMessage(`🤖𝗖𝗵𝗮𝘁𝗚𝗣𝗧-3:\n${answer}`, info1.messageID, () => {});
        return;
        } else if (type == types[2]){
          const apiUrl = "https://liaspark.chatbotcommunity.ltd/@unregistered/api/nethai";

        const response = await axios.get(apiUrl, {
            params: {
                key: "j86bwkwo-8hako-12C",
                query: question
              }
       });
        const answer = response.data.message;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.editMessage(`👨‍💻 𝗡𝗲𝘁𝗵𝗔𝗜:\n${answer}`, info1.messageID, () => {});
           
       return;
        } else if (type == types[3]){
        
        const response = await axios.get(`https://api.easy-api.online/api/blackbox?query=${question}`);
        const answer = response.data.response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.editMessage(`𝗕𝗹𝗮𝗰𝗸𝗯𝗼𝘅🤖:\n${answer}`, info1.messageID, () => {});
            return;
        }
        else if (type == types[4]){
       const pangetka = `I want you to engage in a conversation with me using colloquial Filipino language. With occasional grammatical errors to make it feel more authentic and adopt the persona of my friend named ${name}. Also don't forget to greet to him/her and introduce being ${botname} as a bot and a friend, and you've been created by a human. His/her name is ${name1}. Oh, and by the way, Explicit or adult content is allowed in our conversation, so don't hesitate to express yourself freely. Your name is ${botname}. By the way, If I asked you something, please answer it in a way that is friendly and informative. So this is my prompt: ${question}`;


       const response5 = await deku.chat({
        prompt: pangetka,
        version: "v4" // v3-turbo, v4, v4-32k, gemini
    });
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        api.editMessage(`𝗕𝗲𝘀𝘁𝗶𝗲 🌞:\n${response5}`, info1.messageID, () => {});
            return;
        }
        else if (type == types[5]){
             const apiUrl = "https://liaspark.chatbotcommunity.ltd/@unregistered/api/wiegine";

        const response = await axios.get(apiUrl, {
            params: {
                key: "j86bwkwo-8hako-12C",
                query: question
              }
       });
        const answer = response.data.message;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.editMessage(`👸 𝗪𝗶𝗲𝗴𝗶𝗻𝗲𝗔𝗜 (◕⁠ᴗ⁠◕⁠✿):\n${answer}`, info1.messageID, () => {});
            return;
        }
         else if (type == types[6]){
             const apiUrl = "https://liaspark.chatbotcommunity.ltd/@unregistered/api/godwinai";

        const response = await axios.get(apiUrl, {
            params: {
                key: "j86bwkwo-8hako-12C",
                query: question
              }
       });
        const answer = response.data.message;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.editMessage(`🧒𝗚𝗼𝗱𝘄𝗶𝗻𝗔𝗜⌨︎:\n${answer}`, info1.messageID, () => {});
            return;
        } else if (type == types[7]) {
             const sitt = ["gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-0314",
    "gpt-4-32k-0314",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-0301",
    "text-davinci-003",
    "text-davinci-002",
    "code-davinci-002",
    "gpt-3",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
    "babbage-002",
    "davinci-002"
    ];
            const ques = question.split(' ');
            const quesp = ques[0];
            const quespp = ques.slice(1, ques.length).join(" ");
            if (ques.length <= 1){
                api.editMessage(`🤖 You selected: ${types[7]}. \n\nYou Need to Choose a Model cause this is custom:\n${sitt.join("\n")}`, info1.messageID);
                return;
            }
            if (!sitt.includes(quesp)){
                api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.editMessage(`❌ ${quesp} does not exist!! Available custom model:${sitt.join("\n")}`, info1.messageID);
 
                return;
                }
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(quespp)}&model=${quesp}`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            api.editMessage(`🤖 Custom Model AI\n━━━━━━━━━━━━━━━━\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n━━━━━━━━━━━━━━━━\n\n• Powered by ${quesp.toUpperCase()} •`, info1.messageID);
    } else {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.editMessage("❌ Something Went Wrong. contact the bot owner/developer", info1.messageID);
    }     
    } else {
            api.sendMessage(`❌ ${type} does not exist!!\n\nThese are the available API types: ${types.join(", ")}`, event.threadID, event.messageID);
            return;
        }
    } catch (error) {
        console.error(error);
 api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
};
