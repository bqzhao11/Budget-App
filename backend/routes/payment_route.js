const router = require('express').Router();
const Payment = require('../models/payment_model');

router.route('/').get((req, res) => {
    Payment.find()
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json(err));
})