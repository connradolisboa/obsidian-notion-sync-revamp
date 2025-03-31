"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var obsidian_1 = require("obsidian");
var NotionSyncSettingsTab_1 = require("./NotionSyncSettingsTab");
var api_1 = require("./api");
var tiny_invariant_1 = require("tiny-invariant");
var DEFAULT_SETTINGS = {
    files: {},
    apiKey: '',
    lastSync: 0,
    lastConflicts: [],
};
var NotionSync = /** @class */ (function (_super) {
    __extends(NotionSync, _super);
    function NotionSync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotionSync.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()
                        // called from obsidianApi etc.
                    ];
                    case 1:
                        _a.sent();
                        // called from obsidianApi etc.
                        this.setSetting = this.setSetting.bind(this);
                        this.addSettingTab(new NotionSyncSettingsTab_1.default(this));
                        this.api = new api_1.default(this.app, this.settings, this.setSetting);
                        this.addCommand({
                            name: 'Sync',
                            callback: function () { return _this.api.sync(); },
                            id: 'sync',
                        });
                        this.addCommand({
                            name: 'Download all files',
                            id: 'force-download',
                            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.setSetting({ lastSync: 0 });
                                            return [4 /*yield*/, this.api.sync('download')];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        this.addCommand({
                            name: 'Download this file',
                            id: 'force-download-file',
                            editorCallback: function (_editor, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!ctx.file)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.app.fileManager.processFrontMatter(ctx.file, function (frontmatter) { return __awaiter(_this, void 0, void 0, function () {
                                                    var id, page;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                (0, tiny_invariant_1.default)(ctx.file);
                                                                id = frontmatter['Notion ID'];
                                                                if (!id) {
                                                                    new obsidian_1.Notice('No Notion ID property.');
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, this.api.getPage(id, true)];
                                                            case 1:
                                                                page = _a.sent();
                                                                return [4 /*yield*/, this.api.downloadPage(page, ctx.file, ctx.file.path, true)];
                                                            case 2:
                                                                _a.sent();
                                                                new obsidian_1.Notice('Notion sync: downloaded.');
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        this.addCommand({
                            name: 'Upload this file',
                            id: 'force-upload-file',
                            editorCallback: function (_editor, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!ctx.file)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.app.fileManager.processFrontMatter(ctx.file, function (frontmatter) { return __awaiter(_this, void 0, void 0, function () {
                                                    var id;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                (0, tiny_invariant_1.default)(ctx.file);
                                                                id = frontmatter['Notion ID'];
                                                                if (!id) {
                                                                    new obsidian_1.Notice('No Notion ID property.');
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, this.api.uploadFile(ctx.file, id, true)];
                                                            case 1:
                                                                _a.sent();
                                                                new obsidian_1.Notice('Notion sync: uploaded.');
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        this.addCommand({
                            name: 'Upload all files',
                            id: 'force-upload',
                            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.setSetting({ lastSync: 0 });
                                            return [4 /*yield*/, this.api.sync('upload')];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NotionSync.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    NotionSync.prototype.setSetting = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        for (_i = 0, _a = Object.keys(settings); _i < _a.length; _i++) {
                            key = _a[_i];
                            this.settings[key] = settings[key];
                        }
                        return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NotionSync;
}(obsidian_1.Plugin));
exports.default = NotionSync;
