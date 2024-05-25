const axios = require('axios');

module.exports.config = {
  name: "reactpost",
  role: 0,
  credits: "Neth",
  description: "React your post depends on count",
  hasPrefix: true,
  usages: "{p}reactpost [cookie] [link] [LIKE,LOVE,CARE,HAHA,WOW,SAD,ANGRY]",
  //cooldown: 0,
  aliases: ["react"]
};

module.exports.run = async function({ api, event, args, prefix}) {
  const query = args.join(' ');
  const split = query.split(' ');
  const cookie = split[0];
  const post = split[1];
  const react = split[2];

  if (!cookie || !post || !react){
    api.sendMessage(`Invalid. Enter your cookie, post link and reaction type. Example: ${prefix}reactpost [cookie] [postlink] [LIKE,LOVE,CARE,HAHA,WOW,SAD,ANGRY]\n\nIf You Don't know how to get cookie, Enter command ${prefix}getcookie to get your own cookie`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`Reacting to ${post} with reaction type ${react.toUpperCase()}\n\n⏳ Please wait...`, event.threadID, (err, info1) => {
    yawaMo(info1);
}, event.messageID);

  
function yawaMo(info1){
axios.post("https://flikers.net/android/android_get_react.php", {
    post_id: post,
    react_type: react.toUpperCase(),
    version: "v1.7"
  }, {
    headers: {
        'User-Agent': "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)",
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Content-Type': "application/json",
        'Cookie': cookie
    }
  })
    .then(dat => { 
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.editMessage(dat.data.message + "\n\nTry checking your post react.", info1.messageID, () => {});
     // res.json(dat.data);
    })
    .catch(e => {
       api.setMessageReaction("🤷", event.messageID, () => {}, true);
  api.editMessage("Something went wrong: " + e.data.message + "\n\nMaybe Your Post has reactions so Try checking your post react.", info1.messageID, () => {});
    });
  
}
  
};


