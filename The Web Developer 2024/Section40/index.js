const express = require('express');
const app = express();
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
    res.send('SORRY YOU NEED A PASSWOARD')
})

// app.use((req, res, next) => {
//     console.log('THIS IS MY FIRST MIDDLEWARE!!');
//     return next();
//     console.log('THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT')
// })

// app.use((req, res, next) => {
//     console.log('THIS IS MY SECOND MIDDLEWARE!!');
//     return next();
// })

// app.use((req, res, next) => {
//     console.log('THIS IS MY THIRD MIDDLEWARE!!');
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`REQUEST DATE : ${req.requestTime}`);
    res.send('HOME PAGE!');
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

app.listen(3000, () => {
    console.log('All is running on loacalhost:3000');
})