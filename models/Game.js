const mongoose = require("mongoose")

const Schema = mongoose.Schema

const GameSchema = new Schema({
    gameid: {
        type: String,
        required: true,
        unique: true
    },
    locations: [{
        clue: {
            type: String,
            required: true,
        },    
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },    
        hitcounter: {
            type: Number,
            required: true,
            default: 5
        },
    }]
})

const Game = mongoose.model("Game", GameSchema)

module.exports = Game