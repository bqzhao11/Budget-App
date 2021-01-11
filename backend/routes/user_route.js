const router = require('express').Router();
let User = require('../models/user_model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
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

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

router.route('/email/:email').get((req, res) => {
    const reconstructedEmail = `${req.params.email}@gmail.com`;
    User.findOne({ gmail: reconstructedEmail })
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err));
});

router.route('/:id/update').post((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            user.gmail = req.body.gmail;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.role = req.body.role;
            user.status = req.body.status;
            user.grad_year = req.body.grad_year;
            user.greek_class = req.body.greek_class;
            user.venmo_username = req.body.venmo_username;
            user.chap_dues = req.body.chap_dues;
            user.intl_dues = req.body.intl_dues;
            user.utilities = req.body.utilities;
            user.fines = req.body.fines;
            user.misc = req.body.misc;

            user.save()
                .then(() => res.json("User Updated"))
                .catch(err => res.status(400).json(err));
        }) // TODO
        .catch(err => res.status(400).json(err));
})

module.exports = router;