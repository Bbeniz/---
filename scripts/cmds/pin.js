const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "pinterest",
    aliases: ["pin"],
    version: "1.0.2",
    author: "JVB",
    role: 0,
    countDown: 50,
    shortDescription: {
      en: "Search for images on Pinterest"
    },
    longDescription: {
      en: ""
    },
    category: "image",
    guide: {
      en: " {𝑝𝑟𝑒𝑓𝑖𝑥}𝑝𝑖𝑛𝑡𝑒𝑟𝑒𝑠𝑡 <𝑟𝑒𝑞𝑢𝑒̂𝑡𝑒 𝑑𝑒 𝑟𝑒𝑐𝒉𝑒𝑟𝑐𝒉𝑒> -<𝑛𝑜𝑚𝑏𝑟𝑒 𝑑'𝑖𝑚𝑎𝑔𝑒𝑠>🥀"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const userID = event.senderID;

      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(`𝑺'𝒊𝒍 𝒕𝒆 𝒑𝒍𝒂𝒊̂𝒕 𝒆𝒏𝒕𝒓𝒆 𝒍𝒆 𝒏𝒐𝒎𝒃𝒓𝒆 𝒅𝒆 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕 𝒒𝒖𝒆 𝒕𝒖 𝒗𝒆𝒖𝒙 .......🏌🥀
:${this.config.guide.en}`, event.threadID, event.messageID);
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
      const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

      const res = await axios.get(`https://celestial-dainsleif-v2.onrender.com/pinterest?pinte=${encodeURIComponent(keySearchs)}`);
      const data = res.data;

      if (!data || !Array.isArray(data) || data.length === 0) {
        return api.sendMessage(`𝑨𝒖𝒄𝒖𝒏𝒆 𝒅𝒐𝒏𝒏𝒆́𝒆 𝒅'𝒊𝒎𝒂𝒈𝒆 𝒕𝒓𝒐𝒖𝒗𝒆́𝒆 𝒑𝒐𝒖𝒓...😴🥀 "${keySearchs}". 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒆𝒔𝒔𝒂𝒚𝒆𝒓 𝒖𝒏𝒆 𝒂𝒖𝒕𝒓𝒆 𝒓𝒆𝒒𝒖𝒆̂𝒕𝒆 𝒅𝒆 𝒓𝒆𝒄𝒉𝒆𝒓𝒄𝒉𝒆...🏌🥀.`, event.threadID, event.messageID);
      }

      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imageUrl = data[i].image;

        try {
          const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgResponse.data);
          imgData.push(fs.createReadStream(imgPath));
        } catch (error) {
          console.error(error);
          // Handle image fetching errors (skip the problematic image)
        }
      }

      await api.sendMessage({
        attachment: imgData,
        body: `𝒚𝒐 𝒗𝒐𝒊𝒍𝒂̀ 𝒍𝒆𝒔/𝒍' 𝒊𝒎𝒂𝒈𝒆𝒔 𝒒𝒖𝒆 𝒕𝒖 𝒂𝒔 𝒅𝒆𝒎𝒂𝒏𝒅𝒆́  ${imgData.length} 𝑟𝑒́𝑠𝑢𝑙𝑡𝑎𝑡 𝑑'𝑖𝑚𝑎𝑔𝑒 𝑝𝑜𝑢𝑟 "${keySearchs}":`
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(`An error occurred. Please try again later.`, event.threadID, event.messageID);
    }
  }
};
