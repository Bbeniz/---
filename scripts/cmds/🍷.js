module.exports = {
    config: {
        name: "🍷",
        version: "1.0",
        author: "𝐦𝐚𝐝𝐚𝐫𝐚",
        countDown: 5,
        role: 0,
        shortDescription: "commande 🍷",
        longDescription: "commande Ok",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "🍷") return message.reply("𝚅𝚒𝚎𝚗𝚜 𝚙𝚛𝚎𝚗𝚍𝚛𝚎 𝚞𝚗 𝚌𝚘𝚞𝚙 𝚊𝚟𝚎𝚌 𝚖𝚘𝚒 🍷🥴 \n🍷\n🤲 𝚝𝚒𝚎𝚗𝚜\n 𝚙𝚘𝚞𝚛 𝚝𝚘𝚒 𝚊 𝚗𝚘𝚝𝚛𝚎 𝚜𝚊𝚗𝚝𝚎 🥂\n𝚜𝚒 𝚝𝚞 𝚟𝚎𝚞𝚝 𝚞𝚗 𝚊𝚞𝚝𝚛𝚎 𝚗'𝚑𝚎𝚜𝚒𝚝𝚎 𝚙𝚊𝚜 à 𝚝𝚎 𝚜𝚎𝚛𝚟𝚒𝚛🍾");
    }
}
