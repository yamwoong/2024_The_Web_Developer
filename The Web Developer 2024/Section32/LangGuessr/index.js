const franc = require("franc");
const langs = require("langs");
const input = process.argv[2];
const langCode = franc(input);
const colors = require("colors");

if (langCode === 'und') {
    console.log("Sorry, couldn't figure it out@!!".red);
} else {
    const language = langs.where("3", langCode);
    console.log(`Our best guess is : ${language.name}`.green);
}

