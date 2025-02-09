const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        // ref : 다른 컬랙션의 문서를 '참조'할 때 사용하는 필드
        ref: 'Farm'
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product; 