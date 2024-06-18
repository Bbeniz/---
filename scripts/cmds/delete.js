const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "delete",
    aliases: ["del"],
    version: "1.0",
    author: "ArYAN",
    countDown: 0,
    role: 2,
    longDescription: {
      en: "Delete commands modules"
    },
    category: "admin",
    guide: "{p}delete < file name >"
  },


  onStart: async function ({ args, message,event}) {
    const commandName = args[0];

    if (!commandName) {
      return message.reply("⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗔𝗰𝘁𝗶𝗼𝗻\n━━━━━━━━━━\n\nPlease enter a file name with .js");
    }

    const filePath = path.join(__dirname, '..', 'cmds', `${commandName}`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        message.reply(`✅|𝗗𝗲𝗹𝗲𝘁𝗲𝗱\n━━━━━━━━━━\n\nA command file has been deleted ${commandName} .`);
      } else {
        message.reply(`⛔|𝗙𝗮𝗶𝗹𝗲𝗱\n━━━━━━━━━━\n\nCommand file ${commandName} unavailable.`);
      }
    } catch (err) {
      console.error(err);
      message.reply(`⛔|𝗙𝗮𝗶𝗹𝗲𝗱\n━━━━━━━━━━\n\nCannot be deleted because ${commandName}: ${err.message}`);
    }
  }
};
