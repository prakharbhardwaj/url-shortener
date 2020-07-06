const mongoose = require('../db/mongoose')
const shortId = require('shortid')


const ShortUrl = mongoose.model('Shortener', {
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = ShortUrl