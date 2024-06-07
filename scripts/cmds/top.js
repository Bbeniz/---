module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: "Top 100 Rich Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 100);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);
 
 const messageText = `❁𝐋𝐄 𝐓𝐎𝐏 𝐃𝐄 𝐏𝐋𝐔𝐒 𝐑𝐈𝐂𝐇𝐄 \n________________:\n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};
