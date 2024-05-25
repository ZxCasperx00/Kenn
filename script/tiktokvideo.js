const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
    name: "tiktokvideo",
    version: "1.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Downloads fb videos",
    usages: "tiktokvideo [link]",
    usePrefix: true,
};

module.exports.run = async function ({ api, event, args }) {
    const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
     const link = args.join(" ");
    if (!link){
        return api.sendMessage("Please reply a tiktok link.", event.threadID, event.messageID);
    }                                    if (regEx_tiktok.test(link)) {
                                                api.setMessageReaction("⏳", event.messageID, () => { }, true);
        api.sendMessage(`⌛ Downloading video, please wait...`, event.threadID, event.messageID);

                                                axios.post(`https://www.tikwm.com/api/`, {
                                                    url: link
                                                }).then(async response => { // Added async keyword
                                                    const data = response.data.data;
                                                    const videoStream = await axios({
                                                        method: 'get',
                                                        url: data.play,
                                                        responseType: 'stream'
                                                    }).then(res => res.data);
                                                    const fileName = `TikTok-${Date.now()}.mp4`;
                                                    const filePath = `./${fileName}`;
                                                    const videoFile = fs.createWriteStream(filePath);

                                                    videoStream.pipe(videoFile);

                                                    videoFile.on('finish', () => {
                                                        videoFile.close(() => {
                            
                                         api.setMessageReaction("✅", event.messageID, () => {}, true);                   api.sendMessage({
                                                                body: `TikTok Video downloaded✅\n\nTitle: ${data.title}\n\nLikes: ${data.digg_count}\n\nComments: ${data.comment_count}`,
                                                                attachment: fs.createReadStream(filePath)
                                                            }, event.threadID, () => {
                                                                fs.unlinkSync(filePath);  // Delete the video file after sending it
                                                            });
                                                        });
                                                    });
                                                }).catch(error => {
                                                    api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
                                                });
                                            }
};
