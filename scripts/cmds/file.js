const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "𝐙𝐞𝐧𝐢𝐥𝐝",
    countDown: 10,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100084918384589"];                         if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝐭𝐮 𝐧𝐞 𝐩𝐚𝐬 𝐦𝐨𝐧 𝐦𝐚𝐢𝐭𝐫𝐞 𝐬𝐞𝐮𝐥 𝐥𝐮𝐢 𝐪𝐮𝐢 𝐩𝐞𝐮𝐭 𝐮𝐬𝐞 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 🧛🏻‍♂️", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
