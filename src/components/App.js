"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = require("react");
var parser_1 = require("../functions/parser");
var lodash_1 = require("lodash");
function App(_a) {
    var obsidianApi = _a.obsidianApi;
    var apiKey = obsidianApi.settings.apiKey;
    (0, react_1.useEffect)(function () { }, [apiKey]);
    if (!apiKey)
        return (<div>
				<p>Please set an API key before adding files.</p>
				<h2>Steps:</h2>
				<ol>
					<li>
						Go to{' '}
						<a href="https://www.notion.so/my-integrations">
							the Notion integrations website
						</a>{' '}
						and click "Create New Integration."
					</li>
					<li>Name it "Notion Sync." The logo is not necessary.</li>
					<li>
						Copy the "Internal Integration Secret" and paste it into
						the "Api Key" setting above.
					</li>
				</ol>
			</div>);
    return (<div className="font-regular">
			{lodash_1.default.sortBy(Object.values(obsidianApi.databases), function (database) {
            return (0, parser_1.parseTitle)(database);
        }).map(function (database) {
            var _a, _b;
            var title = (0, parser_1.parseTitle)(database);
            return (<div className="mb-1 flex">
						<div className="w-1/2 flex-none">{title}</div>
						<input defaultValue={(_b = (_a = obsidianApi.settings.files[database.id]) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : ''} className="w-1/2" type="text" spellCheck="false" placeholder="no folder selected" onBlur={function (ev) {
                    return obsidianApi.updateFile(database.id, {
                        path: ev.target.value,
                    });
                }}></input>
					</div>);
        })}
		</div>);
}
