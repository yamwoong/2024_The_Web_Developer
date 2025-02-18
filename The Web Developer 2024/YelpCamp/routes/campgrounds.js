const express = require('express');
const router = express.Router();
const campgrounds = require('../controlle/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    // .post(upload.array('image'), (req, res) => {
    //     // res.send(req.body, req.file); <- 이런식으로 보내면 안됨
    //     // 객체를 사용해서 보내야함
    //     // res.send({
    //     //     body: req.body,
    //     //     file: req.file
    //     // });
    //     console.log(req.body, req.files);
    //     res.send('IT WORKED?');
    // })

//Express에서는 라우트를 위에서 아래로 차례대로 매칭하기 때문에, 
///campgrounds/new와 같은 고정된 경로는 /campgrounds/:id와 같은 동적 경로보다 먼저 정의되어야 합니다.
router.get('/new', isLoggedIn, campgrounds.renderNewForm);


// isLoggedIn => 로그인 했는지 확인
// isAuthor => 작성자인지 확인
// validateCampground =>
// upload.array('image') 에서 html id / name 값과 ('') 안에 값이 매치해야한다 그래야 multer에서 이미지를 찾음 

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditFrom));

module.exports = router;