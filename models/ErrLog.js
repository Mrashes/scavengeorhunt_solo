const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ErrLogSchema = new Schema({
    error: {
        type: String,
        required: true,
    },
    errordate: {
        type: Date,
        default: Date.now
    }
})

const ErrLog = mongoose.model("ErrLog", ErrLogSchema)

module.exports = ErrLog