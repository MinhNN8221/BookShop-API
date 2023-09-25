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
    pass: 'aztcxqhqkuahsgrc' // Mật khẩu của bạn
  }
});
//nodemailer

var orderEmail = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, details) {
    var msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            var sum=0
            for(var i=0; i< details[0].products; i++){
              sum+=details[0].products[i].quantity
            }
            console.log("QUANTITY", sum);
            msg = {
              to: `${user.email}`,
              from: 'bookshops.app@gmail.com',
              subject: 'Đơn hàng của bạn đã được đặt thành công',
              html: '<strong>Xin ch\u00e0o: <em> '+ user.name +'</em>, c\u1EA3m \u01A1n b\u1EA1n v\xEC \u0111\xE3 \u0111\u1EB7t h\xE0ng</strong>\n    <p>Sau \u0111\xE2y l\xE0 th\xF4ng tin chi ti\u1EBFt c\u1EE7a \u0111\u01A1n h\xE0ng</p>\n    <p>Th\u1eddi gian \u0111\u1eb7t h\u00e0ng : ' + details[0].created_on + '</p>\n    <p>T\u00ean ng\u01b0\u1eddi nh\u1eadn h\u00e0ng : ' + details[0].receiver_name + '</p>\n    <p>S\u1ed1 \u0111i\u1ec7n tho\u1ea1i ng\u01b0\u1eddi nh\u1eadn : ' + details[0].receiver_phone + '</p>\n    <p>\u0110\u1ecba ch\u1ec9 ng\u01b0\u1eddi nh\u1eadn : ' + details[0].address + '</p>\n    <p>S\u1ED1 l\u01B0\u1EE3ng : ' + sum + '</p>\n    <p>Ph\u01B0\u01A1ng th\u1EE9c giao h\xE0ng : ' + details[0].shipping_type + '</p>\n    <p>Ph\xED giao h\xE0ng : ' + details[0].shipping_cost + '</p>\n    <p>T\u1ed5ng ti\u1ec1n ph\u1ea3i tr\u1ea3 : ' + details[0].order_total + '</p>\n    <p>Tr\u00e2n tr\u1ecdng,</p>\n    <p>\u0110\u1ed9i ng\u0169 BookShop.</p>'
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

  return function orderEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = orderEmail;
