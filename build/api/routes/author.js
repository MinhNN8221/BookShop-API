'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _authorController = require('../controllers/authorController');

var _authorController2 = _interopRequireDefault(_authorController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorRouter = (0, _express.Router)();

authorRouter.get('/hot', _authorController2.default.getFamousAuthors);
authorRouter.get('/:author_id', _authorController2.default.getAuthorInfo);

exports.default = authorRouter;