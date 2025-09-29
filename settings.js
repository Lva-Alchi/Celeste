const fs = require('fs');
const chalk = require('chalk');

//~~~~~~~~~< GLOBAL SETTINGS >~~~~~~~~~\\
global.botNumber = "6285123797554"
global.owner = ['6283854528779']
global.ownerUtama = "6283854528779"
global.own = "6283854528779@s.whatsapp.net"
global.namaOwner = "Alchii"
global.ownerName = "𝐀𝐥𝐜𝐡𝐢"
global.packname = 'ᴍᴀᴅᴇ ʙʏ ᴄᴇʟᴇsᴛᴇ-ʙᴏᴛ'
global.botname = '╌ 𝐂𝐞𝐥𝐞𝐬𝐭𝐞 ╌'
global.botname2 = '╌ 𝐒𝐤𝐲 𝐆𝐨𝐝𝐝𝐞𝐬𝐬╌'
global.tempatDB = 'database.json'
global.pairing_code = true

global.set = {
  blastMode: false,
  autoBlock: false,
  autoDelMsg: false,
  autoRead: true,
  version: "1.0.0",
}
//==============================================
global.linkOwner = "https://wa.me/6283854528779"
global.linkGrup = "https://chat.whatsapp.com/La78KpfZ1yjJSV9oTTRsTJ"
global.linkGrup2 = "https://chat.whatsapp.com/La78KpfZ1yjJSV9oTTRsTJ"
global.linkSaluran = "https://whatsapp.com/channel/0029Vb1mMj3BFLgczEQ3241t"
global.idsaluran = "120363385984693272@newsletter"
global.idch = '120363338443227796@newsletter'
global.nameChannel = "Alchii"
global.yutub = 'youtube.com/@alchii_ofc'
global.tele = 't.me/alchihuy'
//===========================
// Delay || 1000ms = 1 seconds
global.delayBot = 5000
//===============================

//===============================

//========= [PAYMENT] ==========
global.qris = "https://img1.pixhost.to/images/5659/597126268_alchihost.jpg"
global.saweria = "https://saweria.co/Lovea"
global.trakteer = "https://trakteer.id/alchiwak/tip"

//=========[RESPON BOT]
global.mess = {
  done: "𝐇𝐞𝐫𝐞 𝐘𝐨𝐮 𝐆𝐨",
	owner: "𝑇ℎ𝑖𝑠 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑤𝑎𝑠 𝑶𝑾𝑵𝑬𝑹 𝑂𝑛𝑙𝑦 !!",
	admin: "𝑇ℎ𝑖𝑠 𝑤𝑎𝑠 𝑨𝒅𝒎𝒊𝒏 𝑒𝑥𝑐𝑙𝑢𝑠𝑖𝑣𝑒 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 !",
	botAdmin: " 𝐉𝐀𝐃𝐈𝐊𝐀𝐍 𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 !! 𝘣𝘪𝘢𝘳 𝘧𝘪𝘵𝘶𝘳𝘯𝘺𝘢 𝘸𝘰𝘳𝘬 𝘯𝘰𝘳𝘮𝘢𝘭",
	group: "𝑈𝑠𝑒 𝑡ℎ𝑖𝑠 𝑜𝑛 𝑎 𝐆𝐫𝐨𝐮𝐩 !!",
	private: "𝑇ℎ𝑖𝑠 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑜𝑛𝑙𝑦 𝑎𝑐𝑐𝑒𝑠𝑠 𝑜𝑛 𝑷𝒓𝒊𝒗𝒂𝒕𝒆 𝑪𝒉𝒂𝒕",
	prem: "𝑈𝑝𝑔𝑟𝑎𝑑𝑒 𝑡𝑜 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝑡𝑜 𝑢𝑠𝑒 𝑡ℎ𝑖𝑠!",
}
//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});