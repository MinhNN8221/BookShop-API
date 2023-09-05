'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _shoppingCartController = require('../controllers/shoppingCartController');

var _shoppingCartController2 = _interopRequireDefault(_shoppingCartController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productRouter = (0, _express.Router)();

productRouter.get('/generateUniqueId', _shoppingCartController2.default.generateUniqueId);
productRouter.post('/add', _authenticate2.default, _shoppingCartController2.default.addProductToCart);
productRouter.post('/add/wishlist', _authenticate2.default, _shoppingCartController2.default.addWishlistToCart);
productRouter.get('/', _authenticate2.default, _shoppingCartController2.default.getProductsInCart);
productRouter.delete('/empty', _authenticate2.default, _shoppingCartController2.default.emptyCart);
productRouter.delete('/removeProduct/:item_id', _authenticate2.default, _shoppingCartController2.default.removeProduct);
productRouter.post('/update', _authenticate2.default, _shoppingCartController2.default.changeProductQuantityInCart);

exports.default = productRouter;