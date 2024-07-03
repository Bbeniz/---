const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: "{userName} đã {type} khỏi nhóm"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "𝐪𝐮𝐢𝐭𝐭é",
			leaveType2: "𝐋𝐚𝐭𝐮𝐦 🙏,𝐄𝐧𝐟𝐢𝐧 𝐢𝐥(𝐞𝐥𝐥𝐞) 𝐩𝐚𝐫𝐭𝐢 𝐞𝐧 𝐩𝐥𝐮𝐬 𝐣𝐞 𝐥'𝐚𝐢𝐦𝐞 𝐩𝐚𝐬 𝐝𝐞 𝐭𝐨𝐮𝐭𝐞 𝐟𝐚ç𝐨𝐧😒",
			defaultLeaveMessage: "𝐔𝐧𝐞 𝐦𝐢𝐧𝐮𝐭𝐞 𝐝𝐞 𝐬𝐢𝐥𝐚𝐧𝐜𝐞 𝐩𝐨𝐮𝐫 𝐧𝐨𝐭𝐫𝐞 𝐜𝐡𝐞𝐫 𝐚𝐦𝐢(𝐞) 🛸{userName}🛸 𝐪𝐮𝐢 𝐯𝐢𝐞𝐧𝐬 𝐝𝐞 𝐧𝐨𝐮𝐬 {type} "
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage)
					return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID())
					return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// {userName}   : name of the user who left the group
				// {type}       : type of the message (leave)
				// {boxName}    : name of the box
				// {threadName} : name of the box
				// {time}       : time
				// {session}    : session

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				leaveMessage = leaveMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g, hours <= 10 ?
						getLang("session1") :
						hours <= 12 ?
							getLang("session2") :
							hours <= 18 ?
								getLang("session3") :
								getLang("session4")
					);

				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};
