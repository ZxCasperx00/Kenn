module.exports.config = {
  name: "cmd",
  version: "1",
  role: 2,
  credits: "neth",
  description: "Test cmd",
  hasPrefix: true,
  usePrefix: true,
  commandCategory: "Admin",
  cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
    const input = args.join(" ");
    if (input.toLowerCase() == "restart"){
        api.sendMessage(`🤖 Restarting...`, event.threadID, event.messageID);
        await eval("process.exit(1)");
        return;
        }
    try {
      const runner = await eval(input);
     api.sendMessage(
        `${JSON.stringify(runner, null, 2)}`,
        event.threadID, event.messageID
      );
    } catch (error) {
      api.sendMessage(
        `${error.message}`,
        event.threadID, event.messageID
      );
    }
}