'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _wishlistController = require('../controllers/wishlistController');

var _wishlistController2 = _interopRequireDefault(_wishlistController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderRouter = (0, _express.Router)();

orderRouter.get('/', _authenticate2.default, _wishlistController2.default.getProductsInWishlist);
orderRouter.post('/add', _authenticate2.default, _wishlistController2.default.addWishlist);
orderRouter.delete('/remove/:product_id', _authenticate2.default, _wishlistController2.default.removeWishlist);

exports.default = orderRouter;