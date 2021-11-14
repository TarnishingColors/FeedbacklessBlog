const router = require('express').Router();
const Quote = require('../models/Quote');

router.get("/:nickname", async (req, res) =>{
    try {
        const currentQuotes = await Quote.find({ nickname: req.params.nickname });

        return res.status(200).send({
            "code": 200,
            "quotes": currentQuotes
        })
    } catch(err) {
        console.log(err);

        return res.status(500).send({
            "code": 500,
            "message": "Server error"
        })
    }

})

router.post("/", async (req, res) => {
    const newQuote = new Quote({
        nickname: req.body.nickname,
        quote: req.body.text
    });

    try {
        await newQuote.save();

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
});

module.exports = router;
