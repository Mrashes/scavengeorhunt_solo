const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
        default: 0
    },
    minutes: {
        type: Number,
        required: true,
        default: 0
    },
    seconds: {
        type: Number,
        required: true,
        default: 0
    },
    scoredate: {
        type: Date,
        default: Date.now
    },
    gameid: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User