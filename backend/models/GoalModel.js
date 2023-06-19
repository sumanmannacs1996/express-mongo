const mongoose = require('mongoose')

const goalScheama = mongoose.Schema({
    text: {
        type: String,
        required: [true,"Text is required field"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalScheama)