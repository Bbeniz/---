const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[  | 𝐌𝐀𝐃𝐀𝐑𝐀 𝐔𝐂𝐇𝐈𝐇𝐀 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "𝑹𝒊𝒏𝒏𝒈𝒂𝒏", // original author Kshitiz 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `\n━─────╮•╭─────━  \n𝐋𝐄𝐒 𝐀𝐑𝐂𝐀𝐍𝐄𝐒 𝐋𝐔𝐍𝐀𝐈𝐑𝐄𝐒 𝐅𝐈𝐍𝐈𝐒    ◥✇◣, ,◢✇◤   \n____________________________\n\n 𝐌𝐀𝐃𝐀𝐑𝐀 𝐔𝐂𝐇𝐈𝐇𝐀\n╚═══════════╝\n\n\n`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n◥✇◣,${category.toUpperCase()},◢✇◤\n_________________________`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 1).map((item) => `(̅_̅(̅_̅_̅_̅_̅̅_̅()ڪے〖 ${item} 〗`);
            msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n✰𝚓𝚎 𝚍𝚒𝚜𝚙𝚘𝚜𝚎 𝚊𝚌𝚝𝚞𝚎𝚕𝚕𝚎𝚖𝚎𝚗𝚝 𝚍𝚎 ➪ $〖 {totalCommands} 〗☜︎︎︎\n\n`;
      msg += `✉|𝚃𝚊𝚙𝚎 ${prefix} 𝚑𝚎𝚕𝚙 + 𝚖𝚘𝚖 𝚍𝚎 𝚕𝚊 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚎 𝚙𝚘𝚞𝚛 𝚎𝚗 𝚜𝚊𝚟𝚘𝚒𝚛 𝚙𝚕𝚞𝚜 à 𝚙𝚛𝚘𝚙𝚘𝚜 𝚍𝚎 𝚕𝚊 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚎 { %𝐮𝐜𝐡𝐢𝐡𝐚𝐠𝐜} 𝙿𝚘𝚞𝚛 𝚛𝚎𝚓𝚘𝚒𝚗𝚍𝚛𝚎 𝚖𝚘𝚗 𝚌𝚕𝚊𝚗\n\n`;


      msg += `📝| 𝐋𝐞 𝐩𝐥𝐮𝐬 𝐠𝐫𝐚𝐧𝐝 𝐝𝐚𝐧𝐠𝐞𝐫 𝐩𝐨𝐮𝐫 𝐮𝐧 𝐯𝐢𝐥𝐥𝐚𝐠𝐞, 𝐜𝐞 n’𝐞𝐬𝐭 𝐩𝐚𝐬 𝐥𝐚 𝐠𝐮𝐞𝐫𝐫𝐞, 𝐦𝐚𝐢𝐬 𝐩𝐥𝐮𝐭ô𝐭 𝐪𝐮𝐚𝐧𝐝 𝐜𝐞𝐮𝐱 𝐪𝐮𝐢 𝐥𝐞 𝐠𝐨𝐮𝐯𝐞𝐫𝐧𝐞𝐧𝐭 𝐩𝐞𝐫𝐝𝐞𝐧𝐭 𝐥𝐞𝐮𝐫 𝐟𝐨𝐢`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/3TD85Tk/image.jpg", // add image link here
                "https://i.ibb.co/3TD85Tk/image.jpg",
        "https://i.ibb.co/3TD85Tk/image.jpg",
        // Add more image links as needed
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NOM ────◇
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Autres noms : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Ne pas avoir"}
  │ Autres noms dans votre groupe : %uchihagc
  │ Version: ${configCommand.version || "1.0"}
  │ Rôle : \n${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: \n${author}
  ├── utilisation
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━♤`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Groups administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
