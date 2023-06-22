import express from 'express';
import bodyParser from 'body-parser';
import initWebRouter from './route/web';
import configviewEngine from './config/viewEngine';
import connectDB from './config/connectDB'
import initApiRouter from './route/api/api';
import cookieParser from 'cookie-parser';
require('dotenv').config();

let app = express();
let port = process.env.PORT || 6868;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configviewEngine(app);

initWebRouter(app);

initApiRouter(app);

connectDB();

app.listen(port, () => {
    console.log(`this is http://localhost:${port}`)
})