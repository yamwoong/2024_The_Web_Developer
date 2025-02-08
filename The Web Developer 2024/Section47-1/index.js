//쿠키사인은 정보를 감추거나 암호화하는게 아니라 정보의 조작 여부를 확인하는데 사용한다
//쿠키사인은 쿠키의 무결성을 보장하는데 사용, 쿠키의 조작여부를 확인하는 용도
//무결성(Integrity): 데이터가 변경되지 않고 원래 상태 그대로인가
//진정성(Authenticity): 데이터 또는 사용자가 신뢰할 수 있는 진짜인가

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    // console.log(req.cookies);
    const {name = 'No-name'} = req.cookies;
    res.send(`HEY THERE!, ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'KIM');
    res.send('OK SENT YOU A COOKIE!');
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed : true})
    res.send('OK SIGEND YOUR FRUIT COOKIE!');
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log('localhost:3000');
})