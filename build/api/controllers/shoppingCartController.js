'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

require('dotenv/config');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _shoppingCart = require('../../helpers/shoppingCart');

var _shoppingCart2 = _interopRequireDefault(_shoppingCart);

var _util = require('../../helpers/util');

var _util2 = _interopRequireDefault(_util);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingCart = _models2.default.ShoppingCart,
    Product = _models2.default.Product;
var errorResponse = _util2.default.errorResponse,
    validateCartDetails = _util2.default.validateCartDetails,
    validateItemCartDetails = _util2.default.validateItemCartDetails;

/**
 *
 *
 * @export
 * @class ShoppingCartController
 * @description Operations on Products
 */

var ShoppingCartController = function () {
  function ShoppingCartController() {
    _classCallCheck(this, ShoppingCartController);
  }

  _createClass(ShoppingCartController, null, [{
    key: 'generateUniqueId',

    /**
     * @description -This method generates a unique id
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {object} - unique id
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var uniqueId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _crypto2.default.randomBytes(16).toString('hex');

              case 3:
                uniqueId = _context.sent;

                if (!uniqueId) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(200).json({
                  cart_id: uniqueId
                }));

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                res.status(500).json({
                  error: 'Internal server error'
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function generateUniqueId(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return generateUniqueId;
    }()
  }, {
    key: 'addWishlistToCart',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _this = this;

        var customerId, cartQuery, carts, cartId, insertQuery, wishlistQuery, wishlist, cartItems;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                customerId = req.user.customer_id;
                cartQuery = 'CALL cart_get_user_cart(:customerId)';
                _context3.next = 5;
                return _models2.default.sequelize.query(cartQuery, {
                  replacements: {
                    customerId: customerId
                  }
                });

              case 5:
                carts = _context3.sent;
                cartId = void 0;

                if (!(carts.length > 0)) {
                  _context3.next = 11;
                  break;
                }

                cartId = carts[0].cart_id;
                _context3.next = 17;
                break;

              case 11:
                _context3.next = 13;
                return _crypto2.default.randomBytes(16).toString('hex');

              case 13:
                cartId = _context3.sent;
                insertQuery = 'CALL cart_insert_user_cart(:customerId,:cartId)';
                _context3.next = 17;
                return _models2.default.sequelize.query(insertQuery, {
                  replacements: {
                    customerId: customerId,
                    cartId: cartId
                  }
                });

              case 17:
                wishlistQuery = 'CALL catalog_get_all_products_in_wishlist(:customerId)';
                _context3.next = 20;
                return _models2.default.sequelize.query(wishlistQuery, {
                  replacements: {
                    customerId: customerId
                  }
                });

              case 20:
                wishlist = _context3.sent;

                if (!(!wishlist || wishlist.length == 0)) {
                  _context3.next = 25;
                  break;
                }

                return _context3.abrupt('return', errorResponse(res, 400, 'CARD_01', "No items in your wishlist", ""));

              case 25:
                wishlist.forEach(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
                    var existingCart, quantity;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return ShoppingCart.findOne({
                              where: {
                                cart_id: cartId,
                                product_id: product.product_id
                              }
                            });

                          case 2:
                            existingCart = _context2.sent;

                            if (existingCart) {
                              _context2.next = 8;
                              break;
                            }

                            _context2.next = 6;
                            return ShoppingCart.create({
                              cart_id: cartId,
                              product_id: product.product_id,
                              quantity: 1,
                              added_on: Date.now()
                            });

                          case 6:
                            _context2.next = 11;
                            break;

                          case 8:
                            quantity = existingCart.quantity + 1;
                            _context2.next = 11;
                            return existingCart.update({
                              cart_id: cartId,
                              product_id: product.product_id,
                              quantity: quantity
                            });

                          case 11:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                _context3.next = 28;
                return ShoppingCart.findAll({
                  where: {
                    cart_id: cartId
                  },
                  include: [{
                    model: Product
                  }]
                });

              case 28:
                cartItems = _context3.sent;

                res.status(200).json({
                  "message": "Đã thêm toàn bộ sản phẩm vào giỏ hàng"
                });

              case 30:
                _context3.next = 35;
                break;

              case 32:
                _context3.prev = 32;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error =' + _context3.t0
                });

              case 35:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 32]]);
      }));

      function addWishlistToCart(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return addWishlistToCart;
    }()

    /**
     * @description -This method adds a  product to cart
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {array} - adds a product to cart
     */

  }, {
    key: 'addProductToCart',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var productId, customerId, _validateCartDetails, error, errorField, errorMessage, query, carts, cartId, insertQuery, product, existingCart, quantity, cartItems, shoppingCartItems;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                productId = req.body.product_id;
                customerId = req.user.customer_id;
                _validateCartDetails = validateCartDetails(req.body), error = _validateCartDetails.error;

                if (!error) {
                  _context4.next = 8;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context4.abrupt('return', errorResponse(res, 400, 'PRD_01', errorMessage, errorField));

              case 8:
                query = 'CALL cart_get_user_cart(:customerId)';
                _context4.next = 11;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    customerId: customerId
                  }
                });

              case 11:
                carts = _context4.sent;
                cartId = void 0;

                if (!(carts.length > 0)) {
                  _context4.next = 17;
                  break;
                }

                cartId = carts[0].cart_id;
                _context4.next = 23;
                break;

              case 17:
                _context4.next = 19;
                return _crypto2.default.randomBytes(16).toString('hex');

              case 19:
                cartId = _context4.sent;
                insertQuery = 'CALL cart_insert_user_cart(:customerId,:cartId)';
                _context4.next = 23;
                return _models2.default.sequelize.query(insertQuery, {
                  replacements: {
                    customerId: customerId,
                    cartId: cartId
                  }
                });

              case 23:
                _context4.next = 25;
                return Product.findOne({
                  where: {
                    product_id: productId
                  }
                });

              case 25:
                product = _context4.sent;

                if (!product) {
                  _context4.next = 45;
                  break;
                }

                _context4.next = 29;
                return ShoppingCart.findOne({
                  where: {
                    cart_id: cartId,
                    product_id: productId
                  }
                });

              case 29:
                existingCart = _context4.sent;

                if (existingCart) {
                  _context4.next = 35;
                  break;
                }

                _context4.next = 33;
                return ShoppingCart.create({
                  cart_id: cartId,
                  product_id: productId,
                  quantity: 1,
                  added_on: Date.now()
                });

              case 33:
                _context4.next = 38;
                break;

              case 35:
                quantity = existingCart.quantity + 1;
                _context4.next = 38;
                return existingCart.update({
                  cart_id: cartId,
                  product_id: productId,
                  quantity: quantity
                });

              case 38:
                _context4.next = 40;
                return ShoppingCart.findAll({
                  where: {
                    cart_id: cartId
                  },
                  include: [{
                    model: Product
                  }]
                });

              case 40:
                cartItems = _context4.sent;
                shoppingCartItems = (0, _shoppingCart2.default)(cartItems);

                res.status(200).json(shoppingCartItems);
                _context4.next = 46;
                break;

              case 45:
                return _context4.abrupt('return', res.status(404).json({
                  error: {
                    status: 404,
                    message: 'Product cannot be found'
                  }
                }));

              case 46:
                _context4.next = 51;
                break;

              case 48:
                _context4.prev = 48;
                _context4.t0 = _context4['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error =' + _context4.t0
                });

              case 51:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 48]]);
      }));

      function addProductToCart(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return addProductToCart;
    }()

    /**
     * @description -This method gets products in cart
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {array} - cart products
     */

  }, {
    key: 'getProductsInCart',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var customerId, query, carts, cartId, cartItems, shoppingCartItems;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                customerId = req.user.customer_id;
                query = 'CALL cart_get_user_cart(:customerId)';
                _context5.next = 5;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    customerId: customerId
                  }
                });

              case 5:
                carts = _context5.sent;
                cartId = void 0;

                if (!(carts.length > 0)) {
                  _context5.next = 20;
                  break;
                }

                cartId = carts[0].cart_id;
                _context5.next = 11;
                return ShoppingCart.findAll({
                  attributes: {
                    include: [[_models2.default.sequelize.literal('(\n                  SELECT COUNT(*) \n                  FROM product_wishlist AS pw \n                  WHERE \n                    pw.customer_id = ' + customerId + ' \n                    AND \n                    pw.product_id = ShoppingCart.product_id\n                  )'), 'wishlist'], [_models2.default.sequelize.literal('(\n                  SELECT p.image\n                  FROM product AS p \n                  WHERE \n                    p.product_id = ShoppingCart.product_id\n                  )'), 'image']]
                  },
                  where: {
                    cart_id: cartId
                  },
                  include: [{
                    model: Product
                  }]
                });

              case 11:
                cartItems = _context5.sent;

                if (!(cartItems.length > 0)) {
                  _context5.next = 17;
                  break;
                }

                shoppingCartItems = (0, _shoppingCart2.default)(cartItems);
                return _context5.abrupt('return', res.status(200).json({
                  "cart_id": cartId,
                  "products": shoppingCartItems
                }));

              case 17:
                return _context5.abrupt('return', res.status(200).json({
                  "cart_id": cartId,
                  "products": []
                }));

              case 18:
                _context5.next = 21;
                break;

              case 20:
                return _context5.abrupt('return', res.status(200).json({
                  "cart_id": "",
                  "products": []
                }));

              case 21:
                _context5.next = 26;
                break;

              case 23:
                _context5.prev = 23;
                _context5.t0 = _context5['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 26:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 23]]);
      }));

      function getProductsInCart(_x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return getProductsInCart;
    }()

    /**
     * @description -This method clears the cart
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {array} - empty cart
     */

  }, {
    key: 'emptyCart',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var customerId, query, carts, cartId, _customerId, emptyQuery;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                customerId = req.user.customer_id;
                query = 'CALL cart_get_user_cart(:customerId)';
                _context6.next = 5;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    customerId: customerId
                  }
                });

              case 5:
                carts = _context6.sent;

                if (!(carts.length > 0)) {
                  _context6.next = 12;
                  break;
                }

                cartId = carts[0].cart_id;
                _customerId = carts[0].customer_id;
                emptyQuery = 'CALL shopping_cart_empty(:customerId,:cartId)';
                _context6.next = 12;
                return _models2.default.sequelize.query(emptyQuery, {
                  replacements: {
                    customerId: _customerId,
                    cartId: cartId
                  }
                });

              case 12:
                res.status(200).json({
                  "message": "Đã làm trống giỏ hàng của bạn"
                });
                _context6.next = 18;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _express2.default
                });

              case 18:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 15]]);
      }));

      function emptyCart(_x10, _x11) {
        return _ref6.apply(this, arguments);
      }

      return emptyCart;
    }()
  }, {
    key: 'changeProductQuantityInCart',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$body, itemId, quantity, customerId, _validateItemCartDeta, error, errorField, errorMessage, item, query;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _req$body = req.body, itemId = _req$body.item_id, quantity = _req$body.quantity;
                customerId = req.user.customer_id;
                _validateItemCartDeta = validateItemCartDetails(req.body), error = _validateItemCartDeta.error;

                if (!error) {
                  _context7.next = 8;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context7.abrupt('return', errorResponse(res, 400, 'PRD_01', errorMessage, errorField));

              case 8:
                _context7.next = 10;
                return ShoppingCart.findOne({
                  where: {
                    item_id: itemId
                  }
                });

              case 10:
                item = _context7.sent;

                if (item) {
                  _context7.next = 13;
                  break;
                }

                return _context7.abrupt('return', errorResponse(res, 404, 'CART_01', 'No item found', 'item_id'));

              case 13:
                query = 'CALL cart_change_item_quantity(' + itemId + ', ' + quantity + ');';
                _context7.next = 16;
                return _models2.default.sequelize.query(query);

              case 16:
                return _context7.abrupt('return', res.status(200).json({
                  "message": "Đã thay đổi số lượng"
                }));

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error =' + _context7.t0
                });

              case 22:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 19]]);
      }));

      function changeProductQuantityInCart(_x12, _x13) {
        return _ref7.apply(this, arguments);
      }

      return changeProductQuantityInCart;
    }()

    /**
     * @description -This method removes an item from the cart
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {array} - empty cart
     */

  }, {
    key: 'removeProduct',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var itemId, customerId, item, cartId, query, cartItems, emptyQuery;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                itemId = req.params.item_id;
                customerId = req.user.customer_id;
                _context8.next = 5;
                return ShoppingCart.findOne({
                  where: {
                    item_id: itemId
                  }
                });

              case 5:
                item = _context8.sent;

                if (item) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt('return', errorResponse(res, 404, 'CART_01', 'No item found', 'item_id'));

              case 8:
                cartId = item.cart_id;
                query = 'CALL shopping_cart_remove_product(' + itemId + ');';
                _context8.next = 12;
                return _models2.default.sequelize.query(query);

              case 12:
                _context8.next = 14;
                return ShoppingCart.findAll({
                  where: {
                    cart_id: cartId
                  },
                  include: [{
                    model: Product
                  }]
                });

              case 14:
                cartItems = _context8.sent;

                if (!(cartItems.length == 0)) {
                  _context8.next = 19;
                  break;
                }

                emptyQuery = 'CALL shopping_cart_empty(:customerId,:cartId)';
                _context8.next = 19;
                return _models2.default.sequelize.query(emptyQuery, {
                  replacements: {
                    customerId: customerId,
                    cartId: cartId
                  }
                });

              case 19:
                return _context8.abrupt('return', res.status(200).json({
                  "message": "Đã xóa item khỏi giỏ hàng của bạn!"
                }));

              case 22:
                _context8.prev = 22;
                _context8.t0 = _context8['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context8.t0
                });

              case 25:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 22]]);
      }));

      function removeProduct(_x14, _x15) {
        return _ref8.apply(this, arguments);
      }

      return removeProduct;
    }()
  }]);

  return ShoppingCartController;
}();

exports.default = ShoppingCartController;