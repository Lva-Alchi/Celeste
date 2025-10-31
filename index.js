require('./settings');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const PhoneNumber = require('awesome-phonenumber');
const moment = require('moment-timezone');

//Koneksi Bot WA
const {
  default: makeWASocket,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  useMultiFileAuthState,
  Browsers,
  DisconnectReason,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  fetchLatestWaWebVersion,
  proto,
  PHONENUMBER_MCC,
  getAggregateVotesInPollMessage,
} = require("@whiskeysockets/baileys");

const pairingCode =
  global.pairing_code || process.argv.includes("--pairing-code");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

//================================================================================

const iniASCII = [
`\n
_________        .__                   __          
\_   ___ \  ____ |  |   ____   _______/  |_  ____  
/    \  \/_/ __ \|  | _/ __ \ /  ___/\   __\/ __ \ 
\     \___\  ___/|  |_\  ___/ \___ \  |  | \  ___/ 
 \______  /\___  >____/\___  >____  > |__|  \___  >
        \/     \/          \/     \/            \/ 
\n
`,
  `\n
░█████╗░██╗░░░░░░█████╗░██╗░░██╗██╗
██╔══██╗██║░░░░░██╔══██╗██║░░██║██║
███████║██║░░░░░██║░░╚═╝███████║██║
██╔══██║██║░░░░░██║░░██╗██╔══██║██║
██║░░██║███████╗╚█████╔╝██║░░██║██║
╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝╚═╝
\n
`,
`\n
  _____    __        __     
 / ___/__ / /__ ___ / /____ 
/ /__/ -_) / -_|_-</ __/ -_)
\___/\__/_/\__/___/\__/\__/ 
                            

\n`,
];
const imageAscii =
  iniASCII[Math.floor(Math.random() * iniASCII.length)];
const listcolor = ["cyan", "green", "yellow"];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];

// const { cleaningSession } = require("./lib/boostsession");
// (async () => {
//   setInterval(async () => {
//     await cleaningSession("./session");
//   }, 5000);
// })();

//================================================================================
//Batas
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
const wib = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH.mm z")
const wita = moment(Date.now()).tz("Asia/Makassar").locale("id").format("HH.mm z")
const wit = moment(Date.now()).tz("Asia/Jayapura").locale("id").format("HH.mm z")
const DataBase = require("./lib/database");
const database = new DataBase();
(async () => {
  const loadData = await database.read();
  if (loadData && Object.keys(loadData).length === 0) {
    global.db = {
      users: {},
      groups: {},
      game: {},
      database: {},
      settings: {},
      premium: [],
      reseller: [],
      sewa: [],
      ...(loadData || {}),
    };
    await database.write(global.db);
  } else {
    global.db = loadData;
  }

  setInterval(async () => {
    if (global.db) await database.write(global.db);
  }, 3500);
})();

//================================================================================

const { MessagesUpsert, Solving } = require("./lib/message");
const {
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  await,
  sleep,
} = require("./lib/function");

//================================================================================

async function waBot() {
  const store = await makeInMemoryStore({
    logger: pino().child({ level: "silent", stream: "store" }),
  });
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { isLatest } = await fetchLatestWaWebVersion();
  const msgRetryCounterCache = new NodeCache();

  const Celeste = makeWASocket({
    printQRInTerminal: !pairingCode,
    logger: pino({ level: "silent" }),
    auth: state,
    version: [2, 3000, 1027934701],
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    browser: ["Ubuntu","Desktop","22.04.2"],
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
        return msg?.message || undefined;
      }
      return {
        conversation: "Celeste-Bot by Alchi",
      }}});

  //================================================================================

  if (pairingCode && !Celeste.authState.creds.registered) {
    // Membuat header pesan
    const headerMessage = [
        "\n[!] Credits: Alchii\n",
        "\n[!] Contact :\nt.me/alchihuy\n",
        `${imageAscii}`,
    ];
    console.log(
            chalk.white.bold(headerMessage[0]),
            chalk.white.bold(headerMessage[1]),
            chalk.cyanBright(headerMessage[2]),
    );
    let phoneNumber = await question(chalk.green("\n\n[!] Input WhatsApp Number\nE.g : 6285xxxx\n"));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    global.botNumber = phoneNumber
    let code = await Celeste.requestPairingCode(phoneNumber);
    code = code.match(/.{1,4}/g).join(" - ") || code;
    console.log(
        chalk.magenta.italic("Your Pair Code :"),
        chalk.white.bold(code)
    );
}
  //================================================================================

  await store.bind(Celeste.ev);
  await Solving(Celeste, store);

  //================================================================================

  Celeste.ev.on("creds.update", await saveCreds);

