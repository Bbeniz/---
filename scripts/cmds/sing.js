const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const path = require('path'); 

module.exports = {
  config: {
    name: 'sing',
    version: '3.0',
    role: 0,
    author: 'ArYAN',//don't change my credits
    cooldowns: 10,
    longDescription: {
      en: "Download songs from YT-MUSIC"
    },
    category: 'media',
    guide: {
      en: '.sing <music>'
    },
    dependencies: {
      'fs-extra': '',
      'axios': '',
      'ytdl-core': '',
      'yt-search': '',
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const input = event.body;
      const text = input.substring(5);
      const data = input.split(' ');

      if (data.length < 2) {
        return api.sendMessage(`⛔| 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗜𝗻𝗽𝘂𝘁𝘀\n━━━━━━━━━━━━\n\nPlease provide specify music name!`, event.threadID);
      }

      data.shift();
      const musicName = data.join(' ');

      api.setMessageReaction('⏰', event.messageID, () => {}, true);

      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        api.sendMessage(`⛔| 𝗡𝗼 𝗗𝗮𝘁𝗮\n━━━━━━━━━━━━\n\nNo music found.`, event.threadID);
        return;
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const songInfoResponse = await axios.get(`https://itsaryan.onrender.com/api/songinfo/v2?id=${music.videoId}`);
      const songInfo = songInfoResponse.data;

      const stream = ytdl(musicUrl, { filter: 'audioonly' });

      const fileName = `${event.senderID}.mp3`;
      const filePath = path.join(__dirname, 'cache', fileName);

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        const fileSize = formatFileSize(fs.statSync(filePath).size);
        const musicDuration = music.duration.timestamp;

        const message = {
          body: `🎶| 𝗬𝗧-𝗠𝗨𝗦𝗜𝗖\n━━━━━━━━━━━━\n\n✨ 𝗧𝗶𝘁𝗹𝗲: ${songInfo.title}\n📅 𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱 𝗼𝗻: ${songInfo.publishedAt}\n👀 𝗩𝗶𝗲𝘄𝘀: ${songInfo.viewCount}\n👍 𝗟𝗶𝗸𝗲𝘀: ${songInfo.likeCount || "No Data Available"}\n💬 𝗖𝗼𝗺𝗺𝗲𝗻𝘁𝘀: ${songInfo.commentCount}\n📝 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${songInfo.category}\n⏰ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${musicDuration}\n🎞 𝗧𝗵𝘂𝗺𝗯𝗻𝗮𝗶𝗹: ${songInfo.thumbnails.default.url}\n👤 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${songInfo.channel.title}\n👥 𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗲𝗿𝘀: ${songInfo.channel.subscriberCount}\n📎 𝗨𝗥𝗟: www.youtube.com/${music.videoId}`,
          attachment: fs.createReadStream(filePath),
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
          api.setMessageReaction('✅', event.messageID, () => {}, true);
        });
      });

    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('⛔|𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━━━\n\nSorry, an error occurred while processing the command.', event.threadID);
    }
  },

  onChat: async function ({ api, event }) {
    if (event.body && event.body.toLowerCase().startsWith('sing')) {
      const musicName = event.body.substring(5).trim();
      this.onStart({ api, event });
    }
  },
};

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / 1048576).toFixed(2) + ' MB';
}
