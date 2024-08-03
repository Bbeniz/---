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
      return api.sendMessage("___________________________\n𝙴𝚂-𝚃𝚄 𝚅𝚁𝙰𝙸𝙼𝙴𝙽𝚃 𝚂𝚄𝚁 𝙳𝙴 𝚃𝙾𝙼𝙱𝙴𝚁 𝙳𝙰𝙽𝚂 𝙻𝙴 𝚅𝙸𝙳𝙴 𝙰𝙱𝚂𝙾𝙻𝚄 🤦🏻‍", event.threadID, event.messageID);
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
