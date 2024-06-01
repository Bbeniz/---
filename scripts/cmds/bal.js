module.exports = {
	config: {
		name: "balance",
		aliases: ["bal"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "🆅🄾🅸🆁 🄻'🄰🆁🄶🅴🄽🅃 🅳🅴 🄻🄰 🄿🅴🆁🅂🄾🄽🄽🅴 🅃🄰🄶🆄é🅴 "
		},
		category: "economy",
		guide: {
			vi: "   {pn}: xem số tiền của bạn"
				+ "\n   {pn} <@tag>: xem số tiền của người được tag",
			en: "   {pn}: view your money"
				+ "\n   {pn} <@tag>:✰  𝐯𝐨𝐢𝐫 𝐥'𝐚𝐫𝐠𝐞𝐧𝐭 𝐝𝐞 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐭𝐚𝐠𝐮é𝐞"
		}
	},

	langs: {
		vi: {
			money: "Bạn đang có %1$",
			moneyOf: "%1 đang có %2$"
		},
		en: {
			money: "༆ 𝐕𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 《%1$💰💶》",
			《 𝙡'𝙖𝙧𝙜𝙚𝙣𝙩 𝙙𝙚 : "%1 has %2$"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
			}
			return message.reply(msg);
		}
		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", userData.money));
	}
};
