const itemDao = require('../data_access/item.dao.js');
let itemController = {
    addItem: addItem,
    findItems: findItems,
    findItemById: findItemById,
    updateItem: updateItem,
    deleteById: deleteById
}

function addItem(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    let item = req.body;
    itemDao.createItem(item, token).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findItemById(req, res) {
    itemDao.getById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
} 

function deleteById(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    itemDao.deleteById(req.params.id, token).
        then((data) => {
            res.status(200).json({
                message: "Item deleted successfully",
                item: data
            })
        })
        .catch((error) => {
            res.status(401).json({
                message: error,
            })
        });
}

function updateItem(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    itemDao.updateById(req.body, req.params.id, token).
        then((data) => {
            res.status(200).json({
                message: "Item updated successfully",
                item: req.body
            })
        })  
        .catch((error) => {
            res.status(401).json({
                message: error,
            })
        });
}  

function findItems(req, res) {
    itemDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = itemController;
