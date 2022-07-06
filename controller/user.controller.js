const userDao = require('../data_access/user.dao');

let userController = {
    addUser: addUser,
    getUser: getUser
}

function addUser(req, res) {
    let user = req.body;
    userDao.createUser(user).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
}

function getUser(req, res) {
    let user = req.body;
    userDao.getUser(user).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).json({
                message: error,
            })
        }); 
}

module.exports = userController;
