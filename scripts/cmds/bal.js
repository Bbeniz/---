const fs = require("fs");

module.exports = {
  config: {
    name: "balance",
    aliases: [`bal`],
    version: 1.1,
    author: "ArYAN",
    shortDescription: { 
       en: "Check your balance or transfer money" },
    longDescription: { 
       en: "Check your balance or transfer money" },
    category: "game",
    guide: { 
       en: ".bal - Check your balance\n.money transfer [recipient] [amount] - Transfer money" }
  },

onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const command = args[0];
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const userName = userData ? userData.name : "Unknown User";
    const userMoney = userData?.money || 0;

   // Define currentDate and currentTime variables outside of the if block
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    if (command === "transfer") {
      const recipient = args[1];
      const amount = parseFloat(args[2]);

      if (isNaN(amount)) {
        message.reply("⛔  𝙈𝙤𝙣𝙩𝙖𝙣𝙩 𝗜𝗻𝘃𝗮𝗹𝗶𝗱𝗲\n\n━━━━━━━━━━━━━✰\n➪ 𝙼𝚘𝚗𝚝𝚊𝚗𝚝 𝚒𝚗𝚟𝚊𝚕𝚒𝚍𝚎.  𝚅𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚏𝚘𝚞𝚛𝚗𝚒𝚛 𝚞𝚗 𝚗𝚞𝚖é𝚛𝚘 𝚟𝚊𝚕𝚒𝚍𝚎.. (◍•ᴗ•◍)\n✰━━━━━━━━━━━━━✰");
        return;
      }

      if (userMoney < amount) {
        message.reply("⛔ 𝐏𝐚𝐬 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭\n\n✰━━━━━━━━━━━━━✰\n➪ 𝐕𝐨𝐮𝐬 𝐧'𝐚𝐯𝐞𝐳 𝐩𝐚𝐬 𝐚𝐬𝐬𝐞𝐳 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 à 𝐭𝐫𝐚𝐧𝐬𝐟é𝐫𝐞𝐫 𝐭𝐫𝐚𝐧𝐬𝐟é𝐫𝐞𝐫 (◕ᴗ◕✰)\n✰━━━━━━━━━━━━━✰");
        return;
      }

      const recipientData = await usersData.get(recipient);
      const recipientName = recipientData ? recipientData.name : "Unknown User";
      const transferAmount = Math.floor(amount * 0); 

      if (recipientData) {
        const recipientMoney = recipientData.money || 0;
        const senderData = await usersData.get(senderID);
        const senderMoney = senderData.money || 0;

        if (senderMoney >= amount) {
          const updatedSenderMoney = senderMoney - amount;
          const updatedRecipientMoney = recipientMoney + transferAmount;

          await usersData.set(senderID, { money: updatedSenderMoney });
          await usersData.set(recipient, { money: updatedRecipientMoney });

          message.reply(`✅ 𝗧𝗿𝗮𝗻𝘀𝗳é𝗿é\n\n✰━━━━━━━━━━━━✰\n➪𝐕𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐭𝐫𝐚𝐧𝐬𝐟é𝐫é 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜è𝐬 𝐯𝐨𝐭𝐫𝐞 𝐚𝐫𝐠𝐞𝐧𝐭 𝐩𝐨𝐮𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 .\n➪💰 𝗺𝗼𝗻𝘁𝗮𝗻𝘁\n➤ ${transferAmount} \n➪ℹ 𝗡𝗼𝗺 𝗱𝘂 𝗽𝗿𝗼𝗽𝗿𝗶è𝘁𝗲𝘂𝗿 𝗱𝘂 𝗰𝗼𝗺𝗽𝘁𝗲\n➤ ${recipientName}\n➪🆔 𝗜𝗗 𝗱'𝘂𝘁𝗶𝗹𝗶𝘀𝗮𝘁𝗲𝘂𝗿\n➤ ${senderID}\n\n➪📅 𝗗𝗮𝘁𝗲\n➤ ${currentDate}\n⏰ ➪𝗧𝗲𝗺𝗽𝘀\n➤ ${currentTime}\n✰━━━━━━━━━━━━━✰`);
        } else {
          message.reply(`⛔ 𝗽𝗮𝘀 𝗱'𝗮𝗿𝗴𝗲𝗻𝘁\n\n✰━━━━━━━━━━━━━✰\n➪ 𝚅𝚘𝚞𝚜 𝚗'𝚊𝚟𝚎𝚣 𝚙𝚊𝚜 𝚊𝚜𝚜𝚎𝚣 𝚍'𝚊𝚛𝚐𝚎𝚗𝚝 à 𝚝𝚛𝚊𝚗𝚜𝚏é𝚛𝚎𝚛, 𝚟𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚟é𝚛𝚒𝚏𝚒𝚎𝚛 𝚟𝚘𝚝𝚛𝚎 𝚜𝚘𝚕𝚍𝚎 𝚙𝚞𝚒𝚜 𝚛é𝚎𝚜𝚜𝚊𝚢𝚎𝚣 𝚟𝚘𝚝𝚛𝚎 𝚍𝚎𝚖𝚊𝚗𝚍𝚎. (◕ᴗ◕✰)\n💰𝐒𝐨𝐥𝐝𝐞 𝐚𝐜𝐭𝐮𝐞𝐥 \n➤ ${userMoney}\n ➪ 𝐈𝐃 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫\n➤ ${senderID}\n ➪🗓 𝐃𝐚𝐭𝐞\n➤ ${currentDate}\n⏰ ➪ 𝐭𝐞𝐦𝐩𝐬\n➤ ${currentTime}\n✰━━━━━━━━━━━━━✰`);
        }
      } else {
        message.reply("⛔ 𝗡𝗼 𝗗𝗮𝘁𝗮\n\nRecipient not found. (◍•ᴗ•◍)");
      }
    } else if (command === "showall") {
      // Show all users money data
      const allUsersData = await usersData.getAll();
      let usersMoneyData = "🤑💰𝙳𝚘𝚗𝚗é𝚎𝚜 𝚖𝚘𝚗é𝚝𝚊𝚒𝚛𝚎𝚜 𝚍𝚎 𝚝𝚘𝚞𝚜 𝚕𝚎𝚜 𝚞𝚝𝚒𝚕𝚒𝚜𝚊𝚝𝚎𝚞𝚛𝚜:\n";
      allUsersData.forEach(user => {
        usersMoneyData += `➤ User: ${user.name}, ID: ${user.userID}, Money: ${user.money}\n`;
      });
      message.reply(usersMoneyData);
    } else {
      // Show user balance
      message.reply(`\n✰━━━━━━━━━━━━━━━━✰\n➪𝐧𝐨𝐦 𝐝𝐮 𝐩𝐫𝐨𝐩𝐫𝐢è𝐭𝐞𝐮𝐫 𝐝𝐮 𝐜𝐨𝐦𝐩𝐭𝐞\n➤〖 ${userName}〗\n\n➪ 𝐁𝐚𝐥𝐚𝐧𝐜𝐞 𝐝𝐮 𝐜𝐨𝐦𝐩𝐭𝐞\n➤ 〖${userMoney}〗\n\n➪ 𝗜𝗗 𝐝𝐮 𝐩𝐫𝐨𝐩𝐫𝐢è𝐭𝐞𝐮𝐫\n➤〖 ${senderID}〗\n\n 《📢 𝐀𝐍𝐎𝐍𝐍𝐎𝐍𝐂𝐄》\n➤ 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐭 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 [𝐝𝐞𝐬𝐭𝐢𝐧𝐚𝐭𝐚𝐢𝐫𝐞] [𝐦𝐨𝐧𝐭𝐚𝐧𝐭] - 𝐓𝐫𝐚𝐧𝐬𝐟é𝐫𝐞𝐫 𝐝𝐞 𝐥'𝐚𝐫𝐠𝐞𝐧𝐭\n✰━━━━━━━━━━━━━━━━✰\n`);
    }
  }
};
