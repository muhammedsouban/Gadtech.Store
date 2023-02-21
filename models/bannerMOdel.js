const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true

    },
    Title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('banner', bannerSchema);

