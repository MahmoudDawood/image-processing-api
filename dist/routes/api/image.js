"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../../utilities/resize"));
var route = express_1.default.Router();
route.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, imageStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filename = req.query.filename;
                width = req.query.width;
                height = req.query.height;
                // Asser that all params have values
                // if(!filename || !width || !height)
                if (filename === '')
                    return [2 /*return*/, res.status(400).send('filename parameter value is required')];
                if (width === '')
                    return [2 /*return*/, res.status(400).send('width parameter value is required')];
                if (height === '')
                    return [2 /*return*/, res.status(400).send('height parameter value is required')];
                if (!(typeof filename === 'string' &&
                    typeof width === 'string' &&
                    typeof height === 'string')) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, resize_1.default)(filename, width, height)];
            case 1:
                imageStatus = _a.sent();
                _a.label = 2;
            case 2:
                // Check returned image object {created, path}
                // Error is thrown
                if (imageStatus === undefined) {
                    res.status(400).send('Please re-check your parameters.');
                }
                // Non-existent image
                else if (imageStatus.created === 0) {
                    res.status(404).send('Specified image not found');
                }
                // Successfully created
                else if (imageStatus.created === 1) {
                    res.status(201).sendFile(imageStatus.path);
                }
                // Successfully retrieved
                else if (imageStatus.created === 2) {
                    res.status(200).sendFile(imageStatus.path);
                }
                // Default
                else
                    res.status(400).send('Please re-check your parameters.');
                return [2 /*return*/];
        }
    });
}); });
exports.default = route;
