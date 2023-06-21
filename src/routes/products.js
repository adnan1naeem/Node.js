const express = require('express')
const router = express.Router()
const Products = require('../controller/products')

router.post('/addProduct', Products.addProduct)
router.get('/products/:id', Products.productList)
router.delete('/deleteProduct/:id', Products.deleteProduct)

module.exports = router