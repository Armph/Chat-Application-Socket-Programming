const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    directed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("group", groupSchema);