
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

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Apple', price: 4.99, season: 'Summer'},
//     {name: 'Banana', price: 4.99, season: 'Summer'},
//     {name: 'Pear', price: 3.99, season: 'Spring'},
// ])

// const makeFarm = async() => {
//     const farm = new Farm({name: 'DK Farms', city: 'Guinda, CA'});
//     const apple = await Product.findOne({name : 'Apple'});
//     farm.products.push(apple);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async() => {
    const farm = await Farm.findOne({name : 'DK Farms'});
    const banana = await Product.findOne({name : 'Banana'});
    farm.products.push(banana);
    await farm.save();
    console.log(farm);
}

Farm.findOne({name : 'DK Farms'})
    .populate('products')
    .then(farm => console.log(farm));