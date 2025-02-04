
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({
    username : String,
    age : Number
})

const tweetSchema = new Schema({
    text : String,
    likes : Number,
    user : {type : Schema.Types.ObjectId, ref : 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async() => {
//     // const user = new User({username : 'dwkim', age : 18});
//     const user = await User.findOne({ username : 'dwkim'})
//     const tweet2 = new Tweet({text : 'love love love', likes : 1234});
//     tweet2.user = user;
//     user.save();
//     tweet2.save();
// }

// makeTweets();

const findTweet = async() => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();