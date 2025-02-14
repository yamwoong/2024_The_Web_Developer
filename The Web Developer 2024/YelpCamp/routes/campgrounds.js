const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {campgroundSchema} = require('../schemas');
const {isLoggedIn} = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

const validateCampground = (req, res, next) => {
    
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


//Express에서는 라우트를 위에서 아래로 차례대로 매칭하기 때문에, 
///campgrounds/new와 같은 고정된 경로는 /campgrounds/:id와 같은 동적 경로보다 먼저 정의되어야 합니다.

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
}) 

// 이대로는 req.body 파싱이 안됨 미들웨어를 사용해야함
router.post('/', isLoggedIn, validateCampground, catchAsync(async(req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}))


// ... <= 스프레드 연산자
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async(req, res, next) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        req.flash('success', 'Successfully updated campground');
        res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, catchAsync(async(req, res, next) => {
        const {id} = req.params;
        await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');

        res.redirect('/campgrounds');
}))

module.exports = router;