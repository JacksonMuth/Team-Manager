const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Player name is required."],
        minlength: [2, "Player name should be at least 2 characters."]
    },
    position: {
        type: String,
        required: [false]
    },
}, { timestamps: true });

const Player = new mongoose.model("Player", PlayerSchema);

module.exports = Player;

