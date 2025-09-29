process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

require('./settings');
const fs = require('fs');
const ms = require('ms');
const util = require('util');
const jimp = require('jimp');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const ytdl = require('node-yt-dl');
const speed = require('performance-now');
const moment = require('moment-timezone');
const nou = require("node-os-utils");
const cheerio = require('cheerio');
const os = require('os');
const pino = require('pino');
const { Client } = require('ssh2');
const fetch = require('node-fetch');
const path = require('path');
const crypto = require('crypto');
const archiver = require("archiver");
const sharp = require('sharp');
const moment = require('moment-timezone');
const { exec, spawn, execSync } = require('node:child_process');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, delay } = require('@whiskeysockets/baileys');
const { aio, igdl, ttdl, fbdown, twitter, youtube, capcut, gdrive} = require('btch-downloader');
const { ImageUploadService } = require('node-upload-images');
const turl = require('turl');
const JsConfuser = require("js-confuser");
const { generateMenu, generateMenu2, generateListMenu, generateAllMenu } = require('./listmenu/handlers');

//===== [Time & Greetings] =====
const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
let ucapanWaktu
if (time >= "19:00:00" && time < "23:59:00") {
ucapanWaktu = "𝐺𝑜𝑜𝑑 𝑁𝑖𝑔ℎ𝑡 ✨"
} else if (time >= "15:00:00" && time < "19:00:00") {
ucapanWaktu = "𝐺𝑜𝑜𝑑 𝐴𝑓𝑡𝑒𝑟𝑛𝑜𝑜𝑛 ✨"
} else if (time >= "11:00:00" && time < "15:00:00") {
ucapanWaktu = "𝐺𝑜𝑜𝑑 𝐷𝑎𝑦 ✨"
} else if (time >= "06:00:00" && time < "11:00:00") {
ucapanWaktu = "𝐺𝑜𝑜𝑑 𝑀𝑜𝑟𝑛𝑖𝑛𝑔 ✨"
} else if (time >= "00:00:00" && time < "5:59:00") {
} else {
ucapanWaktu = "𝐼𝑡𝑠 𝑎 𝑠𝑡𝑖𝑙𝑙 𝐷𝑎𝑤𝑛, 𝑔𝑜 𝑏𝑎𝑐𝑘 𝑡𝑜 𝑠𝑙𝑒𝑒𝑝✨"
};
const wib = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z")
const wita = moment(Date.now()).tz("Asia/Makassar").locale("id").format("HH:mm:ss z")
const wit = moment(Date.now()).tz("Asia/Jayapura").locale("id").format("HH:mm:ss z")
const salam = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a")
let d = new Date
let gmt = new Date(0).getTime() - new Date("1 Januari 2025").getTime()
let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor((d.getTime() + gmt) / 84600000) % 5]
let week = d.toLocaleDateString("id", { weekday: "long" })
let calender = d.toLocaleDateString("id", {
day: "numeric",
month: "long",
year: "numeric"
});
//=============================

const { LoadDataBase } = require('./lib/message');
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { imageToWebp, videoToWebp, writeExif } = require('./lib/exif');
const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, tanggal, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, toIDR, getTypeUrlMedia, pickRandom, expDate } = require('./lib/function');
const pkg = JSON.parse(fs.readFileSync("./package.json"))
const antidel = JSON.parse(fs.readFileSync("./database/antidel.json"))
const contacts = JSON.parse(fs.readFileSync("./database/contacts.json"))
const owners = JSON.parse(fs.readFileSync("./database/owner.json"))
const uploadImage = require('./lib/uploadImage')
const Func = require('./lib/Func')

//Everything starts here
module.exports = Celeste = async (Celeste, m, chatUpdate, store) => {
	try {
await LoadDataBase(Celeste, m)
const botNumber = await Celeste.decodeJid(Celeste.user.id)
const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = "."

const isCmd = body.startsWith(prefix) ? true : false
const isCommand = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ""
const from = m.key.remoteJid
const args = body.trim().split(/ +/).slice(1)
const getQuoted = (m.quoted || m)
const isOwner = owners.includes(m.sender) ? true : [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? true : false
const isCreator = [owners, owner].flat().map(v => String(v).replace(/\D/g, '') + '@s.whatsapp.net').includes(m.sender);
const sender = m.key.fromMe ? (Celeste.user.id.split(':')[0]+'@s.whatsapp.net' || Celeste.user.id) : (m.key.participant || m.key.remoteJid)
const autodelete = from && isCmd ? antidel.includes(from) : false 
//========= [ FAKE QUOTED ] =========
const fstatus = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `Created by Alchi`}}}
// Daftar URL gambar yang akan dipilih secara acak
const imageList = [
    'https://files.catbox.moe/6sbaiw.png',
    'https://files.catbox.moe/g68vf8.png',
    'https://files.catbox.moe/k0ygge.png',
    'https://files.catbox.moe/aa0gb5.jpg'
];

