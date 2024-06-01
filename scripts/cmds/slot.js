module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "Rishad",
    shortDescription: {
      en: "Game slot",
    },
    longDescription: {
      en: "Game slot.",
    },
    category: "game",
  },
  langs: {
    en: {
      invalid_amount: "𝐌𝐞𝐭𝐭𝐞𝐳 𝐮𝐧 𝐠𝐫𝐨𝐬 🥴 𝐜𝐡𝐢𝐟𝐟𝐫𝐞, 𝐯𝐨𝐮𝐬 𝐩𝐨𝐮𝐯𝐞𝐳 𝐠𝐚𝐠𝐧𝐞𝐫 𝐝𝐞𝐮𝐱 𝐟𝐨𝐢𝐬 𝐥𝐞 𝐫𝐢𝐬𝐪𝐮𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐟𝐢𝐥𝐬 🌬❄",
      not_enough_money: "𝐕𝐨𝐮𝐬 𝐝𝐢𝐬𝐩𝐨𝐬𝐞𝐳 𝐝𝐞 𝐜𝐞 𝐦𝐨𝐧𝐭𝐚𝐧𝐭, 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐞𝐳 𝐚𝐥𝐨𝐫𝐬 𝐯𝐨𝐭𝐫𝐞 𝐬𝐨𝐥𝐝𝐞.🌝🤣 ",
      spin_message: "𝙧𝙤𝙩𝙖𝙩𝙞𝙤𝙣 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚 🌝",
      win_message:"You win %1$💗!",
      lose_message: "You lost %1$🥲.",
      jackpot_message: "This is the amount that Diem won! tripartite %1 $!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["🍒", "🍇", "🍊", "🍉", "🍋", "🍎", "🍓", "🥬", "🥝"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "🥬" && slot2 === "🥬" && slot3 === "🥬") {
    return betAmount * 10;
  } else if (slot1 === "🍇" && slot2 === "🍇" && slot3 === "🍇") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
      return getLang("jackpot_message", winnings);
    } else {
      return getLang("win_message", winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]`;
  }
}
