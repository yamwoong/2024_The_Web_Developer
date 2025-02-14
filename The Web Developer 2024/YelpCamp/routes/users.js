const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async(req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerUser = await User.register(user, password);
        //화원가입 후 자동으로 로그인 처리
        req.login(registerUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    // if(req.query.returnTo){
    //     req.session.returnTo = req.query.returnTo;
    // }
    res.render('users/login');
})


// 이부분은 passport를 통해 완성되는 곳
// storeReturnTo 미들웨어를 사용하여 returnTo 값을 세션에서 res.locals로 저장
// passport.authenticate가 실행되면서 세션이 지워짐
// res.locals.returnTo를 사용하여 로그인 후 원래 페이지로 리디렉션
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds'; // res.locals.returnTo 값 사용
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    });

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}); 

module.exports = router;