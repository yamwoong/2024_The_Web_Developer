const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        username: 'A',
        comment: 'aaaaaaaa'
    },
    {
        username: 'B',
        comment: 'bbbbbbbb'
    },
    {
        username: 'C',
        comment: 'ccccccccc'
    },
    {
        username: 'D',
        comment: 'ddddddddd'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/tacos', (req, res) => {
    res.send("Get /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat}`);
})

app.listen(3000, () => {
    console.log("ON PORT 3000")
})
