const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

let itemDao = {
    findAll: findItems,
    createItem: createItem,
    getById: getItem,
    deleteById: deleteItem,
    updateById: updateItem
}

function findItems() {
    return Item.findAll();
}

function createItem(item, token) {
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    item = {...item, userId: decoded.id}
    let newItem = new Item(item);
    return newItem.save();
}

function getItem(id) {
    return Item.findByPk(id);
}

async function deleteItem(id, token) {
    let item = await Item.findByPk(id);
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    if(item.userId===decoded.id){
        return Item.destroy({ where: { id: id } });
    }else{
        throw( "You cannot perform this action." ); 
    }

}

async function updateItem(item, id, token) {
    let updatedItem = {
        image_url: item.image_url,
        title: item.title,
        description: item.description,
        price: item.price,
    }; 
    let itemInstance = await Item.findByPk(id);
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    if(itemInstance.userId===decoded.id){
        return Item.update(updatedItem, { where: { id: id } });
    }else{
        throw( "You cannot perform this action." ); 
    }
}
module.exports = itemDao;
