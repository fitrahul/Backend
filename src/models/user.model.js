const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    ip_address: String
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);