const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: "━──────╮•╭─────━\n✉️| 𝐌𝐄𝐑𝐂𝐈 𝐃𝐄 𝐌'𝐀𝐕𝐎𝐈𝐑 𝐀𝐉𝐎𝐔𝐓𝐄𝐑 𝐃𝐀𝐍𝐒 𝐕𝐎𝐓𝐑𝐄 𝐆𝐑𝐎𝐔𝐏𝐄\n_________________________\n✰𝐌𝐎𝐍 𝐏𝐑𝐄𝐅𝐈𝐗 𝐄𝐒𝐓〖%1〗\n______________________\n✰𝐏𝐎𝐔𝐑 𝐕𝐎𝐈𝐑 𝐋𝐀 𝐋𝐈𝐒𝐓𝐄 𝐃𝐄 𝐂𝐌𝐃 𝐄𝐂𝐑𝐈𝐕𝐄𝐙 %1𝐀𝐈𝐃𝐄\n━────────╮•╭────────━",
			multiple1: "𝐀 𝐓𝐎𝐈",
			multiple2: "𝐀 𝐕𝐎𝐔𝐒",
			defaultWelcomeMessage: `𝐘𝐎 🕷🕸{userName}.🕸🕷\n____________________________\n🛸 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐔 {multiple}\n____________________________ 𝐃𝐀𝐍𝐒 𝐋𝐄 𝐆𝐑𝐎𝐔𝐏𝐄 〖{boxName}〗\n____________________________\n🎁\n🤲 𝐓𝐈𝐄𝐍𝐒 𝐔𝐍 𝐂𝐀𝐃𝐄𝐀𝐔 𝐏𝐎𝐔𝐑 𝐓𝐎𝐈 𝐄𝐓 𝐏𝐀𝐒𝐒𝐄 𝐔𝐍𝐄 𝐁𝐎𝐍𝐍𝐄 𝐉𝐎𝐔𝐑𝐍𝐄𝐄`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
