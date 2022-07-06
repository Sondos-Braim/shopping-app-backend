const express = require('express');
const router = express.Router();

const itemController = require('../controller/item.controller');

router.post('/', itemController.addItem);
router.get('/', itemController.findItems);
router.get('/:id', itemController.findItemById);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteById);

module.exports = router;