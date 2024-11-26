const fs = require('fs');
const folderName = process.argv[2] || 'Project'
// fs.mkdir('장솔잎', { recursive: true }, (err) => {
//     console.log("In the callback !!");
//     if (err) throw err;
// });
// console.log("I come after mkdir!!");\
try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.js`, '');
    fs.writeFileSync(`${folderName}/styles.css`, '');
} catch (e) {
    console.log("SOMETHING WENT WRONG!!!");
    console.log(e);
}
