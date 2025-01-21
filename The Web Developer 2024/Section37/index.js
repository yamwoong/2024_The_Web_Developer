const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => {
        console.log("CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!")
        console.log(err)
    })


const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)
// const amadeus = new Movie({ title: 'Amadues', year: 1986, score: 9.2, rating: 'R' })

// Movie.insertMany([
//     { title: 'A', year: 2022, score: 8.2, rating: 'R' },
//     { title: 'B', year: 2014, score: 8.1, rating: 'R' },
//     { title: 'C', year: 1993, score: 7.2, rating: 'PG' },
//     { title: 'D', year: 2011, score: 8.6, rating: 'R' },
//     { title: 'E', year: 1999, score: 9.2, rating: 'PG-13' }
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })



// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("CONNECTION OPEN!!")
// })