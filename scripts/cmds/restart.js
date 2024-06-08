const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "__________________________\n🔄 |☆ 𝐥𝐞𝐬 𝐚𝐫𝐜𝐚𝐧𝐞𝐬 𝐥𝐮𝐧𝐚𝐢𝐫𝐞𝐬 𝐢𝐧𝐟𝐢𝐧𝐢𝐬 𝐝𝐚𝐧𝐬....\n________________________"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`_____________________\n\n✅ | 𝐁𝐨𝐭...𝐚𝐫𝐜𝐚𝐧𝐞 𝐥𝐮𝐧𝐚𝐢𝐫𝐞 𝐢𝐧𝐟𝐢𝐧𝐢\n____________________\n\n⏳ |𝐓𝐞𝐦𝐩𝐬: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
