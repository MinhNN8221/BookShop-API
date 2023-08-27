'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('dotenv/config');

var _util = require('../../helpers/util');

var _util2 = _interopRequireDefault(_util);

var _sequelize = require('sequelize');

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorResponse = _util2.default.errorResponse;
var Category = _models2.default.Category;

var CategoryController = function () {
    function CategoryController() {
        _classCallCheck(this, CategoryController);
    }

    _createClass(CategoryController, null, [{
        key: 'getHotCategories',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                var categoriesQuery, categories, totalCategories;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                categoriesQuery = {
                                    limit: 8
                                };
                                _context.next = 4;
                                return Category.findAll(categoriesQuery);

                            case 4:
                                categories = _context.sent;
                                _context.next = 7;
                                return Category.count();

                            case 7:
                                totalCategories = _context.sent;
                                return _context.abrupt('return', res.status(200).json({
                                    count: totalCategories,
                                    rows: categories
                                }));

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](0);

                                res.status(500).json({
                                    error: 'Internal Server Error'
                                });

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 11]]);
            }));

            function getHotCategories(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return getHotCategories;
        }()
    }, {
        key: 'getAllCategories',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
                var categoriesQuery, categories, totalCategories;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                categoriesQuery = {};
                                _context2.next = 4;
                                return Category.findAll(categoriesQuery);

                            case 4:
                                categories = _context2.sent;
                                _context2.next = 7;
                                return Category.count();

                            case 7:
                                totalCategories = _context2.sent;
                                return _context2.abrupt('return', res.status(200).json({
                                    count: totalCategories,
                                    rows: categories
                                }));

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2['catch'](0);

                                res.status(500).json({
                                    error: 'Internal Server Error'
                                });

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 11]]);
            }));

            function getAllCategories(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return getAllCategories;
        }()
    }]);

    return CategoryController;
}();

exports.default = CategoryController;