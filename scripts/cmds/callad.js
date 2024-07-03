const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "callad",
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "gửi báo cáo, góp ý, báo lỗi,... của bạn về admin bot",
			en: "send report, feedback, bug,... to admin bot"
		},
		category: "contacts admin",
		guide: {
			vi: "   {pn} <tin nhắn>",
			en: "   {pn} <message>"
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi về admin",
			sendByGroup: "\n- Được gửi từ nhóm: %1\n- Thread ID: %2",
			sendByUser: "\n- Được gửi từ người dùng",
			content: "\n\nNội dung:\n✇═❦═•| ۞ |•═❦═✇\n%1\n─✇═❦═•| ༄ |•═❦═✇\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			success: "Đã gửi tin nhắn của bạn về %1 admin thành công!\n%2",
			failed: "Đã có lỗi xảy ra khi gửi tin nhắn của bạn về %1 admin\n%2\nKiểm tra console để biết thêm chi tiết",
			reply: "🕹 Phản hồi từ admin %1:\n✇═❦═•| ☆ |•═❦═✇\n%2\n✇═❦═•| ✵ |•═❦═✇\nPhản hồi tin nhắn này để tiếp tục gửi tin nhắn về admin",
			replySuccess: "Đã gửi phản hồi của bạn về admin thành công!",
			feedback: "📝 Phản hồi từ người dùng %1:\n- User ID: %2%3\n\nNội dung:\n✇═❦═•| ☢ |•═❦═✇\n%4\n✇═❦═•| ☢ |•═❦═✇\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			replyUserSuccess: "Đã gửi phản hồi của bạn về người dùng thành công!",
			noAdmin: "Hiện tại bot chưa có admin nào"
		},
		en: {
			missingMessage: "𝚅𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚜𝚊𝚒𝚜𝚒𝚛 𝚕𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚚𝚞𝚎 𝚟𝚘𝚞𝚜 𝚜𝚘𝚞𝚑𝚊𝚒𝚝𝚎𝚣 𝚎𝚗𝚟𝚘𝚢𝚎𝚛 à 𝚖𝚎𝚜 𝚌𝚑𝚎𝚏𝚜",
			sendByGroup: "\n\n- 𝐄𝐧𝐯𝐨𝐲é 𝐝𝐞𝐩𝐮𝐢𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞👥: %1\n- 𝐔𝐢𝐝 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞: %2",
			sendByUser: "\n- 𝐄𝐧𝐯𝐨𝐲é 𝐩𝐚𝐬 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫",
			content: "\n\n𝐂𝐨𝐧𝐭𝐞𝐧𝐮:\n\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n%1\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n𝗥é𝗽𝗼𝗻𝗱𝗲𝘇 à 𝗰𝗲 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗽𝗼𝘂𝗿 𝗲𝗻𝘃𝗼𝘆𝗲𝗿 𝘂𝗻 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 à 𝗹'𝘂𝘁𝗶𝗹𝗶𝘀𝗮𝘁𝗲𝘂𝗿 \n━━━━━━━━━━━━━━",
			success: "𝐒𝐞𝐧𝐭 𝐲𝐨𝐮𝐫 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐨 %1 𝐚𝐝𝐦𝐢𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!\n%2",
			failed: "An error occurred while sending your message to %1 admin\n%2\nCheck console for more details",
			reply: "📧━━━━ 𝗥é𝗽𝗼𝗻𝘀𝗲 𝗱𝘂 𝗰𝗵𝗲𝗳  ➪%1☜︎︎︎ ━━━━📧:\n\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n%2\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 à 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 à 𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 à 𝐥'𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐞𝐮𝐫\n━━━━━━━━━━━━━━",
			replySuccess: "🗳✔",
			feedback: "📝 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐝𝐮 𝐟𝐨𝐫𝐦𝐮𝐥𝐚𝐢𝐫𝐞 %1:\n\n- 𝐔𝐢𝐝 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫: %2%3\n\n𝐂𝐨𝐧𝐭𝐞𝐧𝐮:\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n%4\n◆❯━━━━━━━▣✦▣━━━━━━━━❮◆\n\n𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 à 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 à 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫\n━━━━━━━━━━━━━━",
			replyUserSuccess: "📥✔",
			noAdmin: "Bot has no admin at the moment"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		const { config } = global.GoatBot;
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const { senderID, threadID, isGroup } = event;
		if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
		const senderName = await usersData.getName(senderID);
		const msg = "📬___𝙲𝚑𝚎𝚏 𝚟𝚘𝚞𝚜 𝚊𝚟𝚎𝚣 𝚞𝚗 𝚗𝚘𝚞𝚟𝚎𝚊𝚞 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚍𝚊𝚗𝚜 𝚟𝚘𝚝𝚛𝚎 𝚌𝚘𝚞𝚛𝚒𝚎𝚕___ 📬"
			+ `\n- ➪𝐍𝐨𝐦 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫: ${senderName}`
			+ `\n- ➪𝐔𝐢𝐝 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫: ${senderID}`
			+ (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

		const formMessage = {
			body: msg + getLang("content", args.join(" ")),
			mentions: [{
				id: senderID,
				tag: senderName
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];
		const adminNames = await Promise.all(config.adminBot.map(async item => ({
			id: item,
			name: await usersData.getName(item)
		})));

		for (const uid of config.adminBot) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "userCallAdmin"
				});
			}
			catch (err) {
				failedIDs.push({
					adminID: uid,
					error: err
				});
			}
		}

		let msg2 = "";
		if (successIDs.length > 0)
			msg2 += getLang("success", successIDs.length,
				adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
			);
		if (failedIDs.length > 0) {
			msg2 += getLang("failed", failedIDs.length,
				failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
			);
			log.err("CALL ADMIN", failedIDs);
		}
		return message.reply({
			body: msg2,
			mentions: adminNames.map(item => ({
				id: item.id,
				tag: item.name
			}))
		});
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "userCallAdmin": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "userCallAdmin"
					});
				}, messageIDSender);
				break;
			}
			default: {
				break;
			}
		}
	}
};
