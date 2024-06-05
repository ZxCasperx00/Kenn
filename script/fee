const moment = require ("moment-timezone");

module.exports.config = {
    name: "feedback",
    version: "1.0.0",
    role: 0,
    credits: "Kenneth Aceberos", //mamalasin ka kapag palitan mo ito
    description: "Sends a feedback to the bot admin and developer.",
    usePrefix: true,
    usages: "Reply a text. then type {p}feedback",
    cooldown: 0
};

module.exports.run = async function ({ api, event, botname, admin }) {
const time = moment.tz("Asia/Manila").format("HH:mm:ss - DD/MM/YYYY");
  if (event.type !== "message_reply"){
    return api.sendMessage("❌ No text detected. Reply the chat that you want to send to feedback.", event.threadID, event.messageID);
  }

  const txt = event.messageReply.body;

     try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
      const info = await new Promise(resolve => {
        api.sendMessage("⏳ Please wait...", event.threadID, (err, info) => {
        resolve(info);
       }, event.messageID);
      });
  const neth = await api.getUserInfo(event.senderID);
       const nethName1 = neth[event.senderID].name;
       const txt11 = `👤 Hello You got a feedback/message!!!\n\nFrom: ${nethName1}\n\nMessage:\n${txt}\nTime sent: ${time}\n\n🤖PROJECT BOTIFY🤖`
       const adminNeth = "100015801404865";
      api.sendMessage(txt11, admin[0], (err, data) => {

        if (event.senderID !== adminNeth){
        api.sendMessage(txt11, adminNeth);
        }
           if (err){    api.setMessageReaction("🤷", event.messageID, () => {}, true);
             return api.editMessage(`Failed to send feedback❌`, info.messageID, (err, data) => {});
           }
         api.setMessageReaction("✅", event.messageID, () => {}, true);
           api.editMessage(`Feedback sent to bot admin and developer success.`, info.messageID, (err, data) => {});
         });

    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
