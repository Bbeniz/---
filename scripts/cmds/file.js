const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["", "",
"100084918384589"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("___________________\n𝐞𝐧𝐟𝐨𝐢𝐫𝐞 𝐬𝐞𝐮𝐥 𝐦𝐨𝐧 𝐦𝐚î𝐭𝐫𝐞 𝐚 𝐥𝐞 𝐝𝐫𝐨𝐢𝐭 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬é 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐭𝐚 𝐦è𝐫𝐞 𝐭'𝐚𝐯𝐚𝐢𝐬 𝐩𝐚𝐬 𝐚𝐩𝐫𝐢𝐬 𝐝𝐞 𝐯𝐨𝐥é 𝐥𝐞𝐬 𝐚𝐟𝐟𝐚𝐢𝐫𝐞 𝐝'𝐚𝐮𝐭𝐫𝐮?\n______________________", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝖡𝖺𝗅𝖺𝗇𝖼𝖾 𝗅𝖾 𝗇𝗈𝗆 𝖽𝗎 𝖿𝗂𝖼𝗁𝗂𝖾𝗋.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