// Pilih gambar secara acak dari array
const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

const UrlList = [
    'https://files.catbox.moe/9ifqmp.mp4',
    'https://files.catbox.moe/zcq7ne.mp4',
    'https://files.catbox.moe/kex83a.mp4',
    'https://files.catbox.moe/fum4r5.mp4',
    'https://files.catbox.moe/sxbbme.mp4'
];

const randomUrl = UrlList[Math.floor(Math.random() * UrlList.length)];

const getWaktuWITA = () => {
    return moment().tz("Asia/Makassar").format("YYYY-MM-DD HH:mm:ss");
};
const waktuWITA = getWaktuWITA();

const getWaktuWIT = () => {
    return moment().tz("Asia/Jayapura").format("YYYY-MM-DD HH:mm:ss");
};
const waktuWIT = getWaktuWIT();

const getWaktuWIB = () => {
    return moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
};
const waktuWIB = getWaktuWIB();
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
var crypto = require("crypto")

const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ""
const text = q = args.join(' ')
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const reseller = JSON.parse(fs.readFileSync("./database/reseller.json"))
// const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
//DATABASE
let premium = [];
const PREMIUM_FILE = './database/premium.json';
const sewa = db.sewa
//USER ROLE
const isReseller = reseller.includes(m.sender)
// const isPremium = isCreator || prem.checkPremiumUser(m.sender, premium) || false
const isLimit = db.users[m.sender] ? (db.users[m.sender].limit > 0) : false
const isVip = db.users[m.sender] ? db.users[m.sender].vip : false
//=======[ FUNCTION ZONE]=====
function IniHari() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

  const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const hari = namaHari[now.getDay()];
  const tanggal = String(now.getDate()).padStart(2, "0");
  const bulan = namaBulan[now.getMonth()];
  const tahun = now.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

function updateVersion(type = "patch", operation = "increase") {
    const validTypes = ["major", "minor", "patch"];
    const validOperations = ["increase", "decrease"];

    if (!validTypes.includes(type)) {
        reply2(`❌ Type tidak valid! Hanya bisa: major, minor, patch.`);
        return;
    }
    if (!validOperations.includes(operation)) {
        reply2(`❌ Operation tidak valid! Hanya bisa: increase, decrease.`);
        return;
    }

    const filePath = path.join(__dirname, 'package.json');
    const packageData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    let [major, minor, patch] = packageData.version.split('.').map(Number);

    if (type === "major") {
        if (operation === "increase") major++;
        else if (operation === "decrease" && major > 0) major--;
        minor = 0;
        patch = 0;
    } else if (type === "minor") {
        if (operation === "increase") minor++;
        else if (operation === "decrease" && minor > 0) minor--;
        patch = 0;
    } else if (type === "patch") {
        if (operation === "increase") patch++;
        else if (operation === "decrease" && patch > 0) patch--;
    }

    packageData.version = `${major}.${minor}.${patch}`;

    fs.writeFileSync(filePath, JSON.stringify(packageData, null, 2));
    
    reply2(`✅ Version berhasil diupdate menjadi ${packageData.version}`);
    console.log(`✅ Version berhasil diupdate menjadi ${packageData.version}`);
}
//============================
//Premium Function
function loadPremium() {
  try {
    const data = fs.readFileSync(PREMIUM_FILE, 'utf-8');
    premium = JSON.parse(data);
  } catch (e) {
    premium = [];
  }
}
function savePremium() {
  fs.writeFileSync(PREMIUM_FILE, JSON.stringify(premium, null, 2));
}

loadPremium();

