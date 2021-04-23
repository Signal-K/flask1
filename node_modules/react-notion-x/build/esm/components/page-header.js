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
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getBlockTitle, getBlockIcon, getBlockParentPage } from 'notion-utils';
import { useNotionContext } from '../context';
import { PageIcon } from './page-icon';
import { SearchIcon } from '../icons/search-icon';
import { cs } from '../utils';
import { SearchDialog } from './search-dialog';
export var PageHeader = function () {
    var _a;
    var _b = useNotionContext(), components = _b.components, recordMap = _b.recordMap, rootPageId = _b.rootPageId, mapPageUrl = _b.mapPageUrl, searchNotion = _b.searchNotion;
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
        var title = getBlockTitle(block, recordMap);
        var icon = getBlockIcon(block, recordMap);
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
        var parentBlock = getBlockParentPage(block, recordMap);
        var parentId = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.id;
        if (!parentId) {
            break;
        }
        currentPageId = parentId;
    } while (true);
    breadcrumbs.reverse();
    var _c = React.useState(false), isSearchOpen = _c[0], setIsSearchOpen = _c[1];
    var onOpenSearch = React.useCallback(function () {
        setIsSearchOpen(true);
    }, []);
    var onCloseSearch = React.useCallback(function () {
        setIsSearchOpen(false);
    }, []);
    useHotkeys('cmd+p', function (event) {
        onOpenSearch();
        event.preventDefault();
        event.stopPropagation();
    });
    return (React.createElement("header", { className: 'notion-header' },
        isSearchOpen && hasSearch && (React.createElement(SearchDialog, { isOpen: isSearchOpen, rootBlockId: rootPageId || activePageId, onClose: onCloseSearch, searchNotion: searchNotion })),
        React.createElement("div", { className: 'nav-header' },
            React.createElement("div", { className: 'breadcrumbs' }, breadcrumbs.map(function (breadcrumb, index) {
                var pageLinkProps = {};
                var componentMap = {
                    pageLink: components.pageLink
                };
                if (breadcrumb.active) {
                    componentMap.pageLink = function (props) { return React.createElement("div", __assign({}, props)); };
                }
                else {
                    pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
                }
                return (React.createElement(React.Fragment, { key: breadcrumb.pageId },
                    React.createElement(componentMap.pageLink, __assign({ className: cs('breadcrumb', breadcrumb.active && 'active') }, pageLinkProps),
                        breadcrumb.icon && (React.createElement(PageIcon, { className: 'icon', block: breadcrumb.block })),
                        breadcrumb.title && (React.createElement("span", { className: 'title' }, breadcrumb.title))),
                    index < breadcrumbs.length - 1 && (React.createElement("span", { className: 'spacer' }, "/"))));
            })),
            React.createElement("div", { className: 'rhs' }, hasSearch && (React.createElement("div", { role: 'button', className: cs('breadcrumb', 'button', 'notion-search-button'), onClick: onOpenSearch },
                React.createElement(SearchIcon, { className: 'searchIcon' }),
                React.createElement("span", { className: 'title' }, "Search")))))));
};
//# sourceMappingURL=page-header.js.map