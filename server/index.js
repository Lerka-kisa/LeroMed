require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser(""));

const {sequelize} = require('./db');
const model = require('./models/models');

const PORT = process.env.PORT || 3031;

//const fs = require("fs");

const router = require("./routers/router");
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync()
            .then(() => {
                console.log('Success connection to ' + process.env.DB_NAME);
            }).catch(err => {
                console.log('Error while BD connecting: ' + err);
            });

        app.listen(PORT, () => {
            console.log('http://localhost:'+ PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()