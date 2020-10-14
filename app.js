"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var rp = __importStar(require("request-promise"));
var cheerio_1 = __importDefault(require("cheerio"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var moment_1 = __importDefault(require("moment"));
var items = [
    // {
    //   uri: 'https://www.roguefitness.com/rogue-45lb-ohio-power-bar-black-zinc',
    //   selector: '.btn-add-to-cart'
    // },
    // {
    //   uri: 'https://www.roguefitness.com/rogue-45lb-ohio-power-bar-stainless',
    //   selector: '.btn-add-to-cart'
    // },
    {
        uri: 'https://www.roguefitness.com/monsterlite-double-change-plate-storage',
        selector: '.btn-add-to-cart'
    },
    {
        uri: 'https://www.roguefitness.com/monster-lite-sandwich-j-cup-pair',
        selector: '.btn-add-to-cart'
    },
    // {
    //   uri: 'https://www.roguefitness.com/horizontal-plate-rack-2-0',
    //   selector: '.btn-add-to-cart'
    // },
    {
        uri: 'https://www.roguefitness.com/rogue-competition-bumper-plate-cart',
        selector: '.btn-add-to-cart'
    },
    {
        uri: 'https://www.roguefitness.com/rogue-echo-bumper-plates-with-white-text',
        // selector: '.btn-add-to-cart'
        selector: 'div.grouped-item div.input-text.item-qty',
        text: '45LB Rogue Echo Pair V2'
    },
    {
        uri: 'https://www.roguefitness.com/rogue-lb-change-plates',
        selector: '.btn-add-to-cart'
    }
];
var TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
var log = function (message, error) {
    console.log("[" + moment_1.default().format(TIMESTAMP_FORMAT) + "] " + (message || error));
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transporter;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'rogue.notifier.ss@gmail.com',
                    pass: ''
                }
            });
            // check every 30 seconds
            setInterval(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _loop_1, _i, items_1, item;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                log("checking product stock...");
                                _loop_1 = function (item) {
                                    var page, $, elementExists, textElement, itemName;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, rp.get(item.uri).catch(function (error) {
                                                    log(error && error.message ? error.message : error);
                                                })];
                                            case 1:
                                                page = _a.sent();
                                                $ = cheerio_1.default.load(page);
                                                if ($) {
                                                    elementExists = false;
                                                    if (item.text) {
                                                        textElement = $(item.selector)
                                                            .parent('.grouped-item-row')
                                                            .find('.item-name').filter(function (index, el) {
                                                            return $(el).text().trim() === item.text;
                                                        });
                                                        elementExists = !!textElement.get(0);
                                                    }
                                                    else {
                                                        elementExists = !!$(item.selector).get(0);
                                                    }
                                                    if (elementExists) {
                                                        itemName = item.text ? item.text : item.uri;
                                                        log("found product " + itemName);
                                                        transporter.sendMail({
                                                            priority: 'high',
                                                            from: '"Rogue Notifier" <rogue.notifier.ss@gmail.com>',
                                                            to: 'srstedman@gmail.com',
                                                            subject: "Back In Stock Alert: " + itemName,
                                                            text: "Rogue product back in stock! " + itemName,
                                                            html: "Rogue product back in stock! <a href=" + item.uri + ">" + itemName + "</a>"
                                                        });
                                                    }
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                _i = 0, items_1 = items;
                                _a.label = 1;
                            case 1:
                                if (!(_i < items_1.length)) return [3 /*break*/, 4];
                                item = items_1[_i];
                                return [5 /*yield**/, _loop_1(item)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }, 30000);
            return [2 /*return*/];
        });
    });
}
main();
