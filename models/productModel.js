const mongoose = require('mongoose')
const Schema = mongoose.Schema,

ObjectId =Schema.ObjectId;

const productSchema = new Schema({

    productname: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', productSchema);
