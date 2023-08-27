'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('newrelic');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === undefined ? 3000 : _process$env$PORT;


app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _api2.default);

app.listen(PORT, function () {
  console.log('server started at http://localhost:' + PORT);
});

exports.default = app;