function checkPremium(jid) {
  const entry = premium.find(u => u.id === jid);
  if (!entry) return false;
  if (Date.now() > entry.expired) {
    // expired, auto-remove
    premium = premium.filter(u => u.id !== jid);
    savePremium();
    return false;
  }
  return true;
}
const isPremium = isCreator || checkPremium(m.sender) || false
////////////////////////
//const isPremium = premium.includes(m.sender)
const imageUrls = [
    'https://files.catbox.moe/0je7f9.jpg',
    'https://files.catbox.moe/vuazl3.jpg',
    'https://files.catbox.moe/84q84q.jpg',
    'https://files.catbox.moe/y9xkxk.jpg', 
    'https://files.catbox.moe/y4fp2r.jpg',
    'https://files.catbox.moe/pejao9.jpg'
];
    // Randomized Image
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
///============== [ MESSAGE ] ================
if (m.isGroup && global.db.groups[m.chat] && global.db.groups[m.chat].mute == true && !isCreator) return;

//AUTOREAD
if (!m.key.fromMe && global.set.autoread == true){
const readkey = {
remoteJid: m.chat,
id: m.key.id, 
participant: m.isGroup ? m.key.participant : undefined 
}
await Celeste.readMessages([readkey]);
}

//CONSOLE CHAT
if (isCmd && !m.isBaileys) {
    const chatType = m.isGroup ? "Group" : m.isChannel ? "Channel" : "Private";
    const timestamp = new Date().toLocaleTimeString();
    
    console.log(
        chalk.greenBright('┌───[ COMMAND LOG ]') + '\n' +
        chalk.greenBright('│') + '\n' +
        chalk.greenBright('├─') + chalk.hex('#FFA500').bold(' Command: ') + chalk.white.bold(`.${command}`) + '\n' +
        chalk.greenBright('├─') + chalk.hex('#00FFFF').bold(' Sender: ') + chalk.white(m.sender.split('@')[0]) + '\n' +
        chalk.greenBright('├─') + chalk.hex('#FF69B4').bold(' Chat: ') + chalk.white(`${chatType} ${m.isGroup ? chalk.hex('#32CD32')(`[${m.chat}]`) : ''}`) + '\n' +
        chalk.greenBright('├─') + chalk.hex('#9370DB').bold(' Time: ') + chalk.white(timestamp) + '\n' +
        chalk.greenBright('└───────────────────────────────')
    );
}
//======= Config Auto
//AutoBlock
let owr = JSON.parse(fs.readFileSync("./database/owner.json"))
let prm = JSON.parse(fs.readFileSync("./database/premium.json"))

if (global.set.autoBlock && !m.isGroup && !m.key.fromMe) {
  if (!owr.includes(m.sender) && !prm.includes(m.sender)) {
    setTimeout(async () => {
      try {
        await Celeste.updateBlockStatus(m.sender, "block")
        console.log(`🚫 AutoBlock: ${m.sender}`)
      } catch (err) {
        console.error("❌ Gagal blokir:", err)
      }
    }, 1000) // delay 0.5 detik
  } else {
    console.log(`✅ Whitelist: ${m.sender}`)
  }
}
//blastMode
if (global.set.blastMode && m?.key && m.key.fromMe) {
  setTimeout(async () => {
    try {
      await Celeste.sendMessage(m.chat, {
        delete: {
          remoteJid: m.key.remoteJid,
          fromMe: true,
          id: m.key.id,
          participant: m.key.participant || undefined
        }
      })

      let target = m.key.remoteJid
      if (!m.isGroup) {
        if (!owr.includes(target) && !prm.includes(target)) {
          await Celeste.updateBlockStatus(target, "block")
          console.log(`🚫 AutoBlock (BlastMode): ${target}`)
        } else {
          console.log(`✅ Whitelist (tidak diblokir): ${target}`)
        }
      }
    } catch (err) {
      console.error("❌ Error BlastMode:", err)
    }
  }, 1000) // delay 1 detik
}

//autoDelMsg
if (global.set.autoDelMsg && m?.key) {
    setTimeout(async () => {
      await Celeste.sendMessage(m.chat, {
        delete: {
          remoteJid: m.key.remoteJid,
          fromMe: true,
          id: m.key.id,
          participant: m.key.participant || undefined
        }
      })
    }, 500) // 1000ms = 1 detik
  }
//============= [ FAKEQUOTED ] ===============
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": "Celeste is Here"}}}

