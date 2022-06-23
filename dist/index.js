"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var app = (0, express_1.default)();
var PORT = 3000;
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.send('Welcome to image processing API');
});
app.listen(PORT, function () {
    console.log("Server is running on PORT ".concat(PORT));
});
exports.default = app;
