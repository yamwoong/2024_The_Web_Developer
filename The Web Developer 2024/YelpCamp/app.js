const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const {campgroundSchema} = require('./schemas');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const { ppid } = require('process');

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

const validateCampground = (req, res, next) => {
    
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

//Express에서는 라우트를 위에서 아래로 차례대로 매칭하기 때문에, 
///campgrounds/new와 같은 고정된 경로는 /campgrounds/:id와 같은 동적 경로보다 먼저 정의되어야 합니다.

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// 이대로는 req.body 파싱이 안됨 미들웨어를 사용해야함
app.post('/campgrounds', validateCampground, catchAsync(async(req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
}))

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))


// ... <= 스프레드 연산자
app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res, next) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async(req, res, next) => {
        const {id} = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect('/campgrounds');
}))

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