'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customer = require('./routes/customer');

var _customer2 = _interopRequireDefault(_customer);

var _products = require('./routes/products');

var _products2 = _interopRequireDefault(_products);

var _shoppingCart = require('./routes/shoppingCart');

var _shoppingCart2 = _interopRequireDefault(_shoppingCart);

var _tax = require('./routes/tax');

var _tax2 = _interopRequireDefault(_tax);

var _order = require('./routes/order');

var _order2 = _interopRequireDefault(_order);

var _payment = require('./routes/payment');

var _payment2 = _interopRequireDefault(_payment);

var _shipping = require('./routes/shipping');

var _shipping2 = _interopRequireDefault(_shipping);

var _wishlist = require('./routes/wishlist');

var _wishlist2 = _interopRequireDefault(_wishlist);

var _author = require('./routes/author');

var _author2 = _interopRequireDefault(_author);

var _category = require('./routes/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/customers', _customer2.default);
router.use('/customer', _customer2.default);
router.use('/products', _products2.default);
router.use('/shoppingcart', _shoppingCart2.default);
router.use('/tax', _tax2.default);
router.use('/orders', _order2.default);
router.use('/stripe', _payment2.default);
router.use('/shipping', _shipping2.default);
router.use('/wishlist', _wishlist2.default);
router.use('/author', _author2.default);
router.use('/category', _category2.default);

exports.default = router;