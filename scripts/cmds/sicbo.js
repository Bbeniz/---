module.exports = {
  config: {
    name: "sicbo",
    aliases: ["sic"],
    version: "1.0",
    author: "L𝐞 𝐯𝐢𝐝𝐞",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Sicbo, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["small", "big"].includes(betType)) {
      return message.reply("😼 | Choose 'small' or 'big'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("❌ | Please bet an amount of 50 or more.");
    }

    if (betAmount > userData.money) {
      return message.reply("□□□□□□□□□■■■■■■■■\n ✰𝐌𝐞𝐫𝐝𝐞 🙄 𝐭'𝐞𝐬 𝐭𝐫𝐨𝐩 𝐩𝐚𝐮𝐯𝐫𝐞 𝐦𝐚𝐧𝐝𝐢𝐚𝐧𝐭 𝐯𝐚𝐬 𝐜𝐡𝐞𝐫𝐜𝐡𝐞𝐫 𝐞𝐭 𝐫𝐞𝐯𝐢𝐞𝐧𝐬\n□□□□□□□□□■■■■■■■■");
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
      return message.reply(`□□□□□□□□□■■■■■■■■\n(\/)\ •_•)\/ >[ ${resultString} ]\🎉 | 𝙲𝚘𝚗𝚐𝚛𝚊𝚝𝚞𝚕𝚊𝚝𝚒𝚘𝚗𝚜! 𝚈𝚘𝚞 𝚠𝚘𝚗 ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`□□□□□□□□□■■■■■■■■\n(\/)\ •_•)\/ >[ ${resultString} ]\😿 𝐃𝐨𝐦𝐦𝐚𝐠𝐞 𝐭𝐮 𝐚𝐬 𝐭𝐨𝐧 𝐚𝐫𝐠𝐞𝐧𝐭 ${betAmount}.`);
    }
  }
};
