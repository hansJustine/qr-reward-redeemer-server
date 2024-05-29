const mongoose = require('mongoose')

const RewardSchema = new mongoose.Schema({
    qrCode: {type: String, required: [true, "Provide a QR code"]},
    bottles: [
        {
            largeBottles: {
                qty: Number,
                points: Number,
                price: Number
            },
            smallBottles: {
                qty: Number,
                points: Number,
                price: Number
            }
        }
    ],
    totalPrice: {type: Number, default: 0},
    isRedeemed: {type: Boolean, default: false},
    pricePerPoint: {type: Number, default: 3},
})

const Reward = mongoose.model('Reward', RewardSchema)
model.exports = Reward