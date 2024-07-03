const { findUid } = global.utils;
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "ban",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Cấm thành viên khỏi box chat",
			en: "Ban user from box chat"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} [@tag|uid|link fb|reply] [<lý do cấm>|để trống nếu không có lý do]: Cấm thành viên khỏi box chat"
				+ "\n   {pn} check: Kiểm tra thành viên bị cấm và kick thành viên đó ra khỏi box chat"
				+ "\n   {pn} unban [@tag|uid|link fb|reply]: Bỏ cấm thành viên khỏi box chat"
				+ "\n   {pn} list: Xem danh sách thành viên bị cấm",
			en: "   {pn} [@tag|uid|fb link|reply] [<reason>|leave blank if no reason]: Ban user from box chat"
				+ "\n   {pn} check: Check banned members and kick them out of the box chat"
				+ "\n   {pn} unban [@tag|uid|fb link|reply]: Unban user from box chat"
				+ "\n   {pn} list: View the list of banned members"
		}
	},

	langs: {
		vi: {
			notFoundTarget: "⚠️ | Vui lòng tag người cần cấm hoặc nhập uid hoặc link fb hoặc phản hồi tin nhắn của người cần cấm",
			notFoundTargetUnban: "⚠️ | Vui lòng tag người cần bỏ cấm hoặc nhập uid hoặc link fb hoặc phản hồi tin nhắn của người cần bỏ cấm",
			userNotBanned: "⚠️ | Người mang id %1 không bị cấm khỏi box chat này",
			unbannedSuccess: "✅ | Đã bỏ cấm %1 khỏi box chat!",
			cantSelfBan: "⚠️ | Bạn không thể tự cấm chính mình!",
			cantBanAdmin: "❌ | Bạn không thể cấm quản trị viên!",
			existedBan: "❌ | Người này đã bị cấm từ trước!",
			noReason: "Không có lý do",
			bannedSuccess: "✅ | Đã cấm %1 khỏi box chat!",
			needAdmin: "⚠️ | Bot cần quyền quản trị viên để kick thành viên bị cấm",
			noName: "Người dùng facebook",
			noData: "📑 | Không có thành viên nào bị cấm trong box chat này",
			listBanned: "📑 | Danh sách thành viên bị cấm trong box chat này (trang %1/%2)",
			content: "%1/ %2 (%3)\nLý do: %4\nThời gian cấm: %5\n\n",
			needAdminToKick: "⚠️ | Thành viên %1 (%2) bị cấm khỏi box chat, nhưng bot không có quyền quản trị viên để kick thành viên này, vui lòng cấp quyền quản trị viên cho bot để kick thành viên này",
			bannedKick: "⚠️ | %1 đã bị cấm khỏi box chat từ trước!\nUID: %2\nLý do: %3\nThời gian cấm: %4\n\nBot đã tự động kick thành viên này"
		},
		en: {
			notFoundTarget: "___________________\n🕴 | 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐢𝐝𝐞𝐧𝐭𝐢𝐟𝐢𝐞𝐫 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 à 𝐛𝐚𝐧𝐧𝐢𝐫 𝐨𝐮 𝐬𝐚𝐢𝐬𝐢𝐫 𝐮𝐧 𝐥𝐢𝐞𝐧 𝐔𝐈𝐃 𝐨𝐮 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐨𝐮 𝐫é𝐩𝐨𝐧𝐝𝐫𝐞 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 à 𝐛𝐚𝐧𝐧𝐢𝐫\n_________________",
			notFoundTargetUnban: "__________________\n👮🏻‍♂️ | 𝚅𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚒𝚍𝚎𝚗𝚝𝚒𝚏𝚒𝚎𝚛 𝚕𝚊 𝚙𝚎𝚛𝚜𝚘𝚗𝚗𝚎 à 𝚍é𝚋𝚊𝚗𝚗𝚒𝚛 𝚘𝚞 𝚜𝚊𝚒𝚜𝚒𝚛 𝚞𝚗 𝚕𝚒𝚎𝚗 𝚄𝙸𝙳 𝚘𝚞 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚘𝚞 𝚛é𝚙𝚘𝚗𝚍𝚛𝚎 𝚊𝚞 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚍𝚎 𝚕𝚊 𝚙𝚎𝚛𝚜𝚘𝚗𝚗𝚎 à 𝚍é𝚋𝚊𝚗𝚗𝚒𝚛.\n______________________",
			userNotBanned: "⚠️ | 𝐓𝐡𝐞 𝐩𝐞𝐫𝐬𝐨𝐧 𝐰𝐢𝐭𝐡 𝐢𝐝 %1 𝐢𝐬 𝐧𝐨𝐭 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐭𝐡𝐢𝐬 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭",
			unbannedSuccess: "✅ | 𝑈𝑛𝑏𝑎𝑛𝑛𝑒𝑑 %1 𝑓𝑟𝑜𝑚 𝑏𝑜𝑥 𝑐ℎ𝑎𝑡!",
			cantSelfBan: "⚠️ | 𝗬𝗼𝘂 𝗰𝗮𝗻'𝘁 𝗯𝗮𝗻 𝘆𝗼𝘂𝗿𝘀𝗲𝗹𝗳!",
			cantBanAdmin: "❌ | 𝗬𝗼𝘂 𝗰𝗮𝗻'𝘁 𝗯𝗮𝗻 𝘁𝗵𝗲 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝘁𝗼𝗿!",
			existedBan: "❌ | 𝙏𝙝𝙞𝙨 𝙥𝙚𝙧𝙨𝙤𝙣 𝙝𝙖𝙨 𝙗𝙚𝙚𝙣 𝙗𝙖𝙣𝙣𝙚𝙙 𝙗𝙚𝙛𝙤𝙧𝙚!",
			noReason: "𝙉𝙤 𝙧𝙚𝙖𝙨𝙤𝙣",
			bannedSuccess: "✅ | 𝘽𝙖𝙣𝙣𝙚𝙙 %1 𝙛𝙧𝙤𝙢 𝙗𝙤𝙭 𝙘𝙝𝙖𝙩!",
			needAdmin: "⚠️ | 𝘽𝙤𝙩 𝙣𝙚𝙚𝙙𝙨 𝙖𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙩𝙤𝙧 𝙥𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣 𝙩𝙤 𝙠𝙞𝙘𝙠 𝙗𝙖𝙣𝙣𝙚𝙙 𝙢𝙚𝙢𝙗𝙚𝙧𝙨",
			noName: "𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙪𝙨𝙚𝙧",
			noData: "📑 | 𝙏𝙝𝙚𝙧𝙚 𝙖𝙧𝙚 𝙣𝙤 𝙗𝙖𝙣𝙣𝙚𝙙 𝙢𝙚𝙢𝙗𝙚𝙧𝙨 𝙞𝙣 𝙩𝙝𝙞𝙨 𝙗𝙤𝙭 𝙘𝙝𝙖𝙩",
			listBanned: "📑 | 𝐥𝐚 𝐥𝐢𝐬𝐭𝐞 𝐝𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐛𝐚𝐧𝐧𝐢𝐬 𝐝𝐮 𝐯𝐢𝐥𝐥𝐚𝐠𝐞 (page %1/%2)",
			content: "%1/ %2 (%3)\nReason: %4\nBan time: %5\n\n",
			needAdminToKick: "_____________________\n⚠️ | 𝐌𝐞𝐦𝐛𝐞𝐫 %1 (%2) 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭, 𝐛𝐮𝐭 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐭𝐨 𝐤𝐢𝐜𝐤 𝐭𝐡𝐢𝐬 𝐦𝐞𝐦𝐛𝐞𝐫, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐠𝐫𝐚𝐧𝐭 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐭𝐨 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐭𝐨 𝐤𝐢𝐜𝐤 𝐭𝐡𝐢𝐬 𝐦𝐞𝐦𝐛𝐞𝐫\n__________________",
			bannedKick: "⚠️ | %1 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚋𝚊𝚗𝚗𝚎𝚍 𝚏𝚛𝚘𝚖 𝚋𝚘𝚡 𝚌𝚑𝚊𝚝 𝚋𝚎𝚏𝚘𝚛𝚎!\n𝚄𝙸𝙳: %2\n𝚁𝚎𝚊𝚜𝚘𝚗: %3\n𝙱𝚊𝚗 𝚝𝚒𝚖𝚎: %4\n\n𝙱𝚘𝚝 𝚑𝚊𝚜 𝚊𝚞𝚝𝚘𝚖𝚊𝚝𝚒𝚌𝚊𝚕𝚕𝚢 𝚔𝚒𝚌𝚔𝚎𝚍 𝚝𝚑𝚒𝚜 𝚖𝚎𝚖𝚋𝚎𝚛"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang, usersData, api }) {
		const { members, adminIDs } = await threadsData.get(event.threadID);
		const { senderID } = event;
		let target;
		let reason;

		const dataBanned = await threadsData.get(event.threadID, 'data.banned_ban', []);

		if (args[0] == 'unban') {
			if (!isNaN(args[1]))
				target = args[1];
			else if (args[1]?.startsWith('https'))
				target = await findUid(args[1]);
			else if (Object.keys(event.mentions || {}).length)
				target = Object.keys(event.mentions)[0];
			else if (event.messageReply?.senderID)
				target = event.messageReply.senderID;
			else
				return api.sendMessage(getLang('notFoundTargetUnban'), event.threadID, event.messageID);

			const index = dataBanned.findIndex(item => item.id == target);
			if (index == -1)
				return api.sendMessage(getLang('userNotBanned', target), event.threadID, event.messageID);

			dataBanned.splice(index, 1);
			await threadsData.set(event.threadID, dataBanned, 'data.banned_ban');
			const userName = members[target]?.name || await usersData.getName(target) || getLang('noName');

			return api.sendMessage(getLang('unbannedSuccess', userName), event.threadID, event.messageID);
		}
		else if (args[0] == "check") {
			if (!dataBanned.length)
				return;
			for (const user of dataBanned) {
				if (event.participantIDs.includes(user.id))
					api.removeUserFromGroup(user.id, event.threadID);
			}
		}

		if (event.messageReply?.senderID) {
			target = event.messageReply.senderID;
			reason = args.join(' ');
		}
		else if (Object.keys(event.mentions || {}).length) {
			target = Object.keys(event.mentions)[0];
			reason = args.join(' ').replace(event.mentions[target], '');
		}
		else if (!isNaN(args[0])) {
			target = args[0];
			reason = args.slice(1).join(' ');
		}
		else if (args[0]?.startsWith('https')) {
			target = await findUid(args[0]);
			reason = args.slice(1).join(' ');
		}
		else if (args[0] == 'list') {
			if (!dataBanned.length)
				return message.reply(getLang('noData'));
			const limit = 20;
			const page = parseInt(args[1] || 1) || 1;
			const start = (page - 1) * limit;
			const end = page * limit;
			const data = dataBanned.slice(start, end);
			let msg = '';
			let count = 0;
			for (const user of data) {
				count++;
				const name = members[user.id]?.name || await usersData.getName(user.id) || getLang('noName');
				const time = user.time;
				msg += getLang('content', start + count, name, user.id, user.reason, time);
			}
			return message.reply(getLang('listBanned', page, Math.ceil(dataBanned.length / limit)) + '\n\n' + msg);
		}

		if (!target)
			return message.reply(getLang('notFoundTarget'));
		if (target == senderID)
			return message.reply(getLang('cantSelfBan'));
		if (adminIDs.includes(target))
			return message.reply(getLang('cantBanAdmin'));

		const banned = dataBanned.find(item => item.id == target);
		if (banned)
			return message.reply(getLang('existedBan'));

		const name = members[target]?.name || (await usersData.getName(target)) || getLang('noName');
		const time = moment().tz(global.GoatBot.config.timeZone).format('HH:mm:ss DD/MM/YYYY');
		const data = {
			id: target,
			time,
			reason: reason || getLang('noReason')
		};

		dataBanned.push(data);
		await threadsData.set(event.threadID, dataBanned, 'data.banned_ban');
		message.reply(getLang('bannedSuccess', name), () => {
			if (members.some(item => item.userID == target)) {
				if (adminIDs.includes(api.getCurrentUserID()))
					api.removeUserFromGroup(target, event.threadID);
				else
					message.send(getLang('needAdmin'), (err, info) => {
						global.GoatBot.onEvent.push({
							messageID: info.messageID,
							onStart: ({ event }) => {
								if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
									const { TARGET_ID } = event.logMessageData;
									if (TARGET_ID == api.getCurrentUserID()) {
										api.removeUserFromGroup(target, event.threadID, () => global.GoatBot.onEvent = global.GoatBot.onEvent.filter(item => item.messageID != info.messageID));
									}
								}
							}
						});
					});
			}
		});
	},

	onEvent: async function ({ event, api, threadsData, getLang, message }) {
		if (event.logMessageType == "log:subscribe") {
			const { threadID } = event;
			const dataBanned = await threadsData.get(threadID, 'data.banned_ban', []);
			const usersAdded = event.logMessageData.addedParticipants;

			for (const user of usersAdded) {
				const { userFbId, fullName } = user;
				const banned = dataBanned.find(item => item.id == userFbId);
				if (banned) {
					const reason = banned.reason || getLang('noReason');
					const time = banned.time;
					return api.removeUserFromGroup(userFbId, threadID, err => {
						if (err)
							return message.send(getLang('needAdminToKick', fullName, userFbId), (err, info) => {
								global.GoatBot.onEvent.push({
									messageID: info.messageID,
									onStart: ({ event }) => {
										if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
											const { TARGET_ID } = event.logMessageData;
											if (TARGET_ID == api.getCurrentUserID()) {
												api.removeUserFromGroup(userFbId, event.threadID, () => global.GoatBot.onEvent = global.GoatBot.onEvent.filter(item => item.messageID != info.messageID));
											}
										}
									}
								});
							});
						else
							message.send(getLang('bannedKick', fullName, userFbId, reason, time));
					});
				}
			}
		}
	}
};
