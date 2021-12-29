let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	alpha = new WAConnection()
    conn.logger.level = 'warn'
    conn.version = [2, 2123, 8]
    conn.browserDescription = [ 'jadibot', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Rules:*\nQR akan diganti setiap 20 detik'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    alpha.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`Sukses Jadi Bot\n\n*Device*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await alpha.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    alpha.on('chat-update', async (message) => {
        require('../index.js')(alpha, message)
    })
}

const stopjadibot = (reply) => {
	alpha = new WAConnection();
	conn.close()
	reply('Sukses stop jadibot')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}
