const express = require('express');
const app = express();
// npm i morgan => http 요청 로그를 기록하는 미들웨어
const morgan = require('morgan');



app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS!');
    next();
})

// 함수로 작성해서 선택적으로 미들웨어를 작동 시킬 수 있음
const verifyPassword = ((req, res, next) => {
    const {password} = req.query;
    if(password === 'chickennugget'){
        return next();
    }
    // res.send('SORRY YOU NEED A PASSWOARD')
    throw new Error('Password required!')
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE : ${req.requestTime}`);
    res.send('HOME PAGE!');
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE : ${req.requestTime}`);
    res.send('WOOF WOOF');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('secret');
})

//404처리
app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})

app.use((err, req, res, next) => {
    console.log('******************************');
    console.log('******************************');
    console.log('******************************');
})

app.listen(3000, () => {
    console.log('All is running on loacalhost:3000');
})