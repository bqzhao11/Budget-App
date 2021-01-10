const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    gmail: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
    grad_year: { type: Number, required: true },
    greek_class: { type: String, required: true },
    venmo_username: { type: String, required: true },
    chap_dues: { type: Number, required: true },
    intl_dues: { type: Number, required: true },
    utilities: { type: Number, required: true },
    fines: { type: Number, required: true },
    misc: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema)

module.exports = User;