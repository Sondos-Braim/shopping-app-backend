const Sequelize = require('sequelize');
const db = require('../config/db_config');
const User = require('./User');

const Item = db.define('item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
User.hasMany(Item, {
    foreignKey:  {allowNull: false},
    onDelete: "CASCADE",
    as: 'papers'
})
Item.belongsTo(User, {
    foreignKey: {allowNull: false},    
})

module.exports = Item;