const qloc = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Celeste ready to assist`,jpegThumbnail: ""}}}

const qlocJpm = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Im Celeste-AI`,jpegThumbnail: ""}}}
const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `Payment By AlchiStore`, "description": null, "currencyCode": "USD", "priceAmount1000": "100000000", "retailerId": `Powered By Celeste-AI`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `Celeste is here`,jpegThumbnail: ""}}}

var ppuser
try {
ppuser = await Celeste.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/0je7f9.jpg' 
}

if (autodelete) {
Celeste.sendMessage(m.chat,
{
delete: {
remoteJid: m.chat,
fromMe: true,
id: m.key.id,
participant: m.key.participant
}
})
}

//Check Prem

//============= [ EVENT GROUP ] ===============================================

if (m.isGroup && db.groups[m.chat] && db.groups[m.chat].mute == true && !isCreator) return

if (m.isGroup && db.groups[m.chat]?.simi === true && !isCmd) {
    try {
        const respon = await axios.get(`https://api.yogik.id/ai/luminai?text=${encodeURIComponent(m.text)}`);
        if (respon) {
            await m.reply(respon);
        }
    } catch (error) {
        console.error("Error while fetching AI response:", error.message);
    }
}
if (m.isGroup && db.groups[m.chat] && db.groups[m.chat].antilink == true) {
var link = /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi
if (link.test(m.text) && !isCreator && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
var gclink = (`https://chat.whatsapp.com/` + await Celeste.groupInviteCode(m.chat))
var isLinkThisGc = new RegExp(gclink, 'i')
var isgclink = isLinkThisGc.test(m.text)
if (isgclink) return
let delet = m.key.participant
let bang = m.key.id
await Celeste.sendMessage(m.chat, {text: `*#- [ Link Grup Terdeteksi ]*

@${m.sender.split("@")[0]} Maaf kamu akan saya kick, karna sudah melanggar peraturan yang ada di dalam grup ini/`, mentions: [m.sender]}, {quoted: m})
await Celeste.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await sleep(1000)
await Celeste.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}}

if (m.isGroup && db.groups[m.chat] && db.groups[m.chat].antilink2 == true) {
var link = /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi
if (link.test(m.text) && !isCreator && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
var gclink = (`https://chat.whatsapp.com/` + await Celeste.groupInviteCode(m.chat))
var isLinkThisGc = new RegExp(gclink, 'i')
var isgclink = isLinkThisGc.test(m.text)
if (isgclink) return
let delet = m.key.participant
let bang = m.key.id
await Celeste.sendMessage(m.chat, {text: `*#- [ Link Grup Terdeteksi ]*

@${m.sender.split("@")[0]} Maaf pesan kamu saya hapus, karena admin melarang untuk share link grup di dalam grup ini`, mentions: [m.sender]}, {quoted: m})
await Celeste.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
/*await sleep(1000)
await Celeste.groupParticipantsUpdate(m.chat, [m.sender], "remove")*/
}}
//============ [ EVENT CONTROL ] =============

if (m.isGroup && db.settings.autopromosi == true) {
if (m.text.includes("https://") && !m.fromMe) {
await Celeste.sendMessage(m.chat, {text: `text: autoPromosi`}, {quoted: null})
}
}

Celeste.autoshalat = Celeste.autoshalat ? Celeste.autoshalat : {}
let id = m.chat 
if (id in Celeste.autoshalat) {
return false
}
let jadwalSholat = { shubuh: '04:29', terbit: '05:44', dhuha: '06:02', dzuhur: '12:02', ashar: '14:49', magrib: '17:52', isya: '19:01' }
const datek = new Date((new Date).toLocaleString("en-US", {timeZone: "Asia/Jakarta"}))
const hours = datek.getHours();
const minutes = datek.getMinutes();
const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
if (timeNow === waktu && m.isGroup) {
let caption = `
Hai!, kini waktu *${sholat}* telah tiba...\nAmbilah air wudhu dan segeralah sholat 😇\n\n*${waktu}*\n`
Celeste.autoshalat[id] = [
await Celeste.sendMessage(m.chat, {text: caption, mentions: [], contextInfo: { isForwarded: true, forwardingScore: 9999, mentionedJid: [], forwardedNewsletterMessageInfo: { newsletterName: `${botname}`, newsletterJid: global.idChannel }}}, {quoted: qlive}),
setTimeout(async () => {
delete Celeste.autoshalat[m.chat]
}, 50000)]
}}
    


