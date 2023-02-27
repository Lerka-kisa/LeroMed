require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const {sequelize} = require('./db')
const model = require('./models/models');
const PORT = process.env.PORT || 3031;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());   // а вот такого в старом просто не было
app.use(cookieParser());
//app.use(cookieParser("cookie_key"));     так было в старом
app.use(cors())

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
        console.error(e)
    }
}

start()