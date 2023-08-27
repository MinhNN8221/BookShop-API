'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginSchema = {
  email: _joi2.default.string().min(5).max(100).required().email(),
  password: _joi2.default.string().min(5).max(50).required()
};

var changePassSchema = {
  email: _joi2.default.string().min(5).max(100).required().email(),
  old_password: _joi2.default.string().min(5).max(50).required(),
  new_password: _joi2.default.string().min(5).max(50).required()
};

var forgotPassSchema = {
  email: _joi2.default.string().min(5).max(100).required().email()
};

var customerSchema = {
  name: _joi2.default.string().min(1).max(50),
  mob_phone: _joi2.default.string(),
  address: _joi2.default.string(),
  gender: _joi2.default.string(),
  date_of_birth: _joi2.default.date()
};

var registerSchema = {
  email: _joi2.default.string().min(5).max(100).required().email(),
  password: _joi2.default.string().min(5).max(50).required(),
  name: _joi2.default.string().min(1).max(50).required()
};

var addressSchema = {
  address_1: _joi2.default.string().required(),
  address_2: _joi2.default.string(),
  city: _joi2.default.string().required(),
  region: _joi2.default.string().required(),
  postal_code: _joi2.default.string().required(),
  country: _joi2.default.string().required(),
  shipping_region_id: _joi2.default.number().required()
};

var shoppingCartSchema = {
  product_id: _joi2.default.number().required()

};

var shoppingItemCartSchema = {
  item_id: _joi2.default.number().required(),
  quantity: _joi2.default.number().min(1).required()
};

var orderSchema = {
  cart_id: _joi2.default.required(),
  shipping_id: _joi2.default.number().required(),
  address: _joi2.default.string().required(),
  status: _joi2.default.number(),
  reference: _joi2.default.string(),
  auth_code: _joi2.default.string(),
  comments: _joi2.default.string(),
  shipped_on: _joi2.default.date(),
  receiver_name: _joi2.default.string().min(5).required(),
  receiver_phone: _joi2.default.string().min(10).max(10).required()
};

var wishlistSchema = {
  product_id: _joi2.default.required()

};

var cardSchema = {
  credit_card: _joi2.default.string().required()
};

exports.default = {
  loginSchema: loginSchema,
  cardSchema: cardSchema,
  orderSchema: orderSchema,
  changePassSchema: changePassSchema,
  forgotPassSchema: forgotPassSchema,
  wishlistSchema: wishlistSchema,
  shoppingCartSchema: shoppingCartSchema,
  shoppingItemCartSchema: shoppingItemCartSchema,
  addressSchema: addressSchema,
  registerSchema: registerSchema,
  customerSchema: customerSchema
};