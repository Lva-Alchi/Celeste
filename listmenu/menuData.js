/*
Q: "Why not use a .json file for data storage?"
A: "So that I don't have to restart the system for every data change."

#> Example format :
{
  title: "", //to display
  tags: "", //to categorize
  subheader: "", // [ this is optional ]
  commands: [".cmd1", ".cmd2"] //list commands
},
*/

const chalk = require('chalk');
const fs = require('fs');


const menuSections = [
  {
    title: "♢ 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮 ☽",
    tags: "info",
    commands: [".ping", ".menu", ".allmenu", ".server", ".owner"]
  },
  {
    title: "♢ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ☽",
    tags: "developer",
    commands: [".self", ".public", ">", "=>", "$"]
  },
];

//=======================================\\
module.exports = {
  menuSections
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})