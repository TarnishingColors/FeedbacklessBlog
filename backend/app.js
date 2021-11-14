const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoute = require('../backend/routes/auth');
const quoteHandler = require('../backend/routes/quoteHandler');

dotenv.config();

const app = express();

let port = process.env.PORT || 8080;
let password = process.env.MONGO_PASSWORD;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({extended: true,}));

const router = app.Router;

const uri = `mongodb+srv://alexander:${password}@cluster0.umojr.mongodb.net` +
    `/feedbackless_blog?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err) => { if (!err) { console.log('Connected to db') } else { console.log(err) } });

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/quote", quoteHandler);

app.listen(port, () => {
    console.log(`Running local server on ${port}`);
});

