const mongoose = require('mongoose')

const goalScheama = mongoose.Schema({
    text: {
        type: String,
        required: [true,"Text is required field"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalScheama)