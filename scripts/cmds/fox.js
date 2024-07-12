const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "fox",
    version: "1.0",
    author: "Samir Œ",
    aliases: ["randomfox", "foximage"],
    countDown: 5,
    role: 0,
    category: "Fun",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ event, message, api }) {
    const apiUrl = 'https://randomfox.ca/floof/';

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data || !data.image) {
        return message.reply("No image found from the API.");
      }

      const imageUrl = data.image;
      const imagePath = path.join(__dirname, 'cache', 'randomfox.jpg');
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      await fs.promises.writeFile(imagePath, imageResponse.data);

      await message.reply({
        body: `Here's a random fox 🦊`,
        attachment: fs.createReadStream(imagePath)
      });

      fs.unlinkSync(imagePath); 
    } catch (error) {
      console.error("Error fetching fox image:", error.message);
      message.reply("An error occurred while fetching the fox image.");
    }
  }
};
