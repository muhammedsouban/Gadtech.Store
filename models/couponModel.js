const mongoose = require('mongoose')
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId
const couponSchema = new Schema({

    couponcode: {
        type: String,
        required: true

    },
    offer: {
        type: Number,
        required: true
    },
    expirydate: {
        type: Date,
        required: true
    },
    user: [
        { userId: { type: ObjectId }, _id: false }
    ],

    is_valid: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Coupon', couponSchema);

