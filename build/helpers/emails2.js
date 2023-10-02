'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_mail2.default.setApiKey(process.env.SENDGRID_API_KEY);

//nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bookshops.app@gmail.com', // Địa chỉ email của bạn
    pass: 'yhzh wuhn xxlh lmhe' // Mật khẩu của bạn
  }
});
//nodemailer

var sendNewPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, newPass) {
    var msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msg = {
              to: '' + email,
              from: 'bookshops.app@gmail.com',
              subject: 'Mật khẩu mới trên hệ thống BookShop',
              html: '<strong>Xin ch\u00e0o,</strong>\n    <p>Ch\u00fang t\u00f4i \u0111\u00e3 nh\u1eadn \u0111\u01b0\u1ee3c y\u00eau c\u1ea7u \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u BookShop c\u1ee7a b\u1ea1n.</p>\n    <p>M\u1EADt kh\u1EA9u m\u1EDBi c\u1EE7a b\u1EA1n l\xE0: <strong>' + newPass + '</strong></p>'
            };
            _context.next = 3;
            // return _mail2.default.send(msg);
            return transporter.sendMail(msg);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendNewPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = sendNewPassword;
