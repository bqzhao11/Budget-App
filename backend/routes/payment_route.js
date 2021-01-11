const router = require('express').Router();
const Payment = require('../models/payment_model');

router.route('/').get((req, res) => {
    Payment.find()
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
    const paymentToAdd = {
        date: req.body.date,
        user_id: req.body.user_id,
        amount: req.body.amount,
        description: req.body.description
    }
    const newPayment = new Payment(paymentToAdd);

    newPayment.save()
        .then(() => res.json("New Payment Added"))
        .catch(err => res.status(400).json(err));
});

router.route('/:user_id').get((req, res) => {
    Payment.find({ user_id: req.params.user_id })
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json(err));
});

router.route('/:id/update').post((req, res) => {
    Payment.findByIdAndUpdate(req.params.id)
        .then(payment => {
            payment.date = req.body.date;
            payment.user_id = req.body.user_id;
            payment.amount = req.body.amount;
            payment.description = req.body.description

            payment.save()
                .then(() => res.json("Payment Updated"))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
})

module.exports = router;