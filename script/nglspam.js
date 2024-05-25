const axios = require('axios')
const {
v4: uuidv4
} = require('uuid');

module.exports.config = {
    name: "nglspam",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Neth",
    // code: by Joshua Sy
    description: "to Spam NGL Messages",
    usePrefix: true,
    commandCategory: "Spam",
    usages: "nglspam [username] [message] [amount]",
    cooldown: 20
};

module.exports.run = async ({ api, event, args }) => {
const uuid = uuidv4();
try {
    if (args.length < 3) {
      api.sendMessage('[NGL] ❌ Insufficient arguments. Usage: nglspam [username] [message] [amount]', event.threadID, event.messageID);
      return;
    }

    const username = args.shift();
    const message = args.slice(0, -1).join(" "); 
    const spamCount = parseInt(args[args.length - 1]); 

    if (isNaN(spamCount) || spamCount <= 0) {
      api.sendMessage('[NGL] Invalid amount. Please provide a valid positive number.', event.threadID, event.messageID);
      return;
    }
    if (spamCount > 200){
      api.sendMessage('[NGL] Spam count limit is 200.', event.threadID, event.messageID);
      return;
    }
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
    api.sendMessage(`[NGL] Spamming to: ${username}\nYour message: ${message}\n\n📩 Sending, Please wait...\n\n⏳ Cooldown is 20 seconds before you can use it again to prevent abuse`, event.threadID, (err, info) => {
      spam(info, username, spamCount, message);

}, event.messageID);
async function spam(info, username, amount, message){
process.on("unhandledRejection", (error) => console.error(error));
const headers = {
      'referer': `https://ngl.link/${username}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
      'username': username,
      'question': message,
      'deviceId': uuid,//'ea356443-ab18-4a49-b590-bd8f96b994ee',
      'gameSlug': '',
      'referrer': '',
    };

    let count = 0;
  
    const interval = setInterval(async () => {
      if (count >= amount) {
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.editMessage(`[NGL] Successfully sent 📩✅\n${amount} times to: ${username}`, info.messageID, (err, info) => {});
        clearInterval(interval);
        return;
      }
      
      try {
        await axios.post('https://ngl.link/api/submit', data, {
          headers,
        });
       //console.log(`Sent`);
       } catch (e) {
        //console.log('Test');
      }
      count++;
      if (count == 1){
         api.editMessage(`[NGL] Successfully sent to: ${username}\n\nNGL Spam is counting... If it's done, the message will edit and also we will notify you✅`, info.messageID, (err, info) => {});
      }
    }, 2*1000); 
}
} catch (e){
    console.error("ERROR!: " + e);
}
};
