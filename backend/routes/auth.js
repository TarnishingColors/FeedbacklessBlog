const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post("/sign-up", async (req, res) => {

    const anyUser = await User.findOne({ nickname: req.body.nickname });
    if (anyUser)
        return res.status(422).send({
            "code": 422,
            "message": "User exists"
        });

    else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname
        });

        try {
            await newUser.save();

            return res.status(200).send({
                "code": 200,
                "message": ""
            })
        } catch(err) {
            console.log(err);

            return res.status(500).send({
                "code": 500,
                "message": "Server error"
            })
        }
    }

});

router.post("/sign-in", async (req, res) => {

    const nickname = req.body.nickname;
    const password = req.body.password;

    try {
        const user = await User.findOne({ nickname: nickname });
        if (!user)
            return res.status(422).send({
                "code": 422,
                "message": "Authorization failed"
            });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(422).send({
                    "code": 422,
                    "message": "Authorization failed"
                });
        } else {
            const token = jwt.sign({
                nickname: user.nickname,
                userId: user._id
            }, process.env.TOKEN, { expiresIn: 60 * 60 });

            res.status(200).send({
                "code": 200,
                "message": "",
                "token": token
            });
        }

    } catch(err) {
        console.log(err);

        res.status(500).send({
            "code": 500,
            "message": "Server error"
        })
    }
});

module.exports = router;
