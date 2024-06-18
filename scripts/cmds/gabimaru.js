module.exports = {
	config: {
		name: "gabimaru",
		aliases: ["vide"],
		version: "1.0",
		author: "𝐥𝐞 𝐯𝐢𝐝𝐞", // do not change this credits
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of Gabi",
		longDescription: "sends u pic of Gabi",
		category: "meme",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.ibb.co/353stxw/image.jpg",
"https://i.ibb.co/L97VYjf/image.jpg",
"https://i.ibb.co/HPzszSZ/image.jpg",
"https://i.ibb.co/YBZnjtz/image.jpg",
"https://i.ibb.co/Ny7pcTP/image.jpg",
"https://i.ibb.co/VTdqQHG/image.jpg",
"https://i.ibb.co/jrpK8rJ/image.jpg",
"https://i.ibb.co/RpgYYK2/image.jpg",
"https://i.ibb.co/L6Px1v0/image.jpg",
"https://i.ibb.co/HXrWKqc/image.jpg",
"https://i.ibb.co/GtsCMhY/image.jpg",
"https://i.ibb.co/wdvVqHc/image.jpg",
"https://i.ibb.co/nLQn9tC/image.jpg",
"https://i.ibb.co/wdvVqHc/image.jpg",
"https://i.ibb.co/nLQn9tC/image.jpg",
"https://i.ibb.co/7GzJcqQ/image.jpg",
"https://i.ibb.co/YBZnjtz/image.jpg",
"https://i.ibb.co/HPzszSZ/image.jpg",
"https://i.ibb.co/L97VYjf/image.jpg",
"https://i.ibb.co/353stxw/image.jpg",
"https://i.ibb.co/K62TbFs/image.jpg",
"https://i.ibb.co/F7wtWz7/image.jpg",
"https://i.ibb.co/hMGbQd3/image.jpg",
"https://i.ibb.co/s9Z2PBP/image.jpg",
"https://i.ibb.co/Y0BzXV4/image.jpg",
"https://i.ibb.co/ftM4ktN/image.jpg",
"https://i.ibb.co/1mLJ6Wy/image.jpg",
"https://i.ibb.co/Mns2bmS/image.jpg",
"https://i.ibb.co/Y2XwcvS/image.jpg",
"https://i.ibb.co/yXvFfGD/image.jpg",
"https://i.ibb.co/5G2WdHd/image.jpg",
"https://i.ibb.co/YWn81L1/image.jpg",
"https://i.ibb.co/mBB8RyF/image.jpg",
"https://i.ibb.co/HxvMY30/image.jpg",


  ]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '🌬❄ 𝐆𝐀𝐁𝐈𝐌𝐀𝐑𝐔 𝐋𝐄 𝐕𝐈𝐃𝐄💙',attachment: await global.utils.getStreamFromURL(img)
})
}
     }