//=======[clear session folder]
	function clearSessionFolder() {
		const sessionFolder = path.join(__dirname, "session");
		const excludeFile = "creds.json";
		fs.readdir(sessionFolder, (err, files) => {
			if (err) {
				console.error(chalk.red("Reading 'session' folder failed:"), err);
				return;
			}
			const filesToDelete = files.filter(file => file !== excludeFile);
			if (filesToDelete.length === 0) {
				console.log(chalk.yellow("Nothing to delete on 'session' folder."));
				return;
			}
			console.log(chalk.blueBright(`Clearing folder 'session', total: ${filesToDelete.length}`));
			filesToDelete.forEach(file => {
				const filePath = path.join(sessionFolder, file);
				fs.stat(filePath, (err, stats) => {
					if (err) {
						console.error(chalk.red("Failed reading file:"), filePath, err);
						return;
					}
					if (stats.isFile()) {
						fs.unlink(filePath, err => {
							if (err) {
								console.error(chalk.red("Deletion failed:"), filePath, err);
							} else {
								console.log(chalk.green("File deleted:"), filePath);
							}
						});
					} else if (stats.isDirectory()) {
						fs.rmdir(filePath, { recursive: true }, err => {
							if (err) {
								console.error(chalk.red("Deletion Failed:"), filePath, err);
							} else {
								console.log(chalk.green("Folder deleted:"), filePath);
							}
						});
					}
				});
			});
			console.log(chalk.greenBright("session folder cleared!"));
		});
	}

	setInterval(clearSessionFolder, 6 * 60 * 60 * 1000);
//=========================
  //================================================================================
