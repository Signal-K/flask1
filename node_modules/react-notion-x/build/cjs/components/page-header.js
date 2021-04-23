"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PageHeader = void 0;
var react_1 = __importDefault(require("react"));
var react_hotkeys_hook_1 = require("react-hotkeys-hook");
var notion_utils_1 = require("notion-utils");
var context_1 = require("../context");
var page_icon_1 = require("./page-icon");
var search_icon_1 = require("../icons/search-icon");
var utils_1 = require("../utils");
var search_dialog_1 = require("./search-dialog");
var PageHeader = function () {
    var _a;
    var _b = context_1.useNotionContext(), components = _b.components, recordMap = _b.recordMap, rootPageId = _b.rootPageId, mapPageUrl = _b.mapPageUrl, searchNotion = _b.searchNotion;
    var blockMap = recordMap.block;
    var blockIds = Object.keys(blockMap);
    var activePageId = blockIds[0];
    var hasSearch = !!searchNotion;
    if (!activePageId) {
        return null;
    }
    var breadcrumbs = [];
    var currentPageId = activePageId;
    do {
        var block = (_a = blockMap[currentPageId]) === null || _a === void 0 ? void 0 : _a.value;
        if (!block) {
            break;
        }
        var title = notion_utils_1.getBlockTitle(block, recordMap);
        var icon = notion_utils_1.getBlockIcon(block, recordMap);
        if (!(title || icon)) {
            break;
        }
        breadcrumbs.push({
            block: block,
            active: currentPageId === activePageId,
            pageId: currentPageId,
            title: title,
            icon: icon
        });
        var parentBlock = notion_utils_1.getBlockParentPage(block, recordMap);
        var parentId = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.id;
        if (!parentId) {
            break;
        }
        currentPageId = parentId;
    } while (true);
    breadcrumbs.reverse();
    var _c = react_1["default"].useState(false), isSearchOpen = _c[0], setIsSearchOpen = _c[1];
    var onOpenSearch = react_1["default"].useCallback(function () {
        setIsSearchOpen(true);
    }, []);
    var onCloseSearch = react_1["default"].useCallback(function () {
        setIsSearchOpen(false);
    }, []);
    react_hotkeys_hook_1.useHotkeys('cmd+p', function (event) {
        onOpenSearch();
        event.preventDefault();
        event.stopPropagation();
    });
    return (react_1["default"].createElement("header", { className: 'notion-header' },
        isSearchOpen && hasSearch && (react_1["default"].createElement(search_dialog_1.SearchDialog, { isOpen: isSearchOpen, rootBlockId: rootPageId || activePageId, onClose: onCloseSearch, searchNotion: searchNotion })),
        react_1["default"].createElement("div", { className: 'nav-header' },
            react_1["default"].createElement("div", { className: 'breadcrumbs' }, breadcrumbs.map(function (breadcrumb, index) {
                var pageLinkProps = {};
                var componentMap = {
                    pageLink: components.pageLink
                };
                if (breadcrumb.active) {
                    componentMap.pageLink = function (props) { return react_1["default"].createElement("div", __assign({}, props)); };
                }
                else {
                    pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
                }
                return (react_1["default"].createElement(react_1["default"].Fragment, { key: breadcrumb.pageId },
                    react_1["default"].createElement(componentMap.pageLink, __assign({ className: utils_1.cs('breadcrumb', breadcrumb.active && 'active') }, pageLinkProps),
                        breadcrumb.icon && (react_1["default"].createElement(page_icon_1.PageIcon, { className: 'icon', block: breadcrumb.block })),
                        breadcrumb.title && (react_1["default"].createElement("span", { className: 'title' }, breadcrumb.title))),
                    index < breadcrumbs.length - 1 && (react_1["default"].createElement("span", { className: 'spacer' }, "/"))));
            })),
            react_1["default"].createElement("div", { className: 'rhs' }, hasSearch && (react_1["default"].createElement("div", { role: 'button', className: utils_1.cs('breadcrumb', 'button', 'notion-search-button'), onClick: onOpenSearch },
                react_1["default"].createElement(search_icon_1.SearchIcon, { className: 'searchIcon' }),
                react_1["default"].createElement("span", { className: 'title' }, "Search")))))));
};
exports.PageHeader = PageHeader;
//# sourceMappingURL=page-header.js.map