import express from 'express';
import bodyParser from 'body-parser';
import initWebRouter from './route/web';
import configviewEngine from './config/viewEngine';
import connectDB from './config/connectDB'
require('dotenv').config();

let app = express();
let port = process.env.PORT || 6868;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configviewEngine(app);

initWebRouter(app);

connectDB();

app.listen(port, () => {
    console.log(`this is http://localhost:${port}`)
})