const express = require("express");
const app = express();

// app.use((req, res) => {
//     console.log("장솔잎 바보 멍청이 :( ")
//     console.dir(req)
//     // res.send("http 응답을 보내고 생성한다")
//     // res.send({ colors: 'red' })
//     res.send('<h1>This is my web</h1>')
// })

app.get('/', (req, res) => {
    // console.log("cat request!")
    res.send('Welcome to the home page!!!')
})

app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params)
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit}`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>viewing Post Id : ${postId} the ${subreddit}`)
})

app.post('/cats', (req, res) => {
    // console.log("cat request!")
    res.send('meow post!!')
})

app.get('/cats', (req, res) => {
    // console.log("cat request!")
    res.send('meow!!')
})

app.get('/dogs', (req, res) => {
    // console.log("cat request!")
    res.send('woof!!')
})

app.get('/search', (req, res) => {
    // console.log(req.query);
    const { q } = req.query;
    if (!q) {
        res.send('nothing found')
    }
    res.send(`<h1>Search results for: ${q}</h1>`)
})

app.get('*', (req, res) => {
    // console.log("cat request!")
    res.send(`I don't know that path!`)
})

app.listen(8080, () => {
    console.log("Listening on port 8080!");
})