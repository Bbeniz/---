const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "daily",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Nhận quà hàng ngày",
			en: "Receive daily gift"
		},
		category: "game",
		guide: {
			vi: "   {pn}: Nhận quà hàng ngày"
				+ "\n   {pn} info: Xem thông tin quà hàng ngày",
			en: "   {pn}"
				+ "\n   {pn} info: View daily gift information"
		},
		envConfig: {
			rewardFirstDay: {
				coin: 100000000,
				exp: 3
			}
		}
	},

	langs: {
		vi: {
			monday: "Thứ 2",
			tuesday: "Thứ 3",
			wednesday: "Thứ 4",
			thursday: "Thứ 5",
			friday: "Thứ 6", 
			saturday: "Thứ 7",
			sunday: "Chủ nhật",
			alreadyReceived: "Bạn đã nhận quà rồi",
			received: "Bạn đã nhận được %1 coin và %2 exp"
		},
		en: {
			monday: "Monday",
			tuesday: "Tuesday",
			wednesday: "Wednesday",
			thursday: "Thursday",
			friday: "Friday",
			saturday: "Saturday",
			sunday: "Sunday",
			alreadyReceived: "𝐌𝐨𝐧 𝐦𝐚î𝐭𝐫𝐞 𝐚 𝐞𝐮 𝐩𝐢𝐭𝐢é 𝐝𝐞 𝐭𝐨𝐢 𝐢𝐥 𝐭'𝐚 𝐝𝐮 𝐟𝐫𝐢𝐜 𝐬𝐚𝐧𝐬 𝐦𝐦𝐞 𝐥𝐮𝐢 𝐝𝐢𝐫𝐞 𝐦𝐞𝐫𝐜𝐢 𝐭𝐮 𝐝𝐞𝐦𝐚𝐧𝐝𝐞 𝐞𝐧𝐜𝐨𝐫𝐞\n߷__________________________߷",
			received: "༆𝐅𝐞𝐥𝐢𝐜𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐭𝐮 𝐚𝐬 𝐫𝐞ç𝐮 🕸%1 ¥🕸 𝐭'𝐚𝐬 𝐝𝐞 𝐥𝐚 𝐜𝐡𝐚𝐧𝐜𝐞 𝐬𝐞𝐮𝐥𝐞𝐦𝐞𝐧𝐭 🛸%2🛸 𝐪𝐮𝐢 𝐯𝐚𝐬 𝐞𝐱𝐩𝐢𝐫é\n□□□□□□□■■■■■■■■"
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;
		if (args[0] == "info") {
			let msg = "";
			for (let i = 1; i < 8; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const day = i == 7 ? getLang("sunday") :
					i == 6 ? getLang("saturday") :
						i == 5 ? getLang("friday") :
							i == 4 ? getLang("thursday") :
								i == 3 ? getLang("wednesday") :
									i == 2 ? getLang("tuesday") :
										getLang("monday");
				msg += `${day}: ${getCoin} coin, ${getExp} exp\n`;
			}
			return message.reply(msg);
		}

		const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
		const { senderID } = event;

		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(getLang("alreadyReceived"));

		const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp,
			data: userData.data
		});
		message.reply(getLang("received", getCoin, getExp));
	}
};
