const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const uri = `mongodb+srv://alexander:${process.env.MONGO_PASSWORD}@cluster0.umojr.mongodb.net` +
    `/feedbackless_blog?retryWrites=true&w=majority`;

const connection = mongoose.createConnection(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now()
    },
    nickname: {
        type: String,
        required: true
    }
});

const User = connection.model('User', UserSchema);
module.exports = User;
