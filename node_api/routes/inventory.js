const express = require('express')
const inventoryController = require('../controllers/inventory')
const router = express.Router();

// router.get('/', inventoryController.getPosts);
router.get('/product/list', inventoryController.product); //

router.get('/product/inventory/:id', inventoryController.inventoryById); //
// router.get('/product/label/:id', inventoryController.labelById);


// router.post('/post', inventoryController.postAddProduct);
router.post('/post/inventory', inventoryController.postAddDayStock); //

module.exports = router;