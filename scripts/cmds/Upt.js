module.exports = {
  config: {
    name: "upt",
    aliases: ["upt", "up"],
    version: "1.0",
    author: "le vide",
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const uptime = process.uptime();
      
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `➪🔋${days} 𝐝𝐚𝐲𝐬🪫
━━━━━━━━━━━\n, 
➪🔋${hours} 𝐡𝐨𝐮𝐫𝐬🪫━━━━━━━━━━━\n, 
➪🔋${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬🪫━━━━━━━━━━━\n, 
➪🔋${seconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬🪫━━━━━━━━━━━`;
      
      api.sendMessage(`🌍 | 𝐵𝑜𝑡 𝑟𝑢𝑛𝑛𝑖𝑛𝑔 𝑡𝑖𝑚𝑒━━━━━━━━━━━\ ${uptimeString}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
