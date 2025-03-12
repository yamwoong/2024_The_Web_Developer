const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken : mapBoxToken});
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}


module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

// 이대로는 req.body 파싱이 안됨 미들웨어를 사용해야함
module.exports.createCampground = async(req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const geoData = await geocoder.forwardGeocode({
        query : req.body.campground.location,
        limit : 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path : 'reviews',
        populate : {
            path : 'author'
        }
    }).populate('author');    
    // console.log(campground)
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

// 사용자가 특정 캠핑장을 수정할 수 있도록 'edit 페이지를 보여줌'
module.exports.renderEditFrom = async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}

// 수정한 데이터를 받아서 DB에서 업데이트 함
// ... <= 스프레드 연산자
module.exports.updateCampground = async(req, res, next) => {
        const { id } = req.params;
        console.log(req.body);
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        // 모든 이미지를 덮어쓰는게 아니여서 map이 아니라 push를 쓴다
        // 기존 데이터를 유지하면서 새 데이터 추가하기 위해 push
        campground.images.push(...imgs);
        await campground.save();

        if(req.body.deleteImages) {
            for(let filename of req.body.deleteImages) {
                // 실제 cloudinary에 저장하는 사진 파일까지 삭제하는 코드
                await cloudinary.uploader.destroy(filename);
            }
            await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }

        req.flash('success', 'Successfully updated campground');
        res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async(req, res, next) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
req.flash('success', 'Successfully deleted campground');

    res.redirect('/campgrounds');
}