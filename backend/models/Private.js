const mongoose = require("mongoose");

const privateSchema = mongoose.Schema({
    user1: {
        type: String,
        require: true
    },
    user2: {
        type: String,
        require: true
    },
    directed: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model("Private", privateSchema);