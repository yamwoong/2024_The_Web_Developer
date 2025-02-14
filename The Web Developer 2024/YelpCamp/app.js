const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


// MongoDb와의 연결 상태 감시 코드 (에러 : connection error, 정상 : Database connected 출력)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// req.body 읽어오는 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const sessionConfig = {
    secret : 'this',
    resave : false,
    saveUninitialized: true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // if(!['/login', '/'].includes(req.originalUrl)){
    //     req.session.returnTo = req.originalUrl;
    // }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// app.get('/fakeUser', async(req, res) => {
//     const user = new User({email : 'kim@gmail.com', username : 'kim'});
//     const newUser = await User.register(user, '123');
//     res.send(newUser);
// })


app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


app.get('/', (req, res) => {
    res.render('home');
})




//놓는 위치가 중요 위에두면 다 이 로직으로 처리됨
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

// put 비동기 요청에 try..catch 안해줬더니 오류남
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', {err});
})

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!'});
//     await camp.save();
//     res.send(camp);
// })

app.listen(3000, () => {
    console.log('Serving on port 3000')
})