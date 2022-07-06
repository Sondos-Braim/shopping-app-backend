
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize('shoppingapp', 'sondos', `${process.env.PASSWORD}`, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;