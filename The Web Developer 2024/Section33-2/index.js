const express = require('express')
const app = express();

app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.send('HI')
// })

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {
    console.log("LISTENING ON PROT 3000")
})