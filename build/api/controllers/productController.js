'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

require('dotenv/config');

var _sequelize = require('sequelize');

var _util = require('../../helpers/util');

var _util2 = _interopRequireDefault(_util);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = _models2.default.Product;
var errorResponse = _util2.default.errorResponse,
    truncateDescription = _util2.default.truncateDescription;

/**
 *
 *
 * @export
 * @class ProductController
 * @description Operations on Products
 */

var ProductController = function () {
  function ProductController() {
    _classCallCheck(this, ProductController);
  }

  _createClass(ProductController, null, [{
    key: 'getProductRecommendation',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var query, products, count;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                query = 'CALL catalog_get_product_recommendation()';
                _context.next = 4;
                return _models2.default.sequelize.query(query);

              case 4:
                products = _context.sent;
                count = products.length;
                return _context.abrupt('return', res.status(200).json({
                  count: count,
                  "products": products
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function getProductRecommendation(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getProductRecommendation;
    }()
  }, {
    key: 'getHotProducts',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var query, products, count;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                query = 'CALL catalog_get_hot_products()';
                _context2.next = 4;
                return _models2.default.sequelize.query(query);

              case 4:
                products = _context2.sent;
                count = products.length;
                return _context2.abrupt('return', res.status(200).json({
                  count: count,
                  "products": products
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function getHotProducts(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getHotProducts;
    }()
  }, {
    key: 'getNewProducts',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var query, products, count;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                query = 'CALL catalog_get_new_products()';
                _context3.next = 4;
                return _models2.default.sequelize.query(query);

              case 4:
                products = _context3.sent;
                count = products.length;
                return _context3.abrupt('return', res.status(200).json({
                  count: count,
                  "products": products
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function getNewProducts(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getNewProducts;
    }()

    /**
     * @description -This method returns all products
     * @param {object} req - The request payload
     * @param {object} res - The response payload sent back from the method
     * @returns {object} - number of total products
     */

  }, {
    key: 'getAllProducts',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$query, descriptionLength, limit, page, productsQuery, products, totalProducts;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _req$query = req.query, descriptionLength = _req$query.description_length, limit = _req$query.limit, page = _req$query.page;
                productsQuery = {
                  limit: parseInt(limit) || 20,
                  offset: parseInt(limit || 20) * (parseInt(page) - 1) || 0
                };
                _context4.next = 5;
                return Product.findAll(productsQuery);

              case 5:
                products = _context4.sent;


                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                _context4.next = 9;
                return Product.count();

              case 9:
                totalProducts = _context4.sent;
                return _context4.abrupt('return', res.status(200).json({
                  count: totalProducts,
                  rows: products
                }));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function getAllProducts(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getAllProducts;
    }()

    /**
     * @description -This method views a single product
     * @param {object} req - The request payload
     * @param {object} res - The response payload sent back from the method
     * @returns {object} - product
     */

  }, {
    key: 'getSingleProduct',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var productId, customerId, query, products, result, product, supplier, author;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                productId = req.params.product_id;
                customerId = req.user.customer_id;

                if (!isNaN(productId)) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', errorResponse(res, 400, 'USR_01', 'Product id must be a number', 'product id'));

              case 5:
                query = 'CALL catalog_get_product_details(:productId,:customerId)';
                _context5.next = 8;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    productId: productId, customerId: customerId
                  }
                });

              case 8:
                products = _context5.sent;
                result = void 0;


                if (products.length > 0) {
                  product = products[0];
                  supplier = {
                    "supplier_id": product.supplier_id,
                    "suppler_name": product.supplier_name
                  };
                  author = {
                    "author_id": product.author_id,
                    "author_name": product.author_name
                  };


                  delete product.author_id;
                  delete product.author_name;
                  delete product.supplier_id;
                  delete product.supplier_name;

                  result = {
                    "product": product,
                    "supplier": supplier,
                    "author": author
                  };
                } else {
                  result = {
                    "product": {},
                    "supplier": {},
                    "author": {}
                  };
                }

                if (!result) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt('return', res.status(200).json(result));

              case 13:
                return _context5.abrupt('return', errorResponse(res, 404, 'PRO_01', 'Product Not found', 'product'));

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context5.t0
                });

              case 19:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 16]]);
      }));

      function getSingleProduct(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getSingleProduct;
    }()

    /**
     * @description -This method search products
     * @param {object} req - The request payload
     * @param {object} res - The response payload sent back from the controller
     * @returns {object} - products
     */

  }, {
    key: 'searchProducts',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var _req$query2, page, limit, descriptionLength, queryString, filterType, priceSortOrder, fQueryString, query, sortOrder, so, products, count;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit, descriptionLength = _req$query2.description_length, queryString = _req$query2.query_string, filterType = _req$query2.filter_type, priceSortOrder = _req$query2.price_sort_order;
                fQueryString = queryString;

                if (!queryString) {
                  fQueryString = "";
                }
                query = {
                  where: _defineProperty({}, _sequelize.Op.or, [{
                    name: _defineProperty({}, _sequelize.Op.like, '%' + fQueryString + '%')
                  }, {
                    description: _defineProperty({}, _sequelize.Op.like, '%' + fQueryString + '%')
                  }])
                };

                //1: Mới nhất, 2: Bán chạy, 3: Giá

                sortOrder = void 0;

                if (filterType == 1) {
                  //Moi nhat
                  sortOrder = [['product_id', 'DESC']];
                } else if (filterType == 2) {
                  //Ban chay
                  sortOrder = [['product_id', 'ASC']];
                } else if (filterType == 3) {
                  so = priceSortOrder;

                  if (!so) {
                    so = 'asc';
                  }

                  if (so == 'asc') {
                    sortOrder = [['discounted_price', 'ASC']];
                  } else {
                    sortOrder = [['discounted_price', 'DESC']];
                  }
                }

                query.limit = parseInt(limit) || 20;
                query.offset = parseInt(limit || 20) * (parseInt(page) - 1) || 0;
                if (sortOrder) {
                  query.order = sortOrder;
                }
                _context6.next = 12;
                return Product.findAll(query);

              case 12:
                products = _context6.sent;

                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                count = products.length;
                return _context6.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 18:
                _context6.prev = 18;
                _context6.t0 = _context6['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error = ' + _context6.t0
                });

              case 21:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 18]]);
      }));

      function searchProducts(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return searchProducts;
    }()
  }, {
    key: 'getAuthorProducts',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$query3, authorId, page, limit, descriptionLength, query, products, count;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _req$query3 = req.query, authorId = _req$query3.author_id, page = _req$query3.page, limit = _req$query3.limit, descriptionLength = _req$query3.description_length;

                if (authorId) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt('return', errorResponse(res, 400, 'USR_01', 'Author Id is required', 'author_id'));

              case 4:
                query = {
                  where: {
                    author_id: _defineProperty({}, _sequelize.Op.eq, authorId)
                  }
                };


                query.limit = parseInt(limit) || 20;
                query.offset = parseInt(limit || 20) * (parseInt(page) - 1) || 0;
                _context7.next = 9;
                return Product.findAll(query);

              case 9:
                products = _context7.sent;

                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                count = products.length;
                return _context7.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 15:
                _context7.prev = 15;
                _context7.t0 = _context7['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context7.t0
                });

              case 18:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 15]]);
      }));

      function getAuthorProducts(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getAuthorProducts;
    }()
  }, {
    key: 'getSupplierProducts',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var _req$query4, supplierId, page, limit, descriptionLength, query, products, count;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _req$query4 = req.query, supplierId = _req$query4.supplier_id, page = _req$query4.page, limit = _req$query4.limit, descriptionLength = _req$query4.description_length;

                if (supplierId) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt('return', errorResponse(res, 400, 'USR_02', 'Supplier Id is required', 'supplier_id'));

              case 4:
                query = {
                  where: {
                    supplier_id: _defineProperty({}, _sequelize.Op.eq, supplierId)
                  }
                };


                query.limit = parseInt(limit) || 20;
                query.offset = parseInt(limit || 20) * (parseInt(page) - 1) || 0;
                _context8.next = 9;
                return Product.findAll(query);

              case 9:
                products = _context8.sent;

                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                count = products.length;
                return _context8.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context8.t0
                });

              case 18:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 15]]);
      }));

      function getSupplierProducts(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return getSupplierProducts;
    }()
  }, {
    key: 'searchAuthorProducts',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var _req$query5, authorId, page, limit, descriptionLength, queryString, query, products, count;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _req$query5 = req.query, authorId = _req$query5.author_id, page = _req$query5.page, limit = _req$query5.limit, descriptionLength = _req$query5.description_length, queryString = _req$query5.query_string;

                if (authorId) {
                  _context9.next = 4;
                  break;
                }

                return _context9.abrupt('return', errorResponse(res, 400, 'USR_02', 'Author Id is required', 'author_id'));

              case 4:
                if (queryString) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt('return', errorResponse(res, 400, 'USR_01', 'Query string is required', 'query_string'));

              case 6:
                query = {
                  where: _defineProperty({}, _sequelize.Op.and, [{
                    author_id: _defineProperty({}, _sequelize.Op.eq, authorId)
                  }, _defineProperty({}, _sequelize.Op.or, [{
                    name: _defineProperty({}, _sequelize.Op.like, '%' + queryString + '%')
                  }, {
                    description: _defineProperty({}, _sequelize.Op.like, '%' + queryString + '%')
                  }])])
                };


                query.limit = parseInt(limit) || 20;
                query.offset = parseInt(limit || 20) * (parseInt(page) - 1) || 0;
                _context9.next = 11;
                return Product.findAll(query);

              case 11:
                products = _context9.sent;

                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                count = products.length;
                return _context9.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 17:
                _context9.prev = 17;
                _context9.t0 = _context9['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context9.t0
                });

              case 20:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 17]]);
      }));

      function searchAuthorProducts(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return searchAuthorProducts;
    }()
  }, {
    key: 'searchProductsInCategory',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var _req$query6, categoryId, query_string, page, _req$query6$limit, limit, _req$query6$descripti, descriptionLength, fQueryString, startIndex, query, products, count;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _req$query6 = req.query, categoryId = _req$query6.category_id, query_string = _req$query6.query_string, page = _req$query6.page, _req$query6$limit = _req$query6.limit, limit = _req$query6$limit === undefined ? 20 : _req$query6$limit, _req$query6$descripti = _req$query6.description_length, descriptionLength = _req$query6$descripti === undefined ? 200 : _req$query6$descripti;

                if (categoryId) {
                  _context10.next = 4;
                  break;
                }

                return _context10.abrupt('return', errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id'));

              case 4:
                if (!isNaN(categoryId)) {
                  _context10.next = 6;
                  break;
                }

                return _context10.abrupt('return', errorResponse(res, 400, 'USR_01', 'Category id must be a number', 'category id'));

              case 6:
                fQueryString = query_string;

                if (!fQueryString) {
                  fQueryString = "";
                }

                startIndex = 0;

                if (page) startIndex = (page - 1) * limit;

                query = 'CALL catalog_search_products_in_category(:fQueryString,:categoryId,:descriptionLength,:limit,:startIndex)';
                _context10.next = 13;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    fQueryString: fQueryString,
                    categoryId: categoryId,
                    descriptionLength: descriptionLength,
                    limit: limit,
                    startIndex: startIndex
                  }
                });

              case 13:
                products = _context10.sent;
                count = products.length;
                return _context10.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 18:
                _context10.prev = 18;
                _context10.t0 = _context10['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 21:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 18]]);
      }));

      function searchProductsInCategory(_x19, _x20) {
        return _ref11.apply(this, arguments);
      }

      return searchProductsInCategory;
    }()
  }, {
    key: 'searchSupplierProducts',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var _req$query7, supplierId, page, limit, descriptionLength, queryString, query, products, count;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _req$query7 = req.query, supplierId = _req$query7.supplier_id, page = _req$query7.page, limit = _req$query7.limit, descriptionLength = _req$query7.description_length, queryString = _req$query7.query_string;

                if (supplierId) {
                  _context11.next = 4;
                  break;
                }

                return _context11.abrupt('return', errorResponse(res, 400, 'USR_01', 'Supplier Id is required', 'supplier_id'));

              case 4:
                if (queryString) {
                  _context11.next = 6;
                  break;
                }

                return _context11.abrupt('return', errorResponse(res, 400, 'USR_01', 'Query string is required', 'query_string'));

              case 6:
                query = {
                  where: _defineProperty({}, _sequelize.Op.and, [{
                    supplier_id: _defineProperty({}, _sequelize.Op.eq, supplierId)
                  }, _defineProperty({}, _sequelize.Op.or, [{
                    name: _defineProperty({}, _sequelize.Op.like, '%' + queryString + '%')
                  }, {
                    description: _defineProperty({}, _sequelize.Op.like, '%' + queryString + '%')
                  }])])
                };


                query.limit = parseInt(limit) || 20;
                query.offset = parseInt(limit || 20) * (parseInt(page) - 1) || 0;
                _context11.next = 11;
                return Product.findAll(query);

              case 11:
                products = _context11.sent;

                if (descriptionLength) {
                  products = truncateDescription(products, descriptionLength);
                }
                count = products.length;
                return _context11.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 17:
                _context11.prev = 17;
                _context11.t0 = _context11['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error e = ' + _context11.t0
                });

              case 20:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 17]]);
      }));

      function searchSupplierProducts(_x21, _x22) {
        return _ref12.apply(this, arguments);
      }

      return searchSupplierProducts;
    }()

    /**
     * @description -This method gets products in a category
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {object} - products in category
     */

  }, {
    key: 'getProductsInCategory',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var categoryId, _req$query8, page, _req$query8$limit, limit, _req$query8$descripti, descriptionLength, startIndex, query, products, count;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                categoryId = req.params.categoryId;

                if (categoryId) {
                  _context12.next = 4;
                  break;
                }

                return _context12.abrupt('return', errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id'));

              case 4:
                if (!isNaN(categoryId)) {
                  _context12.next = 6;
                  break;
                }

                return _context12.abrupt('return', errorResponse(res, 400, 'USR_01', 'Category id must be a number', 'category id'));

              case 6:
                _req$query8 = req.query, page = _req$query8.page, _req$query8$limit = _req$query8.limit, limit = _req$query8$limit === undefined ? 20 : _req$query8$limit, _req$query8$descripti = _req$query8.description_length, descriptionLength = _req$query8$descripti === undefined ? 200 : _req$query8$descripti;
                startIndex = 0;

                if (page) startIndex = (page - 1) * limit;

                query = 'CALL catalog_get_products_in_category(:categoryId,:descriptionLength,:limit,:startIndex)';
                _context12.next = 12;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    categoryId: categoryId,
                    descriptionLength: descriptionLength,
                    limit: limit,
                    startIndex: startIndex
                  }
                });

              case 12:
                products = _context12.sent;
                count = products.length;
                return _context12.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 17:
                _context12.prev = 17;
                _context12.t0 = _context12['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 20:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 17]]);
      }));

      function getProductsInCategory(_x23, _x24) {
        return _ref14.apply(this, arguments);
      }

      return getProductsInCategory;
    }()

    /**
     * @description -This method gets products in a department
     * @param {object} req - The request payload sent from the router
     * @param {object} res - The response payload sent back from the controller
     * @returns {object} - products in department
     */

  }, {
    key: 'getProductsInDepartment',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var departmentId, _req$query9, page, _req$query9$limit, limit, _req$query9$descripti, descriptionLength, startIndex, query, products, count;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                departmentId = req.params.departmentId;

                if (departmentId) {
                  _context13.next = 4;
                  break;
                }

                return _context13.abrupt('return', errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id'));

              case 4:
                if (!isNaN(departmentId)) {
                  _context13.next = 6;
                  break;
                }

                return _context13.abrupt('return', errorResponse(res, 400, 'USR_01', 'department id must be a number', 'department id'));

              case 6:
                _req$query9 = req.query, page = _req$query9.page, _req$query9$limit = _req$query9.limit, limit = _req$query9$limit === undefined ? 20 : _req$query9$limit, _req$query9$descripti = _req$query9.description_length, descriptionLength = _req$query9$descripti === undefined ? 200 : _req$query9$descripti;
                startIndex = 0;

                if (page) startIndex = (page - 1) * limit;

                query = 'CALL catalog_get_products_on_department(:departmentId,:descriptionLength,:limit,:startIndex)';
                _context13.next = 12;
                return _models2.default.sequelize.query(query, {
                  replacements: {
                    departmentId: departmentId,
                    descriptionLength: descriptionLength,
                    limit: limit,
                    startIndex: startIndex
                  }
                });

              case 12:
                products = _context13.sent;
                count = products.length;
                return _context13.abrupt('return', res.status(200).json({
                  count: count,
                  rows: products
                }));

              case 17:
                _context13.prev = 17;
                _context13.t0 = _context13['catch'](0);

                res.status(500).json({
                  error: 'Internal Server Error'
                });

              case 20:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 17]]);
      }));

      function getProductsInDepartment(_x25, _x26) {
        return _ref15.apply(this, arguments);
      }

      return getProductsInDepartment;
    }()
  }]);

  return ProductController;
}();

exports.default = ProductController;