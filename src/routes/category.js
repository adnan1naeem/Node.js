const express = require('express')
const router = express.Router()
const Category = require('../controller/categories')

router.post('/addCategory', Category.addCategory)
router.get('/category', Category.catgoryList)
router.delete('/deleteCategory/:id', Category.deleteCategory)

module.exports = router