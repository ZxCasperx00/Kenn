module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['hello bot'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  outro,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 50;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🤖 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗕𝗢𝗧𝗜𝗙𝗬 𝘣𝘺 𝙉𝙚𝙩𝙝 🤖\n,___,
[O.o]
/)__)
-"--"- 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙇𝙞𝙨𝙩༆\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t 𖦹 ${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
      }
      helpMessage += '\n𝙀𝙫𝙚𝙣𝙩 𝙇𝙞𝙨𝙩༆\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t 𖦹 ${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}\n\n🤖 To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.\n\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd
If the bot turned off / Issue.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 50;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🤖 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗕𝗢𝗧𝗜𝗙𝗬 𝘣𝘺 𝙉𝙚𝙩𝙝 🤖\n,___,
[O.o]
/)__)
-"--"- 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙇𝙞𝙨𝙩༆\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
      helpMessage += `\t 𖦹 ${i + 1}. 「 ${prefix}${commands[i]} 」\n`;
}
     helpMessage += '\n𝙀𝙫𝙚𝙣𝙩 𝙇𝙞𝙨𝙩༆\n\n';
       eventCommands.forEach((eventCommand, index) => {
      helpMessage += `\t 𖦹 ${index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
     helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}\n\n⚠️ Contact The Developer: Kenneth Aceberos, Or use ${prefix}feedback cmd
If the bot turned off / Issue.`;
      
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? 'Permission: User' : (role === 1 ? 'Permission: Admin' : (role === 2 ? 'Permission: Thread Admin' : (role === 3 ? 'Permission: Super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `Usage: ${usage}\n` : '';
        const versionMessage = version ? `Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `Cooldown: ${cooldown} second(s)\n` : '';
        const message = `Command Info:\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('❓❌ Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  botname,
  admin,
  outro,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '👋 Hi, this is my prefix: ' + prefix : "👋 Hi, I don't have a prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
    return;
  }
  if (body?.toLowerCase(). startsWith("bot") || body?.toLowerCase().startsWith("botify") || body?.toLowerCase().startsWith(botname.toLowerCase())){
    api.sendMessage(`🤖 Hello, someone called me. Btw my name is ${botname}`, event.threadID, (err, info) => {
      setTimeout(() => {
    api.editMessage(`🤖 To get started just type ${prefix}help to see available commands.`, info.messageID, () => {
      setTimeout(() => {
        api.editMessage(outro, info.messageID, () => {
        });
      }, 5*1000);
    });
      }, 5*1000);
    }, event.messageID);
    return;
  }
}
