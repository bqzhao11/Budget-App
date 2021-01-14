const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    date: { type: String, required: true },
    user_id: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;