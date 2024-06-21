module.exports = {
    config: {
        name: "😐",
        version: "1.0",
        author: "𝐦𝐚𝐝𝐚𝐫𝐚",
        countDown: 5,
        role: 0,
        shortDescription: "commande Salut",
        longDescription: "commande Ok",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "Salut") return message.reply("𝐁𝐫𝐨 𝐭𝐮 𝐞𝐬 𝐝𝐚𝐧𝐬 𝐮𝐧 𝐫ê𝐯𝐞 𝐠𝐫â𝐜𝐞 𝐚𝐮𝐱 𝐚𝐫𝐜𝐚𝐧𝐞𝐬 𝐥𝐮𝐧𝐚𝐢𝐫𝐞𝐬 𝐢𝐧𝐟𝐢𝐧𝐢𝐬");
    }
}
