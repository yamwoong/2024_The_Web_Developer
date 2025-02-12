const express = require('express');
// mergeParams: true를 사용하면 부모 라우터의 params도 유지되므로, 중첩된 라우트에서 유용하게 사용할 수 있음
const router = express.Router({mergeParams : true});
const {reviewSchena} = require('../schemas');


const Campground = require('../models/campground');
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// map() : 기존 배열을 변경하지 않고 새로운 배열을 반환
// map() 사용이유 : 불변성 / 상태관리가 쉬워짐 / 안전함 => 배열을 변경하는 순간 나중에 큰 문제를 일으킬 수 있음 / map을 사용해서 새로운 배열을 만드는 습관을 들이는게 좋음
const validateReview = (req, res, next) => {
    const {error} = reviewSchena.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


router.post('/', validateReview, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async(req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;