const {
  createCanvas,
  loadImage
} = require('canvas');
const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
    name: "billboard",
    version: "1.0",
    role: 0,
    hasPrefix: true,
    credits: "John Lester",
    description: "biliboard",
    usage: "[text]",
    cooldowns: 5
};

const wrapText = (ctx, text, maxWidth) => {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
            else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}

module.exports.run = async function({ api, event, args, botname}) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const pathImg = __dirname + '/cache/' + `${timestamp}_billboard.png`
    const text = args.join(" ");

    if (!text) {
    return api.sendMessage("Enter the content of the comment on the board", event.threadID, event.messageID);
    }

    try {
        const getPorn = (await axios.get(`https://i.imgflip.com/8nifzt.jpg`, { responseType: 'arraybuffer' })).data;
        api.setMessageReaction("🧐", event.messageID, () => {}, true);
        fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
        const baseImage = await loadImage(pathImg);
        const canvas = createCanvas(baseImage.width, baseImage.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.font = "bold 400 30px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        let fontSize = 40;
        while (ctx.measureText(text).width > 3800) {
            fontSize--;
            ctx.font = `bold 400 ${fontSize}px Arial`;
        }
        const lines = await wrapText(ctx, text, 500);
        ctx.fillText(lines.join('\n'), 330, 100); // Adjust position
        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        api.setMessageReaction("😆", event.messageID, () => {}, true);
        api.sendMessage({ 
          body: `Sabi nya, ${text}\nEdi sana pinabillboard mo!\n\n🤖 ${botname}:`,
          attachment: fs.createReadStream(pathImg)
}, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
    } catch (error) {
        console.log(error);
        api.sendMessage("An error occurred while processing the command", event.threadID, event.messageID);
    }
};