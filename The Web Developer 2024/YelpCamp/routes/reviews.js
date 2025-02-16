const express = require('express');
// mergeParams: true를 사용하면 부모 라우터의 params도 유지되므로, 중첩된 라우트에서 유용하게 사용할 수 있음
const router = express.Router({mergeParams : true});
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controlle/reviews');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;