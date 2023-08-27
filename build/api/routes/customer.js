'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _customerController = require('../controllers/customerController');

var _customerController2 = _interopRequireDefault(_customerController);

var _socialAuthController = require('../controllers/socialAuthController');

var _socialAuthController2 = _interopRequireDefault(_socialAuthController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({
    storage: _multer2.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 2 MB
        files: 1
    },
    fileFilter: function fileFilter(req, file, callback) {
        var ext = _path2.default.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    }
});

var customerRouter = (0, _express.Router)();

customerRouter.post('/', _customerController2.default.register);

customerRouter.post('/login', _customerController2.default.login);
customerRouter.post('/changePass', _customerController2.default.changePassword);
customerRouter.post('/forgotPass', _customerController2.default.forgotPassword);
customerRouter.put('/', _authenticate2.default, _customerController2.default.UpdateCustomer);
customerRouter.get('/', _authenticate2.default, _customerController2.default.getCustomer);
customerRouter.put('/address', _authenticate2.default, _customerController2.default.UpdateCustomerAddress);
customerRouter.put('/creditCard', _authenticate2.default, _customerController2.default.UpdateCreditCard);

customerRouter.post('/facebook', _socialAuthController2.default.facebookAuth);
customerRouter.post('/update/avatar', _authenticate2.default, upload.single("image"), _customerController2.default.updateAvatar);

exports.default = customerRouter;