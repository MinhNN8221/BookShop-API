'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../../models');

var _util = require('../../helpers/util');

var _util2 = _interopRequireDefault(_util);

var _emails = require('../../helpers/emails2');

var _emails2 = _interopRequireDefault(_emails);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _streamifier = require('streamifier');

var _streamifier2 = _interopRequireDefault(_streamifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateRegisterDetails = _util2.default.validateRegisterDetails,
    validateLoginDetails = _util2.default.validateLoginDetails,
    validateChangePass = _util2.default.validateChangePass,
    validateForgotPass = _util2.default.validateForgotPass,
    validateAddressDetails = _util2.default.validateAddressDetails,
    validateCardDetails = _util2.default.validateCardDetails,
    validateCustomerDetails = _util2.default.validateCustomerDetails,
    hashPassword = _util2.default.hashPassword,
    createToken = _util2.default.createToken,
    errorResponse = _util2.default.errorResponse,
    comparePasswords = _util2.default.comparePasswords;

/**
   * @export
   * @class CustomerController
   *  @description Performs operations on the customer
   */

var CustomerController = function () {
  function CustomerController() {
    _classCallCheck(this, CustomerController);
  }

  _createClass(CustomerController, null, [{
    key: 'register',

    /**
      * @description -This method registers a customer
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - customer and accessToken
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, email, password, _validateRegisterDeta, error, errorField, errorMessage, existingCustomer, hashedPassword, customer, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                _context.prev = 1;
                _validateRegisterDeta = validateRegisterDetails(req.body), error = _validateRegisterDeta.error;

                if (!error) {
                  _context.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context.next = 9;
                return _models.Customer.findByEmail(email);

              case 9:
                existingCustomer = _context.sent;

                if (!existingCustomer) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', errorResponse(res, 409, 'USR_04', 'The email already exists.', 'email'));

              case 12:
                _context.next = 14;
                return hashPassword(password);

              case 14:
                hashedPassword = _context.sent;
                _context.next = 17;
                return _models.Customer.create({
                  name: name,
                  email: email,
                  password: hashedPassword
                });

              case 17:
                customer = _context.sent;
                _context.next = 20;
                return customer.reload();

              case 20:
                delete customer.dataValues.password;
                token = createToken(customer);
                return _context.abrupt('return', res.status(200).json({
                  accessToken: 'Bearer ' + token,
                  customer: customer,
                  expires_in: '24h'
                }));

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 25]]);
      }));

      function register(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()

    /**
      * @description -This method logins a customer
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - customer and accessToken
      */

  }, {
    key: 'login',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, _validateLoginDetails, error, errorField, errorMessage, existingCustomer, match, customer, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _validateLoginDetails = validateLoginDetails(req.body), error = _validateLoginDetails.error;

                if (!error) {
                  _context2.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context2.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context2.next = 9;
                return _models.Customer.scope('withoutPassword').findByEmail(email);

              case 9:
                existingCustomer = _context2.sent;

                if (existingCustomer) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email'));

              case 12:
                _context2.next = 14;
                return comparePasswords(password, existingCustomer.dataValues.password);

              case 14:
                match = _context2.sent;

                if (!match) {
                  _context2.next = 24;
                  break;
                }

                customer = existingCustomer.dataValues;

                delete existingCustomer.dataValues.password;
                _context2.next = 20;
                return createToken(customer);

              case 20:
                token = _context2.sent;

                res.status(200).json({
                  accessToken: 'Bearer ' + token,
                  customer: customer,
                  expires_in: '15 days'
                });
                _context2.next = 25;
                break;

              case 24:
                return _context2.abrupt('return', errorResponse(res, 400, 'USR_01', 'Email or Password is invalid.'));

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 30:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 27]]);
      }));

      function login(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()

    /**
      * @description -This method returns details of  a customer
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - customer
      */

  }, {
    key: 'getCustomer',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var customer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models.Customer.scope('withoutPassword').findOne({
                  where: { customer_id: req.user.customer_id }
                });

              case 3:
                customer = _context3.sent;

                if (customer) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', errorResponse(res, 404, 'USR_04', 'Customer does not exist.'));

              case 6:
                return _context3.abrupt('return', res.status(200).json(customer));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({ error: 'Internal Server Error' });

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function getCustomer(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getCustomer;
    }()

    /**
      * @description -This method updates a customer's address
      * @param {object} req - The request payload
      * @param {object} res - The response payload
      * @returns {object} - customer
      */

  }, {
    key: 'UpdateCustomerAddress',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _validateAddressDetai, error, errorField, errorMessage, customer, updatedCustomer;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _validateAddressDetai = validateAddressDetails(req.body), error = _validateAddressDetai.error;

                if (!error) {
                  _context4.next = 6;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context4.abrupt('return', errorResponse(res, 400, 'USR_02', errorMessage, errorField));

              case 6:
                _context4.next = 8;
                return _models.Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });

              case 8:
                customer = _context4.sent;

                if (customer) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt('return', errorResponse(res, 404, 'USR_04', 'Customer does not exist.'));

              case 11:
                _context4.next = 13;
                return customer.update(req.body);

              case 13:
                updatedCustomer = _context4.sent;
                return _context4.abrupt('return', res.status(200).json(updatedCustomer));

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4['catch'](0);

                res.status(500).json({ error: 'Internal Server Error' });

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 17]]);
      }));

      function UpdateCustomerAddress(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return UpdateCustomerAddress;
    }()

    /**
      * @description -This method updates a customer's credit card
      * @param {object} req - The request payload
      * @param {object} res - The response payload
      * @returns {object} - customer
      */

  }, {
    key: 'UpdateCreditCard',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var _validateCardDetails, error, errorField, errorMessage, customer, updatedCustomer;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _validateCardDetails = validateCardDetails(req.body), error = _validateCardDetails.error;

                if (!error) {
                  _context5.next = 6;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context5.abrupt('return', errorResponse(res, 400, 'USR_02', errorMessage, errorField));

              case 6:
                _context5.next = 8;
                return _models.Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });

              case 8:
                customer = _context5.sent;

                if (customer) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt('return', errorResponse(res, 404, 'USR_04', 'Customer does not exist.'));

              case 11:
                _context5.next = 13;
                return customer.update(req.body);

              case 13:
                updatedCustomer = _context5.sent;
                return _context5.abrupt('return', res.status(200).json(updatedCustomer));

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](0);

                res.status(500).json({ error: 'Internal Server Error' });

              case 20:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 17]]);
      }));

      function UpdateCreditCard(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return UpdateCreditCard;
    }()

    /**
      * @description -This method updates a customer's personal details
      * @param {object} req - The request payload
      * @param {object} res - The response payload
      * @returns {object} - customer
      */

  }, {
    key: 'UpdateCustomer',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var _validateCustomerDeta, error, errorField, errorMessage, customer, updatedCustomer;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _validateCustomerDeta = validateCustomerDetails(req.body), error = _validateCustomerDeta.error;

                if (!error) {
                  _context6.next = 6;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context6.abrupt('return', errorResponse(res, 400, 'USR_02', errorMessage, errorField));

              case 6:
                _context6.next = 8;
                return _models.Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });

              case 8:
                customer = _context6.sent;

                if (customer) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt('return', errorResponse(res, 404, 'USR_04', 'Customer does not exist.'));

              case 11:
                _context6.next = 13;
                return customer.update(req.body);

              case 13:
                updatedCustomer = _context6.sent;
                return _context6.abrupt('return', res.status(200).json(updatedCustomer));

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6['catch'](0);

                res.status(500).json({ error: 'Internal Server Error' });

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 17]]);
      }));

      function UpdateCustomer(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return UpdateCustomer;
    }()
  }, {
    key: 'forgotPassword',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var email, _validateForgotPass, error, errorField, errorMessage, existingCustomer, length, charset, newPass, i, n, hashedPassword, updatedCustomer;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                email = req.body.email;
                _context7.prev = 1;
                _validateForgotPass = validateForgotPass(req.body), error = _validateForgotPass.error;

                if (!error) {
                  _context7.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context7.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context7.next = 9;
                return _models.Customer.scope('withoutPassword').findByEmail(email);

              case 9:
                existingCustomer = _context7.sent;

                if (existingCustomer) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt('return', errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email'));

              case 12:
                length = 8;
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                newPass = "";

                for (i = 0, n = charset.length; i < length; ++i) {
                  newPass += charset.charAt(Math.floor(Math.random() * n));
                }

                _context7.next = 18;
                return hashPassword(newPass);

              case 18:
                hashedPassword = _context7.sent;
                _context7.next = 21;
                return existingCustomer.update({
                  password: hashedPassword
                });

              case 21:
                updatedCustomer = _context7.sent;
                _context7.next = 24;
                return (0, _emails2.default)(email, newPass);

              case 24:
                return _context7.abrupt('return', res.status(200).json({
                  "message": "Đã gửi mật khẩu mới thông qua email của bạn!"
                }));

              case 27:
                _context7.prev = 27;
                _context7.t0 = _context7['catch'](1);

                res.status(500).json({ error: 'Internal Server Error error = ' + _context7.t0 });

              case 30:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 27]]);
      }));

      function forgotPassword(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return forgotPassword;
    }()
  }, {
    key: 'updateAvatar',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var customer, uploadToCloudinary, result, updatedCustomer;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (req.file) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return', errorResponse(res, 400, 'USR_05', 'File not found', 'image'));

              case 2:
                _context8.next = 4;
                return _models.Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });

              case 4:
                customer = _context8.sent;

                if (customer) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt('return', errorResponse(res, 404, 'USR_04', 'Customer does not exist.'));

              case 7:
                uploadToCloudinary = function uploadToCloudinary(file) {
                  return new Promise(function (resolve, reject) {
                    var stream = _cloudinary2.default.v2.uploader.upload_stream(function (error, result) {
                      if (result) {
                        resolve(result);
                      } else {
                        reject(error);
                      }
                    });

                    _streamifier2.default.createReadStream(file.buffer).pipe(stream);
                  });
                };

                _context8.prev = 8;
                _context8.next = 11;
                return uploadToCloudinary(req.file);

              case 11:
                result = _context8.sent;
                _context8.next = 14;
                return customer.update({
                  "avatar": result.secure_url
                });

              case 14:
                updatedCustomer = _context8.sent;
                return _context8.abrupt('return', res.status(200).json(updatedCustomer));

              case 18:
                _context8.prev = 18;
                _context8.t0 = _context8['catch'](8);
                return _context8.abrupt('return', res.status(500).json({ e: 'Internal Server Error error = ' + _context8.t0 }));

              case 21:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[8, 18]]);
      }));

      function updateAvatar(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return updateAvatar;
    }()
  }, {
    key: 'changePassword',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var _req$body3, email, old_password, new_password, _validateChangePass, error, errorField, errorMessage, existingCustomer, match, hashedPassword, updatedCustomer;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _req$body3 = req.body, email = _req$body3.email, old_password = _req$body3.old_password, new_password = _req$body3.new_password;
                _context9.prev = 1;
                _validateChangePass = validateChangePass(req.body), error = _validateChangePass.error;

                if (!error) {
                  _context9.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context9.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context9.next = 9;
                return _models.Customer.scope('withoutPassword').findByEmail(email);

              case 9:
                existingCustomer = _context9.sent;

                if (existingCustomer) {
                  _context9.next = 12;
                  break;
                }

                return _context9.abrupt('return', errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email'));

              case 12:
                _context9.next = 14;
                return comparePasswords(old_password, existingCustomer.dataValues.password);

              case 14:
                match = _context9.sent;

                if (!match) {
                  _context9.next = 26;
                  break;
                }

                _context9.next = 18;
                return hashPassword(new_password);

              case 18:
                hashedPassword = _context9.sent;
                _context9.next = 21;
                return existingCustomer.update({
                  password: hashedPassword
                });

              case 21:
                updatedCustomer = _context9.sent;


                delete updatedCustomer.dataValues.password;

                return _context9.abrupt('return', res.status(200).json(updatedCustomer));

              case 26:
                return _context9.abrupt('return', errorResponse(res, 400, 'USR_01', 'Email or Password is invalid.'));

              case 27:
                _context9.next = 32;
                break;

              case 29:
                _context9.prev = 29;
                _context9.t0 = _context9['catch'](1);

                res.status(500).json({ error: 'Internal Server Error error = ' + _context9.t0 });

              case 32:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 29]]);
      }));

      function changePassword(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return changePassword;
    }()
  }]);

  return CustomerController;
}();

exports.default = CustomerController;