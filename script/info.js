const fs = require("fs");
const moment = require("moment-timezone");
const request = require("request");

module.exports.config = {
		name: "info",
		version: "1.0.1",
		aliases: ["info", "Info", "in", "fo"],
		role: 0,
		credits: "cliff",
		description: "Admin and Bot info.",
		cooldown: 5,
		hasPrefix: true,
};

module.exports.run = async function({ api, event, args, prefix, botname }) {
		let time = process.uptime();
		let years = Math.floor(time / (60 * 60 * 24 * 365));
		let months = Math.floor((time % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
		let days = Math.floor((time % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
		let weeks = Math.floor(days / 7);
		let hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
		let minutes = Math.floor((time % (60 * 60)) / 60);
		let seconds = Math.floor(time % 60);
		const uptimeString = `${years > 0 ? `${years} years ` : ''}${months > 0 ? `${months} months ` : ''}${weeks > 0 ? `${weeks} weeks ` : ''}${days % 7 > 0 ? `${days % 7} days ` : ''}${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes ` : ''}${seconds} seconds`;

		const BOTCREATOR = botname;
		const juswa = moment.tz("Asia/Manila").format("🗓️ · D/MM/YYYY, HH:mm:ss");
		api.sendMessage({
						body: `Uptime running!: ${uptimeString}\nToday is ${juswa}\nBot is running ${hours}:${minutes}:${seconds}.\nThanks for using my bot\n\nBot Name: ${BOTCREATOR} 🤖 Created on PROJECT BOTIFY by Neth`,
						}, event.threadID /*() => fs.unlinkSync(__dirname + "/cache/owner_video.mp4")*/);
		
};
