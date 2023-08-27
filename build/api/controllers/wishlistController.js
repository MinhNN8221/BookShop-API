'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('dotenv/config');

var _util = require('../../helpers/util');

var _util2 = _interopRequireDefault(_util);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateWishlistDetails = _util2.default.validateWishlistDetails,
    errorResponse = _util2.default.errorResponse;

var WishListController = function () {
    function WishListController() {
        _classCallCheck(this, WishListController);
    }

    _createClass(WishListController, null, [{
        key: 'addWishlist',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                var productId, customerId, _validateWishlistDeta, error, errorField, errorMessage, createWishlist, wishlist;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                productId = req.body.product_id;
                                customerId = req.user.customer_id;
                                _validateWishlistDeta = validateWishlistDetails(req.body), error = _validateWishlistDeta.error;

                                if (!error) {
                                    _context.next = 8;
                                    break;
                                }

                                errorField = error.details[0].context.key;
                                errorMessage = error.details[0].message;
                                return _context.abrupt('return', errorResponse(res, 400, 'ORD_01', errorMessage, errorField));

                            case 8:
                                createWishlist = 'CALL wishlist_create(:productId,:customerId)';
                                _context.next = 11;
                                return _models2.default.sequelize.query(createWishlist, {
                                    replacements: {
                                        productId: productId, customerId: customerId
                                    }
                                });

                            case 11:
                                wishlist = _context.sent;
                                return _context.abrupt('return', res.status(200).json({
                                    "message": "Đã thêm vào wishlist của bạn!"
                                }));

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](0);
                                return _context.abrupt('return', res.status(500).json({ error: 'Internal Server Error' }));

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 15]]);
            }));

            function addWishlist(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return addWishlist;
        }()
    }, {
        key: 'removeWishlist',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
                var productId, customerId, _validateWishlistDeta2, error, errorField, errorMessage, _removeWishlist, wishlist;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                productId = req.params.product_id;
                                customerId = req.user.customer_id;
                                _validateWishlistDeta2 = validateWishlistDetails(req.params), error = _validateWishlistDeta2.error;

                                if (!error) {
                                    _context2.next = 8;
                                    break;
                                }

                                errorField = error.details[0].context.key;
                                errorMessage = error.details[0].message;
                                return _context2.abrupt('return', errorResponse(res, 400, 'ORD_01', errorMessage, errorField));

                            case 8:
                                _removeWishlist = 'CALL wishlist_remove(:productId,:customerId)';
                                _context2.next = 11;
                                return _models2.default.sequelize.query(_removeWishlist, {
                                    replacements: {
                                        productId: productId, customerId: customerId
                                    }
                                });

                            case 11:
                                wishlist = _context2.sent;
                                return _context2.abrupt('return', res.status(200).json({
                                    "message": "Đã xóa khỏi wishlist của bạn!"
                                }));

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2['catch'](0);
                                return _context2.abrupt('return', res.status(500).json({ error: 'Internal Server Error' }));

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 15]]);
            }));

            function removeWishlist(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return removeWishlist;
        }()
    }, {
        key: 'getProductsInWishlist',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
                var customerId, _req$query, page, _req$query$limit, limit, _req$query$descriptio, descriptionLength, startIndex, query, products, count;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                customerId = req.user.customer_id;
                                _req$query = req.query, page = _req$query.page, _req$query$limit = _req$query.limit, limit = _req$query$limit === undefined ? 20 : _req$query$limit, _req$query$descriptio = _req$query.description_length, descriptionLength = _req$query$descriptio === undefined ? 200 : _req$query$descriptio;
                                startIndex = 0;

                                if (page) startIndex = (page - 1) * limit;

                                query = 'CALL catalog_get_products_in_wishlist(:customerId,:descriptionLength,:limit,:startIndex)';
                                _context3.next = 8;
                                return _models2.default.sequelize.query(query, {
                                    replacements: {
                                        customerId: customerId, descriptionLength: descriptionLength, limit: limit, startIndex: startIndex
                                    }
                                });

                            case 8:
                                products = _context3.sent;
                                count = products.length;
                                return _context3.abrupt('return', res.status(200).json({ count: count, rows: products }));

                            case 13:
                                _context3.prev = 13;
                                _context3.t0 = _context3['catch'](0);

                                res.status(500).json({ error: 'Internal Server Error' });

                            case 16:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 13]]);
            }));

            function getProductsInWishlist(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return getProductsInWishlist;
        }()
    }]);

    return WishListController;
}();

exports.default = WishListController;