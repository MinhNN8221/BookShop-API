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

var sendNewPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, newPass) {
    var msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msg = {
              to: '' + email,
              from: 'anhshop@yopmail.com',
              subject: 'Mật khẩu mới trên hệ thống AnhShop',
              html: '<p>M\u1EADt kh\u1EA9u m\u1EDBi c\u1EE7a b\u1EA1n l\xE0: ' + newPass + '</p>'
            };
            _context.next = 3;
            return _mail2.default.send(msg);

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