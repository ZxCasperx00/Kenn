const axios = require('axios');

module.exports.config = {
  name: "getcookie",
  role: 0,
  credits: "Neth",
  description: "Get cookie by email/number/uid and password",
  hasPrefix: true,
  usages: "{p}getcookie [user] [pass]",
  aliases: ["cookie","fbcookie"]
};

module.exports.run = async function({ api, event, args, prefix }) {
  const query = args.join(' ');
  const split = query.split(' ');
  const user = split[0];
  const pass = split[1];

  if (!user || !pass){
    return api.sendMessage(`Invalid. Enter email/number/uid and password. Example: ${prefix}getcookie [Email/Number/UID] [Password]`, event.threadID, event.messageID);
  }

  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`🍪 Cookie generating...\n\n User: ${user}\nPassword: ${pass}\n\n⏳ Please wait...`, event.threadID, event.messageID);

    axios.get(`https://naurwiegine.pythonanywhere.com/api/getCookie?email=${user}&password=${pass}`)
    .then(dat => { 
      api.sendMessage("🍪 Generated! here is your cookie 👇", event.threadID, () => {
        api.sendMessage(dat.data.cookie, event.threadID, () => {
          }, event.messageID);
                                                             }, event.messageID);
     // res.json(dat.data);
    })
    .catch(e => {
      console.error(e);
      api.setMessageReaction("🤷", event.messageID, () => {}, true);
      api.sendMessage("An error occurred while getting cookie. Maybe Wrong Username/Password. Pls try again later", event.threadID, () => {}, event.messageID);
    });
};


