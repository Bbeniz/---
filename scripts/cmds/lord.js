module.exports = {
  config: {
    name: "lord",
    aliases: ["lrd"],
     version: "1.0",
    author: "𝐥⃯⃖𝐞⃯⃖  𝐯⃯⃖𝐢⃯⃖𝐝⃯⃖𝐞⃯⃖",
    countDown: 10,
    role: 0,
    shortDescription: "𝙰𝚖𝚞𝚜𝚎𝚜 𝚝𝚘𝚒 𝚋𝚒𝚎𝚗 𝚊𝚞 𝚓𝚎𝚞 𝚍𝚞 𝚑𝚊𝚜𝚊𝚛𝚍",
    longDescription: "𝐒𝐞𝐮𝐥 𝐥𝐞 𝐡𝐚𝐬𝐚𝐫𝐝 𝐭𝐮 𝐫𝐞𝐧𝐝𝐫𝐚𝐬 𝐫𝐢𝐜𝐡𝐞 𝐨𝐮 𝐩𝐚𝐮𝐯𝐫𝐞...𝐁𝐨𝐧𝐧𝐞 𝐜𝐡𝐚𝐧𝐜𝐞",
    category: "game",
    guide: "{pn} <Madara/Hashirama> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["madara", "hashirama"].includes(betType)) {
      return message.reply("❤‍🔥 | 𝗖𝗵𝗼𝗶𝘀𝗶 : '𝗻𝗮𝗱𝗮𝗿𝘀' 𝗼𝘂 '𝗵𝗮𝘀𝗶𝗿𝗮𝗺𝗮'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("🌿 | 𝐌𝐢𝐬𝐞 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 50$ 𝐨𝐮 𝐩𝐥𝐮𝐬.");
    }

    if (betAmount > userData.money) {
      return message.reply("🤣 𝐓'𝐞𝐬 𝐭𝐫𝐨𝐩 𝐩𝐚𝐮𝐯𝐫𝐞 𝐯𝐚𝐬 𝐜𝐡𝐞𝐫𝐜𝐡𝐞𝐫 𝐝𝐞 𝐥'𝐚𝐫𝐠𝐞𝐧𝐭 𝐩𝐮𝐢𝐬 𝐫𝐞𝐯𝐢𝐞𝐧𝐬");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`𝐌𝐀𝐃𝐀𝐑𝐀 𝐔𝐂𝐇𝐈𝐇𝐀
 ───────────
◥✇◣,[ ${resultString} ], ◢✇◤\ 🤑|𝐁𝐫𝐚𝐯𝐨 𝐭'𝐚𝐬 𝐠𝐚𝐠𝐧é 𝐥𝐞 𝐝𝐨𝐮𝐛𝐥𝐞 𝐝𝐞 𝐭𝐨𝐧 𝐟𝐫𝐢𝐜 《${winAmount}€》!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`𝐌𝐀𝐃𝐀𝐑𝐀 𝐔𝐂𝐇𝐈𝐇𝐀                                                                       
  ─────────── 
◥✇◣,[ ${resultString} ],◢✇◤
😜| 𝐃𝐞𝐬𝐨𝐥𝐞  𝐭'𝐚𝐬 𝐩𝐞𝐫𝐝𝐮 《${betAmount}€》.`);
    }
  }
    }
