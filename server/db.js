require('dotenv').config();
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        //host: process.env.DB_HOST_DOCKER,
        dialect: 'mssql'
    }
);
// const sequelize = new Sequelize('LeroMed', "LERA", "Nata_5442488",
//     {host: 'localhost'/*'host.docker.internal'*/, dialect: 'mssql'}
// );

module.exports = {sequelize}