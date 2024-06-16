module.exports = {
  config: {
    name: "dure",
aliases: ["dur"],
    version: "1.0",
    author: "𝚋𝚎𝚗",
    role: 2,
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
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;
      
      api.sendMessage(`⏳|🪫...𝐃𝐔𝐑𝐄́..🔋\n➪${uptimeString}\n________________________\n👪 | 𝚄𝚃𝙸𝙻𝙸𝚂𝙰𝚃𝙴𝚄𝚁𝚂\n➪${allUsers.length}\n________________________\n🛏 | 𝙶𝚁𝙾𝚄𝙿𝙴𝚂 \n➪${allThreads.length}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
