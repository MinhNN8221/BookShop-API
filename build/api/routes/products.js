'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productRouter = (0, _express.Router)();

productRouter.get('/recommend', _productController2.default.getProductRecommendation);
productRouter.get('/hot', _productController2.default.getHotProducts);
productRouter.get('/new', _productController2.default.getNewProducts);
productRouter.get('/', _productController2.default.getAllProducts);
productRouter.get('/incategory', _productController2.default.getProductsInCategory);
productRouter.get('/category/search', _productController2.default.searchProductsInCategory);
productRouter.get('/inDepartment', _productController2.default.getProductsInDepartment);
productRouter.get('/incategory/:categoryId', _productController2.default.getProductsInCategory);
productRouter.get('/inDepartment/:departmentId', _productController2.default.getProductsInDepartment);
productRouter.get('/search', _productController2.default.searchProducts);
productRouter.get('/supplier/search', _productController2.default.searchSupplierProducts);
productRouter.get('/supplier', _productController2.default.getSupplierProducts);
productRouter.get('/author/search', _productController2.default.searchAuthorProducts);
productRouter.get('/author', _productController2.default.getAuthorProducts);
productRouter.get('/:product_id', _authenticate2.default, _productController2.default.getSingleProduct);

exports.default = productRouter;