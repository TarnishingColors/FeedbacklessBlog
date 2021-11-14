const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const uri = `mongodb+srv://alexander:${process.env.MONGO_PASSWORD}@cluster0.umojr.mongodb.net` +
    `/feedbackless_blog?retryWrites=true&w=majority`;

const connection = mongoose.createConnection(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


const QuoteSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    datetime: {
        type : Date,
        default: Date.now
    }
});

const Quote = connection.model('Quote', QuoteSchema);
module.exports = Quote;