//============== [ FUNCTION ] ================
var example = (teks) => {
return `\n\`⎚ ᴄᴏᴍᴍᴀɴᴅ ᴇʀʀᴏʀ :\`\n Ketik *${prefix+command}* ${teks}\n`
}

async function sendAlbumMessage(jid, medias, options) {
      options = {
        ...options
      }
      if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`)
      for (const media of medias) {
        if (!media.type || (media.type !== "image" && media.type !== "video"))
          throw new TypeError(`medias[i].type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`)
        if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data)))
          throw new TypeError(`medias[i].data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`)
      }
      if (medias.length < 2) throw new RangeError('Minimal 2 media')
      const caption = options.text || options.caption || ""
      const delayTime = !isNaN(options.delay) ? options.delay : 300
      delete options.text
      delete options.caption
      delete options.delay
      const album = generateWAMessageFromContent(jid, {
        messageContextInfo: {},
        albumMessage: {
          expectedImageCount: medias.filter(media => media.type === "image").length,
          expectedVideoCount: medias.filter(media => media.type === "video").length,
          ...(options.quoted ? {
            contextInfo: {
              remoteJid: options.quoted.key.remoteJid,
              fromMe: options.quoted.key.fromMe,
              stanzaId: options.quoted.key.id,
              participant: options.quoted.key.participant || options.quoted.key.remoteJid,
              quotedMessage: options.quoted.message,
            },
          } : {}),
        },
      }, {})
      await Celeste.relayMessage(album.key.remoteJid, album.message, {
        messageId: album.key.id
      })
      for (const i in medias) {
        const {
          type,
          data
        } = medias[i]
        const img = await generateWAMessage(
          album.key.remoteJid, {
            [type]: data,
            ...(i === "0" ? {
              caption
            } : {})
          }, {
            upload: Celeste.waUploadToServer
          })
        img.message.messageContextInfo = {
          messageAssociation: {
            associationType: 1,
            parentMessageKey: album.key
          },
        }
        await Celeste.relayMessage(img.key.remoteJid, img.message, {
          messageId: img.key.id
        })
        await delay(delayTime)
      }
      return album
    }

const CHANNELS_FILE = "./database/saluran.json";

// Fungsi untuk memuat data saluran dari file
function loadChannels() {
    if (fs.existsSync(CHANNELS_FILE)) {
        return JSON.parse(fs.readFileSync(CHANNELS_FILE, "utf-8"));
    }
    return [];
}
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const mm = String(minutes).padStart(2, '0');
    const ss = String(remainingSeconds).padStart(2, '0');

    return `${mm}:${ss}`;
}

function saveChannels(data) {
    fs.writeFileSync(CHANNELS_FILE, JSON.stringify(data, null, 2));
}

global.channels = loadChannels();

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

//============= [ Func Pendukung ] =======
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//FAKE REPLY
const reply2 = (teks) => {
Celeste.sendMessage(m.chat, {
  text: teks,
  footer: "𝑎𝑙𝑐ℎ𝑖",
  headerType: 6,
  contextInfo: {
        forwardingScore: 99999,
        isForwarded: true,
        containsAutoReply : true,
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "𝐂𝐞𝐥𝐞𝐬𝐭𝐞 ✨",
          thumbnailUrl: randomImage,
          sourceUrl: global.linkSaluran,
          mediaType: 1
        },
        forwardedNewsletterMessageInfo: {
                newsletterJid: global.idsaluran,
                newsletterName: global.nameChannel
            }
}}, { quoted: m })}
const chatCH = (idch, teks) => {
  Celeste.sendMessage(idch, 
{ text: teks }) }
const reply = (teks) => { 
Celeste.sendMessage(from, 
{ 
  text: teks, 
  footer: "𝑎𝑙𝑐ℎ𝑖",
  contextInfo: { 
  externalAdReply : { 
  title : "𝐂𝐞𝐥𝐞𝐬𝐭𝐞 ✨",
  containsAutoReply : true, 
  mediaType : 1, 
  thumbnail : fs.readFileSync("./src/thumbnail.jpg"), 
  mediaUrl : randomImage, 
  sourceUrl : global.linkSaluran }
}}, { quoted: m }) }
const replyVid = (teks) => {
  Celeste.sendMessage(from, {
  video: { url: randomUrl },
  mimetype: 'video/mp4',
  fileLength: 1000000,
  caption: teks,
  gifPlayback: true,
  gifAttribution: 5,
  contextInfo: {
  externalAdReply: {
  forwardingScore: 2023,
  title: global.botname,
  thumbnailUrl: randomImage,
  sourceUrl: global.linkSaluran, 
  mediaType: 1,
  renderLargerThumbnail: true,
}}
  }, { quoted: m }
  )}
//============= [ COMMAND ] ===============
switch (command) {
case 'menu': {
  const cap = `╭━━━━━┅┅┄───────┄┅┅━━━━━╮
             𝐂𝐄𝐋𝐄𝐒𝐓𝐄 𝐇𝐄𝐀𝐑𝐃 𝐘𝐀!
╰━━━━━┅┅┄───────┄┅┅━━━━━╯

${ucapanWaktu}
╭──( 𝐈𝐍𝐅𝐎 )──⊛
│ ʙᴏᴛ ɴᴀᴍᴇ : ${botname}
│ ᴄʀᴇᴀᴛᴏʀ : ${ownerName}
│ ᴠᴇʀsɪᴏɴ : ᴠ${global.set.version}
│ ʙᴏᴛ ᴍᴏᴅᴇ : *${Celeste.public ? "ᴘᴜʙʟɪᴄ": "sᴇʟғ"}*
│ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
╰─────────────────◈◈◇


${generateMenu2(0)}
  `
  reply2(cap)
}
break;
case 'allmenu': {
  reply(`${generateAllMenu()}`)
}
break;
case 'index': {
  try {
    if (!text) {
      return reply(generateListMenu());
    }
    const input = String(text).trim();
    if (input === "all") {
      const allMenu = generateAllMenu();
      return reply(allMenu);
    } else if (/^\d+$/.test(input)) {
      const menuResult = await generateMenu2(Number(input));
      return reply(menuResult);
    } else if (typeof input === 'string' && input !== "all") {
      const menuResult = await generateMenu2(input);
      return reply(menuResult);
    } else {
      return reply('⚠️ Invalid Format. Gunakan angka, teks menu, atau "all"');
    }
  } catch (e) {
    console.error(chalk.red('Menu Error:'), e);
    reply('⚠️ Error fetching menu list, Try again later');
  };
}
break;
case "self": {
if (!isCreator) return
Celeste.public = false
m.reply("𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐭𝐨 𝐬𝐞𝐥𝐟 𝐦𝐨𝐝𝐞")
}
break
case "public": {
if (!isCreator) return
Celeste.public = true
m.reply("𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐭𝐨 𝐩𝐮𝐛𝐥𝐢𝐜 𝐦𝐨𝐝𝐞")
}
break
case 'server': {
  let node = process.memoryUsage();
    let info;
    try {
      info = await fetch("https://ipwho.is").then((a) => a.json());
    } catch (e) {
      info = { connection: {}, country: "N/A", city: "N/A", flag: { emoji: "" }, timezone: { id: "N/A" } };
    }

    let start = performance.now();
    let tmpFiles = "N/A";
    try {
      tmpFiles = fs.readdirSync(os.tmpdir()).length;
    } catch (e) {}

    const username = process.env.USER || process.env.USERNAME || "N/A";
    const cap = `
╭──[ *Informasi Bot* ]
᎒⊸ 🖥️ *Berjalan Di* : ${username === "root" ? "VPS" : username === "container" ? "HOSTING ( PANEL )" : username}
᎒⊸ ⏱️ *Uptime* : ${Func.toDate(process.uptime() * 1000)}
᎒⊸ 🏠 *Direktori Rumah* : ${os.homedir()}
᎒⊸ 📂 *Direktori Tmp* : ${os.tmpdir()} *( ${tmpFiles} Berkas )*
᎒⊸ 🖥️ *Hostname* : ${os.hostname()}
᎒⊸ ⚙️ *Versi Node* : ${process.version}
᎒⊸ 🌍 *Cwd* : ${process.cwd()}

╭──[ *Informasi Provider* ]
᎒⊸ 🌐 *ISP* : ${info.connection.isp || "N/A"}
᎒⊸ 🏢 *Organisasi* : ${info.connection.org || "N/A"}
᎒⊸ 🌎 *Negara* : ${info.country}
᎒⊸ 🏙️ *Kota* : ${info.city}
᎒⊸ 🚩 *Bendera* : ${info.flag.emoji}
᎒⊸ ⏰ *Zona Waktu* : ${info.timezone.id}
╰────────────•

╭──[ *Informasi Server Asal* ]
᎒⊸ 🚀 *Kecepatan* : ${(performance.now() - start).toFixed(3)} ms
᎒⊸ ⏳ *Uptime* : ${Func.toDate(os.uptime() * 1000)}
᎒⊸ 🧠 *Total Memori* : ${Func.formatSize(os.totalmem() - os.freemem())} / ${Func.formatSize(os.totalmem())}
᎒⊸ 🖥️ *CPU* : ${os.cpus()[0]?.model || "N/A"} ( ${os.cpus().length} CORE )
᎒⊸ 📦 *Rilis* : ${os.release()}
᎒⊸ 🖧 *Tipe* : ${os.type()}
╰────────────•

╭──[ *Penggunaan Memori Nodejs* ]
${Object.entries(node)
  .map(([a, b]) => `᎒⊸ 💾 *${a[0].toUpperCase() + a.slice(1)}* : ${Func.formatSize(b)}`)
  .join("\n")}
╰────────────•`;

    m.reply(cap);
}
break;
case 'ping': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });

    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });

    let timestamp = speed();
    let latensi = speed() - timestamp;
    neww = performance.now();
    oldd = performance.now();

    // Formatting functions
    const formatPercent = (value) => `${value.toFixed(2)}%`.padStart(7, ' ');
    const formatHeader = (text) => `╭─❑ *${text}* ❑─\n`;
    const formatFooter = () => `╰───────────────────`;

    let respon = `
${formatHeader('BOT STATUS')}
⏱️ *Response Speed*: 
  - ${latensi.toFixed(4)} seconds
  - ${(oldd - neww).toFixed(2)} milliseconds

⏳ *Runtime*: ${runtime(process.uptime())}

${formatHeader('SERVER RESOURCES')}
💾 *Memory Usage*:
  ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  (${((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2)}% used)

📊 *NodeJS Memory*:
${Object.keys(used).map(key => 
  `  ◈ ${key.padEnd(10)}: ${formatp(used[key])}`
).join('\n')}

${cpus[0] ? `${formatHeader('CPU USAGE')}
🔧 *CPU Model*: ${cpus[0].model.trim()}
⚡ *Speed*: ${(cpu.speed / 1000).toFixed(2)} GHz

📈 *CPU Utilization*:
  ◈ User   : ${formatPercent(100 * cpu.times.user / cpu.total)}
  ◈ System : ${formatPercent(100 * cpu.times.sys / cpu.total)}
  ◈ Idle   : ${formatPercent(100 * cpu.times.idle / cpu.total)}

${formatHeader('CORE DETAILS')} (${cpus.length} Cores)
${cpus.map((cpu, i) => 
  `  ${i+1}. ${cpu.model.split('@')[0].trim()}\n` +
  `    ◈ Speed : ${(cpu.speed / 1000).toFixed(2)} GHz\n` +
  `    ◈ Usage : ${formatPercent(100 * (cpu.times.user + cpu.times.sys) / cpu.total)} active`
).join('\n')}` : ''}

${formatFooter()}
    `.trim();

    reply2(respon);
}
break;
case 'owner': {
await Celeste.sendContact(m.chat, [global.ownerUtama], null)
}
break;
//============= [ Evaled ] ================
default:
if (budy.startsWith('>')) {
if (!isCreator) return
try {
  let evaled = await eval(budy.slice(2))
  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
  await m.reply(evaled)
} catch (err) {
    await m.reply(String(err))
}}

if (budy.startsWith('=>')) {
if (!isCreator) return
try {
  let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
  await m.reply(evaled)
} catch (err) {
  await m.reply(String(err))
}}

if (budy.startsWith('$')) {
  if (!isCreator) return
  if (!text) return
  exec(budy.slice(2), (err, stdout) => {
  if (err) return m.reply(`${err}`)
  if (stdout) return m.reply(stdout)
})
}
//======================================
}
	} catch (err) {
console.log(util.format(err));
Celeste.sendMessage(global.own, {text: '*Fitur Error Terdeteksi*\n\n*Log error :*\n' + util.format(err), contextInfo: { isForwarded: true }}, {quoted: m})
}}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)});