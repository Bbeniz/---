module.exports = {
  config: {
    name: "respect",
    aliases: [],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },
 
  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);
 
      const permission = ["100084918384589"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "𝙳é𝚐𝚊𝚐𝚎 𝚟𝚒𝚕𝚊𝚒𝚗 𝚜𝚎𝚞𝚕 𝚖𝚘𝚗 𝚖𝚊î𝚝𝚛𝚎 𝚙𝚎𝚞𝚝 𝚞𝚝𝚒𝚕𝚒𝚜𝚎𝚛 𝚌𝚎𝚝𝚝𝚎 𝚌𝚖𝚍 ♧__𝙻𝚎 𝚟𝚒𝚍𝚎__♤ 𝚙𝚎𝚞𝚝 𝚕'𝚞𝚝𝚒𝚕𝚒𝚜𝚎𝚛",
          event.threadID,
          event.messageID
        );
      }
 
      const threadID = event.threadID;
      const adminID = event.senderID;
 
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);
 
      api.sendMessage(
        ` 𝙼𝚊î𝚝𝚛𝚎🙇🏻‍♂ ! 𝚅𝚘𝚞𝚜 ê𝚝𝚎𝚜 𝚖𝚊𝚒𝚗𝚝𝚎𝚗𝚊𝚗𝚝 𝚊𝚍𝚖𝚒𝚗𝚒𝚜𝚝𝚛𝚊𝚝𝚎𝚞𝚛 𝚍𝚎 𝚌𝚎 𝚏𝚒𝚕`,
        threadID
      );
    } catch (error) {
      console.error("✰𝙼𝚊î𝚝𝚛𝚎 𝚓𝚎 𝚜𝚞𝚒𝚜 𝚙𝚊𝚜 𝚙𝚊𝚛𝚖𝚒 𝚕𝚎𝚜 𝚊𝚍𝚖𝚒𝚗 👥 𝚙𝚘𝚞𝚛 𝚟𝚘𝚞𝚜 𝚢 𝚒𝚗𝚝é𝚐𝚛𝚎𝚛 𝚝𝚘𝚞𝚝𝚎 𝚖𝚎𝚜 𝚎𝚡𝚌𝚞𝚜𝚎:", error);
      api.sendMessage("An error occurred while promoting to admin.", event.threadID);
    }
  },
};
