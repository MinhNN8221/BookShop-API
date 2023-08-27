'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _categoryController = require('../controllers/categoryController');

var _categoryController2 = _interopRequireDefault(_categoryController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderRouter = (0, _express.Router)();

orderRouter.get('/hot', _categoryController2.default.getHotCategories);
orderRouter.get('/', _categoryController2.default.getAllCategories);

exports.default = orderRouter;