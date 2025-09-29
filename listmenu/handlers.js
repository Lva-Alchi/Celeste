require('../settings')
const chalk = require('chalk')
const fs = require('fs')
const { menuSections } = require('./menuData');

function generateListMenu() {
  let menuText = "╔═══════════════════════\n";
  menuText += "║ ༺ 𝕄𝔼ℕ𝕌 𝕃𝕀𝕊𝕋 ༻\n";
  menuText += "╠═══════════════════════\n";
  
  menuSections.forEach((sec, index) => {
    menuText += `║ [${index}] ${sec.title}\n`;
  });
  
  menuText += "╚═══════════════════════\n\n";
  menuText += "ℹ️ Type '.index [number]' or '.index [section]' to view commands";
  
  return menuText;
}

function findSection(section) {
  if (typeof section === 'number') {
    return menuSections[section];
  }
  
  const searchTerm = section.toLowerCase();
  return menuSections.find(sec => 
    sec.tags.toLowerCase() === searchTerm
  );
}

function formatSection(section) {
  let text = `┏━━━━━━━━━━━━━━━━━━━━┓\n`;
  text += `┃  ༺ ${section.title} ༻\n`;
  text += `┣━━━━━━━━━━━━━━━━━━━━┫\n`;
  
  if (section.subheader) {
    text += `┃ ${section.subheader}\n`;
    text += `┠────────────────────┨\n`;
  }
  
  section.commands.forEach(cmd => {
    text += `┃ ◇ ${cmd}\n`;
  });
  
  text += `┗━━━━━━━━━━━━━━━━━━━━┛\n`;
  return text;
}

/**
 * Generate menu text
 * @param {string|number|null} section - Section index, tags, or null for all
 * @returns {string} Formatted menu text
 */
function generateMenu(section = null) {
  if (section === null) {
    return generateListMenu();
  }
  
  const selectedSection = findSection(section);
  if (!selectedSection) {
    return "❌ Menu section not found\n\n" + 
           "Available sections:\n" + 
           menuSections.map((sec, i) => `[${i}] ${sec.tags}`).join("\n");
  }
  
  return formatSection(selectedSection);
}

function generateAllMenu() {
  let totalCommands = 0;
  let menuText = `╔════════════════════════╗\n║                       𝐋𝐢𝐬𝐭 𝐨𝐟 𝐀𝐥𝐥 𝐌𝐞𝐧𝐮                       ║\n╚════════════════════════╝\n\n`;

  menuSections.forEach(section => {
    totalCommands += section.commands.length;
    menuText += `┌───「 ${section.title} 」───\n`;
    if (section.subheader) menuText += `│ ${section.subheader}\n├──────────────\n`;
    
    section.commands.forEach(cmd => {
      menuText += `│ ${cmd}\n`;
    });
    
    menuText += `└────────────────────\n\n`;
  });

  // Footer dengan total
  menuText += `╔════════════════════════╗\n║  📊 ${menuSections.length} Sections | ${totalCommands} Commands  ║\n╚════════════════════════╝`;
  
  return menuText;
}

function formatSection2(section) {
  let text = `┎──────────┄┈\n`;
  text += `┃   ${section.title}\n`;
  if (section.subheader) {
    text += `┣━━━━━┅─┄┈\n`;
    text += `┃  ${section.subheader}\n`;
    text += `┃ \n`;
  } else {
    text += `┣━━━━━┅─┄┈\n`;
  }
  section.commands.forEach(cmd => {
  text += `╏ • ${cmd}\n`;
  });
  text += `┃ \n`;
  text += `┖───────────┄┈`;
  text += `\n> 📊 Total ${section.commands.length} commands\n> ©${botname}`;
  
  return text;
}

function generateMenu2(sectionInput) {
  // 1. Handle input kosong/null/undefined
  if (sectionInput === undefined || sectionInput === null) {
    return "⚠️ Input Number or tags you want to search";
  }

  // 2. Konversi ke string untuk pencarian text
  const searchQuery = typeof sectionInput === 'string' 
    ? sectionInput.toLowerCase().trim()
    : String(sectionInput).toLowerCase().trim();

  // 3. Handle input angka
  if (!isNaN(sectionInput)) {
    const index = parseInt(sectionInput);
    
    // Validasi range index
    if (index < 0 || index >= menuSections.length) {
      const availableSections = menuSections.map((sec, idx) => `[${idx}] ${sec.title}`).join('\n');
      return `⚠️ Section #${index} not available.\n\nAvailable Sections:\n${availableSections}`;
    }
    
    return formatSection2(menuSections[index]);
  }

  // 4. Handle pencarian text
  const section = menuSections.find(sec => 
    (sec.tags && sec.tags.toLowerCase().includes(searchQuery)) || 
    sec.title.toLowerCase().includes(searchQuery)
  );

  if (!section) {
    const availableSections = menuSections.map((sec, idx) => `[${idx}] ${sec.title}`).join('\n');
    return `⚠️ Section "${sectionInput}" tidak ditemukan. Pilih salah satu:\n${availableSections}`;
  }

  return formatSection2(section);
}

//=====================================
module.exports = {
  generateMenu,
  generateMenu2, 
  generateAllMenu, 
  generateListMenu
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})