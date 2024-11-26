const express = require("express");
const app = express()
// console.dir(app);

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQYEST!!")
//     // res.send("HELLO, WE GOT YOUR REQYEST! THIS IS A RESPONSE")
//     // res.send({ color: 'red' })
//     res.send('<h1>This is my webpage</h1>')
// })

app.get('/', (req, res) => {
    res.send('This is the home page!')
})

app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params)
    // res.send('This is a subreddit')

    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing postId ${postId} on ${subreddit} subreddit</h1>`);
})


app.get('/cats', (req, res) => {
    // console.log("Cat Request!!")
    res.send('MEOW!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

app.get('/search', (req, res) => {
    // console.log(req.query)
    // res.send('hi')

    const { q } = req.query;
    if (!q) {
        res.send('Nothing found If nothing search')
    }
    res.send(`<h1>Search results for : ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})

app.listen(8080, () => {
    console.log("LISTENING ON THE 8080!")
}) 