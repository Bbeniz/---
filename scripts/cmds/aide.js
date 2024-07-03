const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "━━━━━━━━━━━━━━━━\n『 🕸𝐌𝐀𝐑𝐀𝐃𝐀 𝐂𝐌𝐃 𝐋𝐈𝐒𝐓 🕸』"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "aide",
    version: "1.17",
    author: "NTKhang", // original author leeza 
    countDown: 0,
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

      msg += `『 🕸𝐌𝐀𝐑𝐀𝐃𝐀 𝐂𝐌𝐃 𝐋𝐈𝐒𝐓 🕸』\n`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n🛸👽☞${category.toUpperCase()}☜👽 🛸\n`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n❍⊱──✶『${item}』`);
            msg += `\n ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n━━━━━━━━━━━━━━━━`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n➪🕸𝐋𝐞 𝐛𝐨𝐭 𝐝𝐢𝐬𝐩𝐨𝐬𝐞 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐝𝐞「 ${totalCommands}」𝐜𝐦𝐝𝐬\n`;
      msg += `➪🕸 𝗧𝗔𝗣𝗘 ${prefix} 5𝐡𝐞𝐥𝐩 + 𝐥𝐞 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐦𝐝 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐜𝐞𝐬 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧𝐬`;
      msg += `\n✶⊶⊶⊷⊶⊷⊷❍☬𝐌𝐀𝐑𝐀𝐃𝐀☬❍⊶⊶⊷⊷⊶⊷✶❦`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/nBL42Bx/image.jpg", // add image link here
        "https://i.ibb.co/qN5PkHc/image.jpg",
        "https://i.ibb.co/bmMRbmh/image.jpg",
        "https://i.ibb.co/jgVFp4Y/image.jpg",
        "https://i.ibb.co/kJ6WWmW/image.jpg",
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

        const response = `✶⊶⊷❍☬𝐌𝐀𝐑𝐀𝐃𝐀☬❍⊶⊷✶
  ❍⌇─➭  ${configCommand.name}
  ❍⌇─➭  𝙄𝙉𝙁𝙊
  ❍⌇─➭  𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣: ${longDescription}
  ❍⌇─➭  𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  ❍⌇─➭  𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙜𝙧𝙤𝙪𝙥: 𝘿𝙤 𝙣𝙤𝙩 𝙝𝙖𝙫𝙚
  ❍⌇─➭  𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${configCommand.version || "1.0"}
  ❍⌇─➭  𝙍𝙤𝙡𝙚: ${roleText}
  ❍⌇─➭  𝙏𝙞𝙢𝙚 𝙥𝙚𝙧 𝙘𝙤𝙢𝙢𝙖𝙣𝙙: ${configCommand.countDown || 1}s
  ❍⌇─➭  𝘼𝙪𝙩𝙝𝙤𝙧: ${author}
  ❍⌇─➭  𝙐𝙨𝙖𝙜𝙚
  ❍⌇─➭  ${usage}
  ❍⌇─➭  𝙉𝙤𝙩𝙚𝙨
  ❍⌇─➭  𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 <𝙓𝙓𝙓𝙓𝙓> 𝙘𝙖𝙣 𝙗𝙚 𝙘𝙝𝙖𝙣𝙜𝙚𝙙
  ❍⌇─➭  𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 [𝙖|𝙗|𝙘] 𝙞𝙨 𝙖 𝙤𝙧 𝙗 𝙤𝙧 𝙘 \n✶⊶⊷⊶⊷❍❍⊶⊷⊶⊷✶\n🛸 𝙚𝙙𝙞𝙩𝙚 𝙗𝙮 :  🕸𝐌𝐀𝐑𝐀𝐃𝐀 𝐔𝐂𝐇𝐈𝐇𝐀🕸
  `;

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
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
