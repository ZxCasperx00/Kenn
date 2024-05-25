const axios = require("axios");
const {
  createReadStream
} = require("fs");
const {
  resolve
} = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "announce",
  version: "1.0.0",
  role: 2,
  hasPrefix: true,
  description: "To announce a message to all groups.",
  usage: "{p}announce",
  credits: "Neth",
  cooldown: 0
};
module.exports.run = async ({
  api,
  event,
  args
}) => {
  const {
    threadID,
    messageID
  } = event;
  const threadList = await api.getThreadList(25, null, ["INBOX"]);
      let sentCount = 0;
      const custom = args.join(" ");
      const neth = moment.tz("Asia/Manila").format("DD/MM/YYYY, HH:mm:ss");
      async function sendMessage(thread) {
        try {
          await api.sendMessage(
            {
              body: `✱:｡✧ 🤖 𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧 🤖 ✧｡:✱
  ━━━━━━━━━━━━━━━━━━━
  ╭┈ ❒ 💬 | 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
  ╰┈➤ ${custom}
  ━━━━━━━━━━━━━━━━━━━
  📅 | 𝗗𝗔𝗧𝗘 & 𝗧𝗜𝗠𝗘: ${neth}`
            },
            thread.threadID);
          sentCount++;
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }

      for (const thread of threadList) {
        if (sentCount >= 20) {
          break;
        }
        if (
          thread.isGroup &&
          thread.name !== thread.threadID &&
          thread.threadID !== event.threadID
        ) {
          await sendMessage(thread);
        }
      }

      if (sentCount > 0) {
        api.sendMessage(`› Sent the notification successfully.`, event.threadID);
      } else {
        api.sendMessage(
          "› No eligible group threads found to send the message to.",
          event.threadID,
        );
      }
    }
