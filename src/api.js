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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var obsidian_1 = require("obsidian");
var tiny_invariant_1 = require("tiny-invariant");
var parser_1 = require("./functions/parser");
var luxon_1 = require("luxon");
var lodash_1 = require("lodash");
var obsidian_dataview_1 = require("obsidian-dataview");
var client_1 = require("react-dom/client");
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api(app, settings, setSetting) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this.settings = settings;
        _this.setSetting = setSetting;
        _this.people = {};
        _this.pages = {};
        _this.load();
        return _this;
    }
    Api.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadDatabases()];
                    case 1:
                        _a.databases = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.sync = function (force) {
        return __awaiter(this, void 0, void 0, function () {
            var loadedDatabases, promises, _i, loadedDatabases_1, database, modal_1, content_1, SyncStatus_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        new obsidian_1.Notice('Notion Sync: syncing...');
                        this.progress = {
                            failed: [],
                            conflicting: [],
                            uploaded: [],
                            downloaded: [],
                            skipped: [],
                        };
                        loadedDatabases = Object.values(this.databases).filter(function (db) { var _a; return (_a = _this.settings.files[db.id]) === null || _a === void 0 ? void 0 : _a.path; });
                        promises = [];
                        for (_i = 0, loadedDatabases_1 = loadedDatabases; _i < loadedDatabases_1.length; _i++) {
                            database = loadedDatabases_1[_i];
                            promises.push(this.syncDatabase(database.id, force));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        this.setSetting({ lastSync: Date.now() });
                        new obsidian_1.Notice("Sync successful.\nDownloaded: ".concat(this.progress.downloaded.length, "\nUploaded: ").concat(this.progress.uploaded.length, "\nSkipped: ").concat(this.progress.skipped.length, "\nCheck console for details."));
                        if (this.progress.conflicting.length > 0) {
                            modal_1 = new obsidian_1.Modal(this.app);
                            content_1 = (0, client_1.createRoot)(modal_1.contentEl);
                            SyncStatus_1 = function (conflicting) {
                                return (<>
            <div>Conflicts:</div>
            <div>
              {conflicting.map(function (conflict, i) { return (<div className='flex w-full items-center space-x-2'>
                  <p key={conflict.tFile.path}>{conflict.tFile.basename}</p>
                  <div className='grow'/>
                  <button onClick={function () { return __awaiter(_this, void 0, void 0, function () {
                                            var newConflicting;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.uploadFile(conflict.tFile, conflict.page.id)];
                                                    case 1:
                                                        _a.sent();
                                                        newConflicting = conflicting
                                                            .slice(0, i)
                                                            .concat(conflicting.slice(i + 1));
                                                        if (newConflicting.length === 0) {
                                                            modal_1.close();
                                                            new obsidian_1.Notice('All conflicts resolved.');
                                                        }
                                                        else
                                                            content_1.render(SyncStatus_1(newConflicting));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }}>
                    upload
                  </button>
                  <button onClick={function () { return __awaiter(_this, void 0, void 0, function () {
                                            var newConflicting;
                                            var _a, _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0: return [4 /*yield*/, this.downloadPage(conflict.page, conflict.tFile, (_b = (_a = conflict.tFile.parent) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '/')];
                                                    case 1:
                                                        _c.sent();
                                                        newConflicting = conflicting
                                                            .slice(0, i)
                                                            .concat(conflicting.slice(i + 1));
                                                        if (newConflicting.length === 0) {
                                                            modal_1.close();
                                                            new obsidian_1.Notice('All conflicts resolved.');
                                                        }
                                                        else
                                                            content_1.render(SyncStatus_1(newConflicting));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }}>
                    download
                  </button>
                </div>); })}
            </div>
            <div>
              These files have been modified in both Notion and Obsidian; please
              fix by using "upload" or "download" after reviewing the
              differences.
            </div>
          </>);
                            };
                            content_1.render(SyncStatus_1(__spreadArray([], this.progress.conflicting, true)));
                            modal_1.onClose = function () {
                                content_1.unmount();
                            };
                            modal_1.open();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.createFile = function (givenPath) {
        return __awaiter(this, void 0, void 0, function () {
            var path, writeFile, folders, currentFolder, i, folderVault, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = (0, obsidian_1.normalizePath)(givenPath + '.md').replace(/:/g, ' -');
                        writeFile = app.vault.getAbstractFileByPathInsensitive(path);
                        if (!!(writeFile instanceof obsidian_1.TFile)) return [3 /*break*/, 8];
                        folders = path.split('/').slice(0, -1);
                        currentFolder = '';
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < folders.length)) return [3 /*break*/, 6];
                        currentFolder += '/' + folders[i];
                        folderVault = this.app.vault.getAbstractFileByPathInsensitive((0, obsidian_1.normalizePath)(currentFolder));
                        if (!!(folderVault instanceof obsidian_1.TFolder)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.app.vault.createFolder(currentFolder)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.warn('error:', err_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [4 /*yield*/, this.app.vault.create(path, '')];
                    case 7:
                        writeFile = _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, writeFile];
                }
            });
        });
    };
    Api.prototype.getPerson = function (personId) {
        return __awaiter(this, void 0, void 0, function () {
            var person;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.people[personId])
                            return [2 /*return*/, this.people[personId]];
                        return [4 /*yield*/, this.request({
                                url: "https://api.notion.com/v1/users/".concat(personId),
                            })];
                    case 1:
                        person = _a.sent();
                        this.people[personId] = person;
                        return [2 /*return*/, person];
                }
            });
        });
    };
    Api.prototype.getPage = function (pageId_1) {
        return __awaiter(this, arguments, void 0, function (pageId, skipCache) {
            var page;
            if (skipCache === void 0) { skipCache = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pages[pageId] && !skipCache)
                            return [2 /*return*/, this.pages[pageId]];
                        return [4 /*yield*/, this.request({
                                url: "https://api.notion.com/v1/pages/".concat(pageId),
                            })];
                    case 1:
                        page = (_a.sent());
                        this.pages[pageId] = page;
                        return [2 /*return*/, page];
                }
            });
        });
    };
    Api.prototype.uploadFile = function (tFile_1, page_id_1) {
        return __awaiter(this, arguments, void 0, function (tFile, page_id, skipProgress) {
            var page, _a, nameKey, name;
            var _this = this;
            if (skipProgress === void 0) { skipProgress = false; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPage(page_id)];
                    case 1:
                        page = _b.sent();
                        _a = (0, parser_1.parsePageTitle)(page), nameKey = _a[0], name = _a[1];
                        return [4 /*yield*/, this.app.fileManager.processFrontMatter(tFile, function (frontmatter) {
                                var _a;
                                var notionProperties = {};
                                for (var _i = 0, _b = Object.keys(frontmatter).filter(function (key) { return page.properties[key] !== undefined; }); _i < _b.length; _i++) {
                                    var key = _b[_i];
                                    var parsedProperty = (0, parser_1.yamlToNotion)(page.properties[key].type, frontmatter[key]);
                                    if (parsedProperty !== undefined &&
                                        !lodash_1.default.isEqual(parsedProperty, page.properties[key][page.properties[key].type])) {
                                        notionProperties[key] = (_a = {},
                                            _a[page.properties[key].type] = parsedProperty,
                                            _a);
                                    }
                                }
                                if (name !== tFile.basename) {
                                    notionProperties[nameKey] = {
                                        title: [{ text: { content: tFile.basename } }],
                                    };
                                }
                                if ((lodash_1.default.keys(notionProperties).length = 0)) {
                                    _this.progress.skipped.push(tFile.path);
                                    return;
                                }
                                _this.request({
                                    url: "https://api.notion.com/v1/pages/".concat(page.id),
                                    method: 'PATCH',
                                    body: {
                                        properties: notionProperties,
                                    },
                                }).catch(function (err) {
                                    console.error('error:', "https://api.notion.com/v1/pages/".concat(page.id), {
                                        properties: notionProperties,
                                    });
                                });
                            })];
                    case 2:
                        _b.sent();
                        if (!skipProgress)
                            this.progress.uploaded.push(name);
                        console.info('uploaded', name);
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.downloadPage = function (page_1, tFile_1, path_1) {
        return __awaiter(this, arguments, void 0, function (page, tFile, path, skipProgress) {
            var _a, nameKey, name, convertedProperties, _b, _c;
            var _d;
            if (skipProgress === void 0) { skipProgress = false; }
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = (0, parser_1.parsePageTitle)(page), nameKey = _a[0], name = _a[1];
                        if (!!(tFile instanceof obsidian_1.TFile)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createFile(path + '/' + name)];
                    case 1:
                        tFile = _e.sent();
                        _e.label = 2;
                    case 2:
                        (0, tiny_invariant_1.default)(tFile instanceof obsidian_1.TFile);
                        if (!(tFile.basename !== name)) return [3 /*break*/, 4];
                        console.log('mismatch names', tFile.basename, name);
                        return [4 /*yield*/, this.app.vault.rename(tFile, ((_d = tFile.parent) === null || _d === void 0 ? void 0 : _d.path) + '/' + name + '.md')];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _c = (_b = Object).entries;
                        return [4 /*yield*/, this.notionToYaml(page)];
                    case 5:
                        convertedProperties = _c.apply(_b, [_e.sent()]);
                        return [4 /*yield*/, this.app.fileManager.processFrontMatter(tFile, function (frontmatter) {
                                for (var _i = 0, convertedProperties_1 = convertedProperties; _i < convertedProperties_1.length; _i++) {
                                    var _a = convertedProperties_1[_i], key = _a[0], value = _a[1];
                                    if (value === name)
                                        continue;
                                    frontmatter[key] = value;
                                }
                                frontmatter['Notion ID'] = page.id;
                            })];
                    case 6:
                        _e.sent();
                        if (!skipProgress)
                            this.progress.downloaded.push(name);
                        console.info('downloaded', name);
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.notionToYaml = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var yamlProperties, _i, _a, _b, propertyKey, property, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        yamlProperties = {};
                        _i = 0, _a = Object.entries(page.properties);
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], propertyKey = _b[0], property = _b[1];
                        _c = yamlProperties;
                        _d = propertyKey;
                        return [4 /*yield*/, this.parseProperty(property)];
                    case 2:
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, yamlProperties];
                }
            });
        });
    };
    Api.prototype.parseProperty = function (property) {
        return __awaiter(this, void 0, void 0, function () {
            var fromISO, parseDate, _a, _b, name_1;
            var _this = this;
            var _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        fromISO = function (string) { return string.slice(0, 16); };
                        parseDate = function (date) {
                            return !date
                                ? ''
                                : date.end
                                    ? {
                                        start: fromISO(date.start),
                                        end: fromISO(date.end),
                                    }
                                    : fromISO(date.start);
                        };
                        _a = property.type;
                        switch (_a) {
                            case 'checkbox': return [3 /*break*/, 1];
                            case 'created_by': return [3 /*break*/, 2];
                            case 'last_edited_by': return [3 /*break*/, 2];
                            case 'date': return [3 /*break*/, 4];
                            case 'email': return [3 /*break*/, 5];
                            case 'files': return [3 /*break*/, 6];
                            case 'formula': return [3 /*break*/, 7];
                            case 'last_edited_time': return [3 /*break*/, 8];
                            case 'created_time': return [3 /*break*/, 8];
                            case 'multi_select': return [3 /*break*/, 9];
                            case 'number': return [3 /*break*/, 10];
                            case 'people': return [3 /*break*/, 11];
                            case 'phone_number': return [3 /*break*/, 13];
                            case 'url': return [3 /*break*/, 13];
                            case 'relation': return [3 /*break*/, 14];
                            case 'rich_text': return [3 /*break*/, 16];
                            case 'title': return [3 /*break*/, 16];
                            case 'rollup': return [3 /*break*/, 17];
                            case 'select': return [3 /*break*/, 22];
                            case 'status': return [3 /*break*/, 23];
                            case 'unique_id': return [3 /*break*/, 24];
                            case 'verification': return [3 /*break*/, 25];
                        }
                        return [3 /*break*/, 26];
                    case 1: return [2 /*return*/, property.checkbox ? true : false];
                    case 2: return [4 /*yield*/, this.getPerson(property[property.type].id)];
                    case 3: return [2 /*return*/, (_m.sent()).name];
                    case 4: return [2 /*return*/, parseDate(property.date)];
                    case 5: return [2 /*return*/, (_c = property.email) !== null && _c !== void 0 ? _c : ''];
                    case 6: return [2 /*return*/, property.files.map(function (file) { return file.name; })];
                    case 7:
                        switch (property.formula.type) {
                            case 'boolean':
                                return [2 /*return*/, property.formula ? 'true' : 'false'];
                            case 'date':
                                return [2 /*return*/, parseDate(property.formula.date)];
                            case 'number':
                                return [2 /*return*/, String(property.formula.number)];
                            case 'string':
                                return [2 /*return*/, (_d = property.formula.string) !== null && _d !== void 0 ? _d : ''];
                        }
                        _m.label = 8;
                    case 8: return [2 /*return*/, fromISO(property[property.type])];
                    case 9: return [2 /*return*/, property.multi_select.map(function (item) { return item.name; })];
                    case 10: return [2 /*return*/, String(property.number)];
                    case 11: return [4 /*yield*/, Promise.all(property.people.map(function (person) { return _this.getPerson(person.id); }))];
                    case 12: return [2 /*return*/, (_m.sent()).map(function (user) { var _a; return (_a = user.name) !== null && _a !== void 0 ? _a : ''; })];
                    case 13: return [2 /*return*/, (_e = property[property.type]) !== null && _e !== void 0 ? _e : ''];
                    case 14: return [4 /*yield*/, Promise.all(property.relation.map(function (value) { return _this.getPage(value.id); }))];
                    case 15: return [2 /*return*/, (_m.sent()).map(function (page) { return '[[' + (0, parser_1.parsePageTitle)(page) + ']]'; })];
                    case 16: return [2 /*return*/, (0, parser_1.parseText)(property[property.type])];
                    case 17:
                        _b = property.rollup.type;
                        switch (_b) {
                            case 'array': return [3 /*break*/, 18];
                            case 'date': return [3 /*break*/, 20];
                            case 'number': return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 22];
                    case 18: return [4 /*yield*/, Promise.all(property.rollup.array.map(function (property) {
                            return _this.parseProperty(__assign(__assign({}, property), { id: '' }));
                        }))];
                    case 19: return [2 /*return*/, _m.sent()];
                    case 20: return [2 /*return*/, parseDate(property.rollup.date)];
                    case 21: return [2 /*return*/, property.rollup.number];
                    case 22:
                        name_1 = (_f = property[property.type]) === null || _f === void 0 ? void 0 : _f.name;
                        return [2 /*return*/, name_1 !== null && name_1 !== void 0 ? name_1 : ''];
                    case 23: return [2 /*return*/, (_h = (_g = property[property.type]) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : ''];
                    case 24: return [2 /*return*/, ((_j = property.unique_id.prefix) !== null && _j !== void 0 ? _j : '' + String(property.unique_id.number))];
                    case 25: return [2 /*return*/, ((_k = property.verification) === null || _k === void 0 ? void 0 : _k.date)
                            ? (_l = parseDate(property.verification.date)) !== null && _l !== void 0 ? _l : ''
                            : ''];
                    case 26: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.syncDatabase = function (databaseId, force) {
        return __awaiter(this, void 0, void 0, function () {
            var database, lastSync, lastSyncISO, pages, newPages, start_cursor, dv, files, uploading, databasePath, _loop_1, this_1, _i, pages_1, page, _loop_2, this_2, _a, uploading_1, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        database = this.settings.files[databaseId];
                        if (!database.path)
                            return [2 /*return*/];
                        lastSync = luxon_1.DateTime.fromMillis(this.settings.lastSync);
                        lastSyncISO = lastSync.toISO();
                        pages = [];
                        start_cursor = undefined;
                        _b.label = 1;
                    case 1: return [4 /*yield*/, this.request({
                            url: "https://api.notion.com/v1/databases/".concat(databaseId, "/query"),
                            method: 'POST',
                            body: {
                                start_cursor: start_cursor,
                                filter: force === 'download'
                                    ? undefined
                                    : {
                                        timestamp: 'last_edited_time',
                                        last_edited_time: {
                                            after: lastSyncISO,
                                        },
                                    },
                            },
                        }).catch(function (err) { return console.warn('error:', err); })];
                    case 2:
                        newPages = _b.sent();
                        start_cursor = newPages['next_cursor'];
                        pages.push.apply(pages, newPages.results);
                        _b.label = 3;
                    case 3:
                        if (newPages['has_more']) return [3 /*break*/, 1];
                        _b.label = 4;
                    case 4:
                        dv = (0, obsidian_dataview_1.getAPI)();
                        if (!dv) {
                            new obsidian_1.Notice('Please install Dataview to use Notion Sync.');
                            throw new Error('Dataview must be installed');
                        }
                        files = dv.pages("\"".concat(database.path, "\""));
                        uploading = force === 'download'
                            ? []
                            : force === 'upload'
                                ? files
                                : files.filter(function (file) { return file.file.mtime > lastSync; });
                        databasePath = (0, obsidian_1.normalizePath)(this.settings.files[databaseId].path) + '/';
                        _loop_1 = function (page) {
                            var pageTitle, file, tFile;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        pageTitle = (0, parser_1.parsePageTitle)(page);
                                        file = files.find(function (file) { return file['Notion ID'] === page.id; });
                                        tFile = this_1.app.vault.getAbstractFileByPathInsensitive(file ? file.file.path : databasePath + pageTitle + '.md');
                                        if (!(force !== 'download' &&
                                            tFile &&
                                            tFile.stat.mtime > this_1.settings.lastSync)) return [3 /*break*/, 1];
                                        this_1.progress.conflicting.push({
                                            page: page,
                                            tFile: tFile,
                                        });
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this_1.downloadPage(page, tFile, database.path)];
                                    case 2:
                                        _c.sent();
                                        _c.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, pages_1 = pages;
                        _b.label = 5;
                    case 5:
                        if (!(_i < pages_1.length)) return [3 /*break*/, 8];
                        page = pages_1[_i];
                        return [5 /*yield**/, _loop_1(page)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        _loop_2 = function (file) {
                            var tFile, page_1;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        tFile = this_2.app.vault.getAbstractFileByPathInsensitive(file.file.path);
                                        (0, tiny_invariant_1.default)(tFile);
                                        if (!!file['Notion ID']) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this_2.request({
                                                url: "https://api.notion.com/v1/pages",
                                                body: {
                                                    parent: { database_id: databaseId },
                                                    properties: {
                                                        Name: {
                                                            title: [{ text: { content: tFile.basename } }],
                                                        },
                                                    },
                                                },
                                                method: 'POST',
                                            })];
                                    case 1:
                                        page_1 = _d.sent();
                                        return [4 /*yield*/, this_2.app.fileManager.processFrontMatter(tFile, function (frontmatter) { return (frontmatter['Notion ID'] = page_1.id); })];
                                    case 2:
                                        _d.sent();
                                        return [4 /*yield*/, this_2.uploadFile(tFile, page_1.id)];
                                    case 3:
                                        _d.sent();
                                        return [3 /*break*/, 6];
                                    case 4: return [4 /*yield*/, this_2.uploadFile(tFile, file['Notion ID'])];
                                    case 5:
                                        _d.sent();
                                        _d.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        _a = 0, uploading_1 = uploading;
                        _b.label = 9;
                    case 9:
                        if (!(_a < uploading_1.length)) return [3 /*break*/, 12];
                        file = uploading_1[_a];
                        return [5 /*yield**/, _loop_2(file)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11:
                        _a++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, obsidian_1.request)(__assign(__assign({}, config), { headers: {
                                Authorization: "Bearer ".concat(this.settings.apiKey),
                                'Notion-Version': '2022-06-28',
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            }, body: config.body ? JSON.stringify(config.body) : undefined })).catch(function (err) {
                            console.warn('error:', err);
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            console.trace();
                            throw 'no result';
                        }
                        return [2 /*return*/, JSON.parse(result)];
                }
            });
        });
    };
    Api.prototype.loadDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var search, databases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            url: 'https://api.notion.com/v1/search',
                            method: 'POST',
                            body: {
                                filter: { property: 'object', value: 'database' },
                            },
                        })];
                    case 1:
                        search = _a.sent();
                        databases = Object.fromEntries(search.results.map(function (database) { return [
                            database.id,
                            database,
                        ]; }));
                        return [2 /*return*/, databases];
                }
            });
        });
    };
    Api.prototype.updateFile = function (id, file) {
        var _a;
        var defaultFile = {
            path: '',
        };
        var oldFile = __assign(__assign({}, defaultFile), this.settings.files[id]);
        this.setSetting({
            files: __assign(__assign({}, this.settings.files), (_a = {}, _a[id] = __assign(__assign({}, this.settings.files[id]), file), _a)),
        });
        if (oldFile.path !== file.path) {
            var oldFileObject = app.vault.getAbstractFileByPath((0, obsidian_1.normalizePath)(oldFile.path + '/' + (0, parser_1.getFileName)(oldFile.path) + '.md'));
            if (oldFileObject && !file.path) {
                this.app.vault.delete(oldFileObject);
            }
            else if (!oldFileObject && file.path) {
                this.createFile(file.path + '/' + (0, parser_1.getFileName)(file.path));
            }
            else if (oldFileObject && file.path) {
                var parent_1 = app.vault.getAbstractFileByPath((0, obsidian_1.normalizePath)(oldFile.path));
                if (!parent_1)
                    return;
                this.app.fileManager.renameFile(oldFileObject, (0, obsidian_1.normalizePath)(file.path + '/' + (0, parser_1.getFileName)(file.path) + '.md'));
                app.vault.rename(parent_1, file.path);
            }
        }
    };
    return Api;
}(obsidian_1.Component));
exports.default = Api;
