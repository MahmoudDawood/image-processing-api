'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var route = express_1.default.Router();
var resize = function () {
  route.get('/', function (req, res, next) {
    console.log(req.query);
    next();
  });
};
exports.default = resize;
