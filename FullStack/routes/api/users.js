const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

//Load User model
const { User, validateRegister, validateLogin } = require('../../models/User');

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public 
router.get('/test', (req, res) => {
    res.json({ msg: "Users works!" });
});

//@route    GET api/users/register
//@desc     Register user
//@access   Public 
router.post('/register', (req, res) => {
    const { error } = validateRegister(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user)
                return res.status(400).json({ email: 'Email already exists' });

            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //Rating
                d: 'mm', //Default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        return res.status(500).json({ error: 'Server error', err });
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(_.pick(user, ['_id', 'name', 'email', 'avatar', 'date'])))
                        .catch(err => res.status(500).json({ error: 'Server error: ', err }));
                });
            })
        });
});

//@route    GET api/users/login
//@desc     Login user / Returning JWT Token
//@access   Public 
router.post('/login', (req, res) => {
    const { error } = validateLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            //Check for user
            if (!user)
                return res.status(404).json({ 'error': 'Email not found!' });

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User matched
                        const payload = _.pick(user, ['_id', 'name', 'email', 'avatar']);

                        //Sign token
                        jwt.sign(
                            payload,
                            keys.secretKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err)
                                    res.status(500).json({ error: 'Server error' + err });
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            });
                    }
                    else {
                        return res.status(400).json({ password: 'Password incorrect' });
                    }
                })
                .catch(error => res.status(500).json(error));
        });
});

//@route    GET api/users/current
//@desc     Return current user
//@access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(_.pick(req.user, ['_id', 'name', 'email', 'avatar']));
});

module.exports = router;
