const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const __dirname1 = __dirname.replace("/script", "");
const main = require(__dirname1 + '/index');

module.exports.config = {
  name: "logout",
  version: "1",
  role: 2,
  credits: "neth",
  description: "Test cmd",
  hasPrefix: true,
  usePrefix: true,
  commandCategory: "Admin",
  cooldown: 0
};

module.exports.run = async function({ api, event, args, prefix, admin, outro, botname}) {
    function deleteThisUser(userid) {
  const configFile = __dirname1 + "/data/history.json";
  let config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const sessionFile = path.join(__dirname1, "/data/session", `${userid}.json`);
  const index = config.findIndex(item => item.userid === userid);
  if (index !== -1) config.splice(index, 1);
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  try {
     fs.unlinkSync(sessionFile); main.test1.account.delete(userid);
      setTimeout(() => api.logout(() => {
       console.log(`[${botname}] - ${chalk.red(`Logout Successful.`)}`);
   }), 1*1000);        
  } catch (error) {
    console.log(error);
  }
}
   const giataykaba = args.join(" ");
   if (!giataykaba){
  const NIGGERZ = await api.sendMessage(`🤖 If You Want to change prefix,userid, or commands...`, event.threadID, event.messageID);
    
    function ed(text){
    api.editMessage(text, NIGGERZ.messageID);
    }
    const bwabwa = 3*1000;
    setTimeout(() => {
        ed(`This command will be logged out on your bot account.`);
        setTimeout(() => ed(`❓ HOW TO LOGOUT?\nTo logout: type "${prefix}logout now" to logout your session and relogin your fb account, and revisit the PROJECT BOTIFY site anytime.\n\nI added this command because you can't add the session that are logged in to PROJECT BOTIFY system, But This command will help you though.`), bwabwa);
        }, bwabwa);
       return;
       }
    if (giataykaba.toLowerCase() == "now"){
    api.sendMessage(`🤖 Logout in process. Please wait.\n\nYou can revisit the site again thankyou\n${outro}`, event.threadID, (async () => {
     const putanginamo = api.getCurrentUserID();
    deleteThisUser(putanginamo);
  }), event.messageID);
    }
  }
