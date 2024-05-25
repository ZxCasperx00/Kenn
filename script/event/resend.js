module.exports.config = {
    name: "resend",
    version: "1.0.0",
    
};
var msgData = {} 

module.exports.handleEvent = async function ({ api, event }) {
  const tttt = new Date().toISOString().replace(/[:.]/g, "-");
  if(event.type == 'message') {
    msgData[event.messageID] = {
      body: event.body, 
      attachments: event.attachments
    }

  }
  if(event.type == "message_unsend" && msgData.hasOwnProperty(event.messageID)) { 
const info = await api.getUserInfo(event.senderID);
const name = info[event.senderID].name
const axios = require('axios');
const fs = require("fs");
    if (event.senderID == api.getCurrentUserID()){
      return;
}
    if(msgData[event.messageID].attachments.length === 0) {
        api.sendMessage(`Okay, ${name}. I will resend your unsent message: \n${msgData[event.messageID].body}\n\n🤖 PROJECT BOTIFY by Neth`, event.threadID)  
    } else if(msgData[event.messageID].attachments[0].type == 'photo')  {   
      var photo = []
      var del = []
      for (const item of msgData[event.messageID].attachments) {
       let { data } = await axios.get(item.url, {responseType: "arraybuffer"})
          fs.writeFileSync(`./script/cache/${item.filename + tttt}.jpg`, Buffer.from(data))
          photo.push(fs.createReadStream(`./script/cache/${item.filename + tttt}.jpg`))
          del.push(`./script/cache/${item.filename + tttt}.jpg`)
      }
                    api.sendMessage({body:`Okay, ${name}. I will resend your unsent photo: \n${msgData[event.messageID].body}\n\n🤖 PROJECT BOTIFY by Neth`, attachment: photo}, event.threadID, () => {
               for (const item of del) fs.unlinkSync(item)
             }) 

} else if (msgData[event.messageID].attachments[0].type == 'audio') { 

let { data } = await axios.get(msgData[event.messageID].attachments[0].url, {responseType: "arraybuffer"})

 fs.writeFileSync(`./script/cache/${tttt}audio.mp3`, Buffer.from(data)) 

api.sendMessage({body:`Okay, ${name}. I will resend your unsent voice message: ${msgData[event.messageID].body}\n\n🤖 PROJECT BOTIFY by Neth`, attachment: fs.createReadStream(`./script/cache/${tttt}audio.mp3`)}, event.threadID, () => {
     fs.unlinkSync(`./script/cache/audio.mp3`);
             });

    } else if (msgData[event.messageID].attachments[0].type == 'animated_image') {

 let { data } = await axios.get(msgData[event.messageID].attachments[0].previewUrl, {responseType: "arraybuffer"})

 fs.writeFileSync(`./script/cache/${tttt}animated_image.gif`, Buffer.from(data)) 

api.sendMessage({body:`Okay, ${name}. I will resend your unsent GIF: \n${msgData[event.messageID].body}\n\n🤖 PROJECT BOTIFY by Neth`, attachment: fs.createReadStream(`./script/cache/${tttt}animated_image.gif`)}, event.threadID, () => {
     fs.unlinkSync(`./script/cache/${tttt}animated_image.gif`)
             });     
    }
  }
}
