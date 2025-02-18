const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


// MongoDb와의 연결 상태 감시 코드 (에러 : connection error, 정상 : Database connected 출력)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field'});
    // await c.save();
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author : '67ae901c733e7a7316a3d6d6',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description :'aaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddddddddddddbbbbbbbbbbbbbbb',
            price,
            images : [
                {
                url: 'https://res.cloudinary.com/ditw5coka/image/upload/v1739831490/YelpCamp/d3ro1l9r7kxmteo9cjqx.png',
                filename: 'YelpCamp/d3ro1l9r7kxmteo9cjqx'
                },
                {
                url: 'https://res.cloudinary.com/ditw5coka/image/upload/v1739831491/YelpCamp/t6yejlcro69gma3royig.png',
                filename: 'YelpCamp/t6yejlcro69gma3royig'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});