let isConnectedNotified = false;

  Celeste.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, receivedPendingNotifications } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      isConnectedNotified = false;
      if (reason === DisconnectReason.connectionLost) {
        console.log("Connection to Server Lost, Attempting to Reconnect...");
        waBot();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, Attempting to Reconnect...");
        waBot();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required...");
        waBot();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection Timed Out, Attempting to Reconnect...");
        waBot();
      } else if (reason === DisconnectReason.badSession) {
        console.log("Delete Session and Scan again...");
        waBot();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Close current Session first...");
        waBot();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log("Scan again and Run...");
        exec("rm -rf ./session/*");
        process.exit(1);
      } else if (reason === DisconnectReason.Multidevicemismatch) {
        console.log("Scan again...");
        exec("rm -rf ./session/*");
        process.exit(0);
      } else {
        Celeste.end(`Unknown DisconnectReason : ${reason}|${connection}`);
      }
    }
    if (connection == "open" && !isConnectedNotified) {
      isConnectedNotified = true;
      try {
        Celeste.newsletterFollow('120363338443227796');
        Celeste.newsletterFollow('120363385984693272');
      } catch (e) {}
      console.log("\n");
      console.log(
        chalk.cyanBright.bold(`${imageAscii}`),
        chalk.greenBright.italic(`\n\nAlchi Official Script ✓\n`),
      );
      const connectionMessage = `༺   𝐂𝐞𝐥𝐞𝐬𝐭𝐞  ༻
      
✅   ${botname} Succesfully Connected
📆   ${IniHari()}
🕑   ${wib}

> 📢   Stay up-to-date by following our channel below! ⚡  
> https://whatsapp.com/channel/0029Vap8Ri6LNSaCgOMHiH08`;

// Create the table
console.log(
  chalk.greenBright.bold("┌──────────────────────────────────────────────────────┐\n") +
  chalk.greenBright.bold("│") + chalk.cyanBright.bold("            𝑻 𝒉 𝒂 𝒏 𝒌 𝒔   𝑭 𝒐 𝒓   𝑼 𝒔 𝒊 𝒏 𝒈                 ") + chalk.greenBright.bold("│\n") +
  chalk.greenBright.bold("├──────────────────────────────────────────────────────┤")
);

// Split message into lines and format each line
connectionMessage.split('\n').forEach(line => {
  if (line.includes('༻')) {
    console.log(chalk.greenBright.bold("│") + chalk.magentaBright.bold(line.padEnd(52)) + chalk.greenBright.bold("│"));
  } else if (line.includes('✅')) {
    console.log(chalk.greenBright.bold("│") + chalk.greenBright(line.padEnd(52)) + chalk.greenBright.bold("│"));
  } else if (line.includes('📆') || line.includes('🕑')) {
    console.log(chalk.greenBright.bold("│") + chalk.yellowBright(line.padEnd(52)) + chalk.greenBright.bold("│"));
  } else if (line.includes('>')) {
    console.log(chalk.greenBright.bold("│") + chalk.blueBright(line.padEnd(52)) + chalk.greenBright.bold("│"));
  } else if (line.trim() === '') {
    console.log(chalk.greenBright.bold("│") + " ".padEnd(52) + chalk.greenBright.bold("│"));
  } else {
    console.log(chalk.greenBright.bold("│") + chalk.white(line.padEnd(52)) + chalk.greenBright.bold("│"));
  }
});

console.log(
  chalk.greenBright.bold("└──────────────────────────────────────────────────────┘")
);
    } else if (receivedPendingNotifications == "true") {
      console.log("Please wait About 1 Minute...");
    }
  });

  //================================================================================

  Celeste.ev.on("messages.upsert", async (message) => {
    await MessagesUpsert(Celeste, message, store);
  });

  //================================================================================

  Celeste.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = Celeste.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = { id, name: contact.notify };
    }
  });

  //================================================================================

  Celeste.ev.on("group-participants.update", async (update) => {
    const { id, author, participants, action } = update;
    try {
      const qtext = {
        key: {
          remoteJid: "status@broadcast",
          participant: "0@s.whatsapp.net",
        },
        message: {
          extendedTextMessage: {
            text: "[ 𝐆𝐫𝐨𝐮𝐩 𝐔𝐩𝐝𝐚𝐭𝐞 ]",
          },
        },
      };
      if (global.db.groups[id] && global.db.groups[id].welcome == true) {
        const metadata = await Celeste.groupMetadata(id);
        let teks;
        for (let n of participants) {
          let profile;
          try {
            profile = await Celeste.profilePictureUrl(n, "image");
          } catch {
            profile = "https://telegra.ph/file/95670d63378f7f4210f03.png";
          }
          let imguser = await prepareWAMessageMedia(
            {
              image: {
                url: profile,
              },
            },
            {
              upload: Celeste.waUploadToServer,
            }
          );
          if (action == "add") {
            teks =
              author.split("").length < 1
                ? `@${n.split("@")[0]} joined via *link group*`
                : author !== n
                ? `@${author.split("@")[0]} added @${
                    n.split("@")[0]
                  } to our group!`
                : ``;
            let asu = await Celeste.sendMessage(
              id,
              {
                text: `${teks}`,
                mentions: [author, n],
              },
              {
                quoted: qtext,
              }
            );
            await Celeste.relayMessage(
              id,
              {
                productMessage: {
                  product: {
                    productImage: imguser.imageMessage,
                    productId: "343056591714248",
                    title: "Group Announcement",
                    description: `Welcome to our group @${Celeste.getName(n)}!`,
                    productImageCount: 1,
                  },
                  businessOwnerJid: `${botNumber}@s.whatsapp.net`,
                  contextInfo: {
                    mentionedJid: [n],
                  },
                },
              },
              {}
            );
          } else if (action == "remove") {
            teks =
              author == n
                ? `@${n.split("@")[0]} leaving the group!`
                : author !== n
                ? `@${author.split("@")[0]} kicked @${
                    n.split("@")[0]
                  } from group!`
                : "";
            let asu = await Celeste.sendMessage(
              id,
              {
                text: `${teks}`,
                mentions: [author, n],
              },
              {
                quoted: qtext,
              }
            );
            await Celeste.relayMessage(
              id,
              {
                productMessage: {
                  product: {
                    productImage: imguser.imageMessage,
                    productId: "343056591714248",
                    title: "Group Announcement",
                    description: `Goodbye @${Celeste.getName(n)}!`,
                    productImageCount: 1,
                  },
                  businessOwnerJid: `${botName}@s.whatsapp.net`,
                  contextInfo: {
                    mentionedJid: [n],
                  },
                },
              },
              {}
            );
          } else if (action == "promote") {
            teks =
              author == n
                ? `@${n.split("@")[0]} get promoted to admin!`
                : author !== n
                ? `@${author.split("@")[0]} promoting @${
                    n.split("@")[0]
                  } to become admin!`
                : "";
            let asu = await Celeste.sendMessage(
              id,
              {
                text: `${teks}`,
                mentions: [author, n],
              },
              {
                quoted: qtext,
              }
            );
            await Celeste.relayMessage(
              id,
              {
                productMessage: {
                  product: {
                    productImage: imguser.imageMessage,
                    productId: "343056591714248",
                    title: "Group Announcement",
                    description: `@${Celeste.getName(n)} getting promoted`,
                    productImageCount: 1,
                  },
                  businessOwnerJid: `${botNumber}@s.whatsapp.net`,
                  contextInfo: {
                    mentionedJid: [n],
                  },
                },
              },
              {}
            );
          } else if (action == "demote") {
            teks =
              author == n
                ? `@${n.split("@")[0]} was getting demoted! LOL`
                : author !== n
                ? `@${author.split("@")[0]} have demoted @${
                    n.split("@")[0]
                  } from being an admin!`
                : "";
            let asu = await Celeste.sendMessage(
              id,
              {
                text: `${teks}`,
                mentions: [author, n],
              },
              {
                quoted: qtext,
              }
            );
            await Celeste.relayMessage(
              id,
              {
                productMessage: {
                  product: {
                    productImage: imguser.imageMessage,
                    productId: "343056591714248",
                    title: "Group Announcement",
                    description: `@${Celeste.getName(n)} demoted`,
                    productImageCount: 1,
                  },
                  businessOwnerJid: `${botNumber}@s.whatsapp.net`,
                  contextInfo: {
                    mentionedJid: [n],
                  },
                },
              },
              {}
            );
          }
        }
      }
    } catch (e) {}
  });

  //================================================================================

  Celeste.ev.on("groups.update", async (update) => {
    try {
      const data = update[0];
      const qtext = {
        key: {
          remoteJid: "status@broadcast",
          participant: "0@s.whatsapp.net",
        },
        message: {
          extendedTextMessage: {
            text: "[ 𝐆𝐫𝐨𝐮𝐩 𝐔𝐩𝐝𝐚𝐭𝐞 ]",
          },
        },
      };
      if (data?.inviteCode) {
        let botNumber = Celeste.user.id.split(":")[0];
        let participant = data.author;
        if (participant.split("@")[0] === botNumber) return;
        await Celeste.sendMessage(
          data.id,
          {
            text: `Group link reseted by @${participant.split("@")[0]}`,
            mentions: [participant],
          },
          { quoted: qtext }
        );
      }

      if (data?.desc) {
        let botNumber = Celeste.user.id.split(":")[0];
        let participant = data.author;
        if (participant.split("@")[0] === botNumber) return;
        await Celeste.sendMessage(
          data.id,
          {
            text: `Group description changed by @${
              participant.split("@")[0]
            }`,
            mentions: [participant],
          },
          { quoted: qtext }
        );
      }

      if (data?.subject) {
        let botNumber = Celeste.user.id.split(":")[0];
        let participant = data.author;
        if (participant.split("@")[0] === botNumber) return;
        await Celeste.sendMessage(
          data.id,
          {
            text: `Group name changed by @${participant.split("@")[0]}`,
            mentions: [participant],
          },
          { quoted: qtext }
        );
      }
    } catch (e) {}
  });

  //================================================================================

  return Celeste;
}

waBot();

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
});

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
