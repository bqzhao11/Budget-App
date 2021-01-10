const router = require('express').Router();
let User = require('../models/user_model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

router.route('/users/add').post((req, res) => {
    const userToAdd = {
        gmail: req.body.gmail,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        status: req.body.status,
        grad_year: req.body.grad_year,
        greek_class: req.body.greek_class,
        venmo_username: req.body.venmo_username,
        chap_dues: req.body.chap_dues,
        intl_dues: req.body.intl_dues,
        utilities: req.body.utilities,
        fines: req.body.fines,
        misc: req.body.misc,
    }
    const newUser = new User(userToAdd);
    newUser.save()
        .then(() => res.json("New User Added!"))
        .catch(err => res.status(400).json(err));
})

router.route('/users/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

router.route('/users/:id/update').post((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then() // TODO
        .catch(err => res.status(400).json(err));
})

module.exports = router;