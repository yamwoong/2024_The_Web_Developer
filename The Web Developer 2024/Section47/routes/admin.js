const express = require('express');
const router = express.Router();

//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//응답을 여러 번 보내려 할 때 발생하는 오류
//next() 앞에 return을 적어줘서 해결함 (res.send가 실행되지 않게 함)
router.use((req, res, next) => {
    if(req.query.isAdmin){
        return next();
    }
    res.send('SORRY NOT AN ADMIN!');
})

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET');
})

router.get('/deleteeverything', (req, res) => {
    res.send('OK DELETED IT ALL!');
})

module.exports = router;