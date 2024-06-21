module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "𝐃é𝐟𝐢𝐧𝐢𝐬𝐬𝐞𝐳 𝐝𝐞𝐬 𝐩𝐢è𝐜𝐞𝐬 𝐞𝐭 𝐝𝐞𝐬 𝐩𝐨𝐢𝐧𝐭𝐬 𝐝'𝐞𝐱𝐩é𝐫𝐢𝐞𝐧𝐜𝐞 𝐩𝐨𝐮𝐫 𝐮𝐧 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐞 𝐯𝐨𝐮𝐬 𝐥𝐞 𝐬𝐨𝐮𝐡𝐚𝐢𝐭𝐞𝐳"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100084918384589"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("□□□□□□□□□■■■■■■■■\n𝐃𝐞𝐬𝐨𝐥𝐞 𝐦𝐞𝐜😐💡....𝐬𝐞𝐮𝐥 𝐦𝐨𝐧 𝐒𝐞𝐢𝐠𝐧𝐞𝐮𝐫 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞...👾⚡", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`n𝐒𝐞𝐭 𝐞𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞 𝐩𝐨𝐢𝐧𝐭𝐬 𝐭𝐨 ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
