const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "uchiha",
    aliases: [" uchiha"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat"
    },
    category: "GroupMsg",
    guide: {
      en: "{pn}uchiha"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "26286379000953312";
    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("𝘛'𝘦𝘴 𝘥𝘦𝘫𝘢 𝘥𝘢𝘯𝘴 𝘭𝘦 𝘨𝘳𝘰𝘶𝘱𝘦 𝘴𝘪 𝘵𝘶 𝘵𝘳𝘰𝘶𝘷𝘦𝘴 𝘱𝘢𝘴 𝘷𝘦𝘳𝘪𝘧𝘪𝘦 𝘵𝘢 𝘣𝘰𝘪𝘵𝘦 𝘥𝘦 𝘮𝘦𝘴𝘴𝘢𝘨𝘦𝘴 𝘦𝘵 𝘴𝘱𝘢𝘮㊗️✍", event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("⚠", event.messageID, "💌", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage("🎊 | 𝑻'𝒂𝒔 𝒆𝒕𝒆 𝒂𝒋𝒐𝒖𝒕𝒆 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 ❦︎☢︎︎〖✰𝐍𝐎𝐔𝐕𝐄𝐀𝐔  𝐑𝐄𝐏𝐀𝐈𝐑𝐄 𝐃𝐄𝐒  𝐔𝐂𝐇𝐈𝐇𝐀✰ 〗❦︎☢︎︎", event.threadID);

        // Set 💛 reaction for successfully added user
        api.setMessageReaction("🛸", event.messageID, "㊗️", api);
      }
    } catch (error) {
      api.sendMessage("🙀 | Failed to add you to the group chat.\k:", event.threadID);

      // Set 🙆 reaction for failed adding user
      api.setMessageReaction("💀", event.messageID, "👍", api);
    }
  }
}
