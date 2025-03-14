// one to few

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id:false},
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            }
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        first: 'DeaWoong',
        last: 'Kim',
    })
    u.addresses.push(
    {
        street: '123 st',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}

makeUser();

const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '99 st',
            city: 'New York',
            state: 'NY',
            country: 'USA'

        }
    )
    const res = await user.save();
    console.log(res);
}

addAddress('67a1821dffe085c43a6883ec');