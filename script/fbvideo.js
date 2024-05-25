const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
    name: "fbvideo",
    version: "1.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Downloads fb videos",
    usages: "fbdown [link]",
    usePrefix: true,
};

module.exports.run = async function ({ api, event, args }) {
      const arg = args.join(' ');
      if (!arg || !arg.includes("facebook.com")){
        api.sendMessage(`Please provide a Facebook video link.`, event.threadID, event.messageID);
        return;
      } 
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
        api.sendMessage(`⌛ Downloading video, please wait...`, event.threadID, event.messageID);
        const getFBInfo = require("@xaviabot/fb-downloader");

        getFBInfo(arg)
            .then(async (result) => {
                const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                const pathh = __dirname + '/cache/' + `${timestamp}_facebookvideo.mp4`;
                const dl = await axios.get(result.hd, { responseType: "arraybuffer" });
                fs.writeFileSync(pathh, Buffer.from(dl.data, "utf-8"));
                api.setMessageReaction("✅", event.messageID, () => {}, true);
                api.sendMessage({
                body: `✅ Facebook Video Downloaded Successfully\n\nTitle: ${result.title}`,
                attachment: fs.createReadStream(pathh)
                }, event.threadID, () => {
                setTimeout(() => {
                fs.unlinkSync(pathh);
                }, 5*1000);
                }, event.messageID);
            })
            .catch((err) => {
            api.sendMessage(`An error occurred while processing your request.`, event.threadID, event.messageID);

            });
};
