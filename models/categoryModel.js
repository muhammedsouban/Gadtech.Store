const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String

    },
    image: {
        type: String
    },
    categoryOffer: {
        type: String
    },
    d_status: {
        type: Boolean,
        default: 0
    }
});


module.exports = mongoose.model('Category', categorySchema);

