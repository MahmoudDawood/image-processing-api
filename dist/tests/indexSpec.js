"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var fs_1 = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
describe("Testing all endpoints", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        beforeAll(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_1.promises.mkdir((path_1.default.join(__dirname, '../../thumb')))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        afterAll(function () {
            fs_1.default.rmSync(path_1.default.join(__dirname, '../../thumb'), { recursive: true, force: true });
        });
        it("Runs server entry point", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/')
                        // Assert
                        // console.log(response)
                    ];
                    case 1:
                        response = _a.sent();
                        // Assert
                        // console.log(response)
                        expect(response.text).toBe('Welcome to image processing API');
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Runs api endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/api')
                        // Assert
                    ];
                    case 1:
                        response = _a.sent();
                        // Assert
                        expect(response.text).toBe('Routing station');
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Creates resized image", function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/images?filename=fjord&width=1000&height=1000";
                        return [4 /*yield*/, request.get(url)
                            // Assert
                        ];
                    case 1:
                        response = _a.sent();
                        // Assert
                        expect(response.status).toBe(201);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Retrieves previously cached image", function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/images?filename=fjord&width=1000&height=1000";
                        return [4 /*yield*/, request.get(url)
                            // Assert
                        ];
                    case 1:
                        response = _a.sent();
                        // Assert
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Requires all params with acceptable values", function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, url2, response, response2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/images?filename=fjord" // missing params
                        ;
                        url2 = "/api/images?filename=fjord&width=1000&height=hello" // wrong param value
                        ;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, request.get(url2)
                            // Assert
                        ];
                    case 2:
                        response2 = _a.sent();
                        // Assert
                        expect(response.text).toBe('Please re-check your parameters.');
                        expect(response.status).toBe(400);
                        expect(response2.text).toBe('Please re-check your parameters.');
                        expect(response2.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Requires all params to have truthy values", function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, url2, response, response2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/images?filename=fjord&width=1000&height" // missing hight value
                        ;
                        url2 = "/api/images?filename=&width&height=1000" // missing height and name
                        ;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, request.get(url2)
                            // Assert
                        ];
                    case 2:
                        response2 = _a.sent();
                        // Assert
                        expect(response.text).toBe('height parameter is required to resize');
                        expect(response.status).toBe(400);
                        expect(response2.text).toBe('filename parameter is required to resize');
                        expect(response2.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Requires an existent image name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/images?filename=non-existent-img&width=10&height=10" // non existent img
                        ;
                        return [4 /*yield*/, request.get(url)
                            // Assert
                        ];
                    case 1:
                        response = _a.sent();
                        // Assert
                        expect(response.text).toBe('Specified image not found');
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
