"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mid_1 = __importDefault(require("./mid"));
var dog = express_1.default.Router();
dog.get('/', mid_1.default, function (req, res) {
    res.send('Dog page');
});
exports.default = dog;
