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

var orderEmail = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, details) {
    var msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msg = {
              to: '' + user.email,
              from: 'anhshop@yopmail.com',
              subject: 'Đơn hàng của bạn đã được đặt thành công',
              html: '<strong>C\u1EA3m \u01A1n b\u1EA1n v\xEC \u0111\xE3 \u0111\u1EB7t h\xE0ng</strong>\n    <p>Sau \u0111\xE2y l\xE0 th\xF4ng tin chi ti\u1EBFt c\u1EE7a \u0111\u01A1n h\xE0ng</p>\n    <p>S\u1ED1 l\u01B0\u1EE3ng : ' + details[0].total_amount + '</p>\n    <p>Ph\u01B0\u01A1ng th\u1EE9c giao h\xE0ng : ' + details[0].shipping_type + '</p>\n    <p>Ph\xED giao h\xE0ng : ' + details[0].shipping_cost + '</p>\n    <p>Lo\u1EA1i thu\u1EBF : ' + details[0].tax_type + '</p>\n    <p>Ph\u1EA7n tr\u0103m thu\u1EBF : ' + details[0].tax_percentage + '</p>\n    '
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

  return function orderEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = orderEmail;