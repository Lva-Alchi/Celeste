<p align="center">
<img src="https://i.ibb.co.com/C30Fv8rd/00a090fe5729fee5ae6982a1c96e15f7-1.jpg" alt="CELESTE BOT" width="150"/>
	
<h1 style="font-size: 40px; text-align: center;">☾ 𝐂𝐞𝐥𝐞𝐬𝐭𝐞 𝐁𝐨𝐭 ☽</h1>

# About
This is a basic WhatsApp bot script built using a modified Baileys library. It is designed as a script template to help other developers create their bot scripts so they don't have to start from scratch.

---

## Contents :
- [Features](#features)
- [Script Type](#type)
- [Files Structure](#files-structure)
- [Configuration](#configuration)
- [Contributors](#Contributors)

---

## Type
This script is based on commonjs(CJS) type of code.

---

## Features
- Basic Commands (ping, menu, etc.)
- User Roles (vip, premium, etc.)
- Support function
- Dynamic menu list
- Auto Read/block/etc.
- Eval function
- Custom Reply/quoted
- and many more..

Try exploring the code yourself 😄

---

## Files Structure
```
.
├── database/
│   ├── produk/
│   │   └── produk.json
│   ├── sampah/
│   │   └── A/
│   ├── contacts.json
│   ├── contacts.vcf
│   ├── database.json
│   ├── owner.json
│   ├── premium.json
│   └── reseller.json
├── lib/
│   ├── converter.js
│   ├── database.js
│   ├── exif.js
│   ├── function.js
│   ├── message.js
│   ├── premium.js
│   └── uploadImage.js
├── listmenu/
│   ├── handlers.js
│   └── menuData.js
├── src/
│   └── thumbnail.jpg
├── Celeste.js <-- commands file code
├── settings.js
├── index.js
├── package.json
├── README.md
└── start.js
```

---

## Configuration
Before you run this script, make sure you configure the settings first.

<details>
  <summary> <b>Config Files</b></summary><br/>
  
```javascript
//~~~~~~~~~< GLOBAL SETTINGS >~~~~~~~~~\\
global.botNumber = "62xxx"
global.owner = ['62xxx']
global.ownerUtama = "62xxx"
global.own = "62xxx@s.whatsapp.net"
global.namaOwner = "Alchii"
global.ownerName = "𝐀𝐥𝐜𝐡𝐢𝐇𝐨𝐬𝐭"
global.packname = 'ᴍᴀᴅᴇ ʙʏ ᴄᴇʟᴇsᴛᴇ-ʙᴏᴛ'
global.botname = '╌ 𝐂𝐞𝐥𝐞𝐬𝐭𝐞 ╌'
global.botname2 = '╌ 𝐒𝐤𝐲 𝐆𝐨𝐝𝐝𝐞𝐬𝐬 ╌'
global.tempatDB = 'database.json'

//========[ Connection Setting ]======
global.pairing_code = true // want to use QR? set to false
//=======================
global.set = {
  blastMode: false,
  autoBlock: false,
  autoDelMsg: false,
  autoRead: true,
  version: "1.0.0",
}
//==============================================
global.linkOwner = "https://wa.me/"
global.linkGrup = "https://chat.whatsapp.com/"
global.linkGrup2 = "https://chat.whatsapp.com/"
global.linkSaluran = "https://whatsapp.com/channel/"
global.idsaluran = "120xxx@newsletter"
global.idch = '120xxx@newsletter'
global.nameChannel = "Alchii"
global.yutub = 'youtube.com/@alchii_ofc'
global.tele = 't.me/alchihuy'
//===========================
// Delay || 1000ms = 1 seconds
global.delayBot = 5000
//===============================


//===============================

//========= [PAYMENT] ==========
global.qris = "https://"
global.saweria = "https://saweria.co"
global.trakteer = "https://trakteer.id"

//========= [RESPON BOT] 
global.mess = {
  done: "𝐇𝐞𝐫𝐞 𝐘𝐨𝐮 𝐆𝐨",
	owner: "𝑇ℎ𝑖𝑠 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑤𝑎𝑠 𝑶𝑾𝑵𝑬𝑹 𝑂𝑛𝑙𝑦 !!",
	admin: "𝑇ℎ𝑖𝑠 𝑤𝑎𝑠 𝑨𝒅𝒎𝒊𝒏 𝑒𝑥𝑐𝑙𝑢𝑠𝑖𝑣𝑒 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 !",
	botAdmin: " 𝐉𝐀𝐃𝐈𝐊𝐀𝐍 𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 !! 𝘣𝘪𝘢𝘳 𝘧𝘪𝘵𝘶𝘳𝘯𝘺𝘢 𝘸𝘰𝘳𝘬 𝘯𝘰𝘳𝘮𝘢𝘭",
	group: "𝑈𝑠𝑒 𝑡ℎ𝑖𝑠 𝑜𝑛 𝑎 𝐆𝐫𝐨𝐮𝐩 !!",
	private: "𝑇ℎ𝑖𝑠 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑜𝑛𝑙𝑦 𝑎𝑐𝑐𝑒𝑠𝑠 𝑜𝑛 𝑷𝒓𝒊𝒗𝒂𝒕𝒆 𝑪𝒉𝒂𝒕",
	prem: "𝑈𝑝𝑔𝑟𝑎𝑑𝑒 𝑡𝑜 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝑡𝑜 𝑢𝑠𝑒 𝑡ℎ𝑖𝑠!",
}
```
</details>

--- 

## Contributors
- [Lva-Alchi](https://github.com/Lva-Alchi)

Leave a `star🌟`, and fork this repo to contribute

# Donate
- [Trakteer](https://trakteer.id/alchiwak/tip)
- [Paypal](https://paypal.me/LvNicho)
- [Saweria](https://saweria.co/Lovea)
