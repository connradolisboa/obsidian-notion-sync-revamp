"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = getFileName;
exports.parseTitle = parseTitle;
exports.yamlToNotion = yamlToNotion;
exports.yamlToMarkdown = yamlToMarkdown;
exports.parsePageTitle = parsePageTitle;
exports.parseText = parseText;
var tiny_invariant_1 = require("tiny-invariant");
function getFileName(path) {
    return path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path;
}
function parseTitle(database) {
    return parseText(database.title);
}
function yamlToNotion(type, property) {
    switch (type) {
        case 'checkbox':
            return property === true
                ? true
                : false;
        case 'date':
            return property
                ? {
                    start: property,
                }
                : undefined;
        case 'email':
            return String(property);
        case 'multi_select':
            return (property instanceof Array
                ? property.map(function (option) { return ({
                    name: option.replace('[[', '').replace(']]', ''),
                }); })
                : property
                    ? [
                        {
                            name: typeof property === 'string'
                                ? property.replace('[[', '').replace(']]', '')
                                : property,
                        },
                    ]
                    : []);
        case 'number':
            return undefined;
        case 'phone_number':
            return String(property);
        case 'select':
            return (property
                ? {
                    name: typeof property === 'string'
                        ? property.replace('[[', '').replace(']]', '')
                        : property,
                }
                : null);
        case 'status':
            return {
                name: property,
            };
        case 'title':
        case 'rich_text':
            return [
                {
                    type: 'text',
                    text: { content: String(property) },
                },
            ];
        case 'unique_id':
            return {
                prefix: '',
                number: typeof property === 'string'
                    ? parseInt(property)
                    : typeof property === 'number'
                        ? property
                        : undefined,
            };
        case 'url':
            return String(property);
        case 'relation':
        case 'verification':
        case 'people':
        case 'rollup':
        case 'last_edited_time':
        case 'files':
        case 'formula':
        case 'last_edited_by':
        case 'created_by':
        case 'created_time':
            return undefined;
    }
}
function yamlToMarkdown(property) {
    switch (typeof property) {
        case 'boolean':
            return property ? 'X' : ' ';
        case 'number':
            return String(property);
        case 'object':
            if (property instanceof Array) {
                return property.join(', ');
            }
            else {
                var propertyString = [];
                for (var _i = 0, _a = Object.entries(property); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    propertyString.push("".concat(key, ": ").concat(yamlToMarkdown(value)));
                }
                return propertyString.join(', ');
            }
        case 'string':
            return property;
    }
}
function parsePageTitle(page) {
    var search = Object.entries(page.properties).find(function (_a) {
        var key = _a[0], property = _a[1];
        return property.type === 'title';
    });
    (0, tiny_invariant_1.default)(search);
    var titleKey = search[0], title = search[1];
    (0, tiny_invariant_1.default)(title.type === 'title');
    return [titleKey, parseText(title.title).replace(/\//g, '-')];
}
function parseText(object) {
    return object.map(function (span) { return span.plain_text; }).join('');
}
