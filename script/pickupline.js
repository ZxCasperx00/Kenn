const axios = require('axios');
module.exports.config = {
  name: "pickupline",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get a random pick up line",
  usage: "{p}insult",
  credits: "Neth",
  cooldown: 0
};
module.exports.run = async ({
  api,
  event
}) => {
  const {
    threadID,
    messageID
  } = event;
  try {
    const response = await axios.get('https://api.popcat.xyz/pickuplines');
    const response1 = response.data.pickupline;
    api.sendMessage(`🤭 RANDOM | PICK-UP LINE:\n ${response1}`, threadID, messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch this at the moment. Please try again later.", threadID, messageID);
  }
};
