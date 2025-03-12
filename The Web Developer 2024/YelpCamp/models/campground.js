const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url : String,
    filename : String
});

// 이미지 url을 변형하여 썸네일사이즈를 조절 후 생성
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

//이 코드는 mongoose에서 가상필드(virtuals)을 JSON 출력에 포함하도록 설정하는 옵션
const opts = { toJSON : {virtuals : true}};

const CampgroundSchema = new Schema({
    title : String,
    images : [ImageSchema],
    lat : Number,
    geometry : {
        type : {
            type : String,
            enum : ['Point'],
            required : true
        },
        coordinates : {
            type : [Number],
            required : true
        }
    },
    price : Number,
    description : String,
    location : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
} , opts);

// viruals(가상필드)를 사용해서 popUpMarkup이라는 속성을 동적으로 생성하는 부분
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...`;
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Review.deleteMany({
            _id : {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);