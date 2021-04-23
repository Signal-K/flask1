import React from 'react';
import throttle from 'lodash.throttle';
import { getBlockIcon, getTextContent, getPageTableOfContents, getBlockParentPage, uuidToId } from 'notion-utils';
import { Asset } from './components/asset';
import { Checkbox } from './components/checkbox';
import { PageIcon } from './components/page-icon';
import { PageTitle } from './components/page-title';
import { LinkIcon } from './icons/link-icon';
import { PageHeader } from './components/page-header';
import { GoogleDrive } from './components/google-drive';
import { Audio } from './components/audio';
import { File } from './components/file';
import { Equation } from './components/equation';
import { GracefulImage } from './components/graceful-image';
import { LazyImage } from './components/lazy-image';
import { useNotionContext } from './context';
import { cs, getListNumber, isUrl } from './utils';
import { Text } from './components/text';
var tocIndentLevelCache = {};
export var Block = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    var _12 = useNotionContext(), components = _12.components, fullPage = _12.fullPage, darkMode = _12.darkMode, recordMap = _12.recordMap, mapPageUrl = _12.mapPageUrl, mapImageUrl = _12.mapImageUrl, showTableOfContents = _12.showTableOfContents, minTableOfContentsItems = _12.minTableOfContentsItems, defaultPageIcon = _12.defaultPageIcon, defaultPageCover = _12.defaultPageCover, defaultPageCoverPosition = _12.defaultPageCoverPosition;
    var block = props.block, children = props.children, level = props.level, className = props.className, bodyClassName = props.bodyClassName, footer = props.footer, pageHeader = props.pageHeader, pageFooter = props.pageFooter, pageAside = props.pageAside, pageCover = props.pageCover;
    if (!block) {
        return null;
    }
    // ugly hack to make viewing raw collection views work properly
    // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
    if (level === 0 && block.type === 'collection_view') {
        ;
        block.type = 'collection_view_page';
    }
    var blockId = "notion-block-" + uuidToId(block.id);
    switch (block.type) {
        case 'collection_view_page':
        // fallthrough
        case 'page':
            if (level === 0) {
                var _13 = block.format || {}, _14 = _13.page_icon, page_icon = _14 === void 0 ? defaultPageIcon : _14, _15 = _13.page_cover, page_cover = _15 === void 0 ? defaultPageCover : _15, _16 = _13.page_cover_position, page_cover_position = _16 === void 0 ? defaultPageCoverPosition : _16, page_full_width = _13.page_full_width, page_small_text = _13.page_small_text;
                if (fullPage) {
                    var properties = block.type === 'page'
                        ? block.properties
                        : {
                            title: (_b = (_a = recordMap.collection[block.collection_id]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.name
                        };
                    var coverPosition = (1 - (page_cover_position || 0.5)) * 100;
                    var pageIcon = (_c = getBlockIcon(block, recordMap)) !== null && _c !== void 0 ? _c : defaultPageIcon;
                    var isPageIconUrl = pageIcon && isUrl(pageIcon);
                    var toc = getPageTableOfContents(block, recordMap);
                    var hasToc = showTableOfContents && toc.length >= minTableOfContentsItems;
                    var hasAside = (hasToc || pageAside) && !page_full_width;
                    var _17 = React.useState(null), activeSection_1 = _17[0], setActiveSection_1 = _17[1];
                    var throttleMs = 100;
                    // this scrollspy logic was originally based on
                    // https://github.com/Purii/react-use-scrollspy
                    var actionSectionScrollSpy_1 = throttle(function () {
                        var sections = document.getElementsByClassName('notion-h');
                        var prevBBox = null;
                        var currentSectionId = activeSection_1;
                        for (var i = 0; i < sections.length; ++i) {
                            var section = sections[i];
                            if (!section || !(section instanceof Element))
                                continue;
                            if (!currentSectionId) {
                                currentSectionId = section.getAttribute('data-id');
                            }
                            var bbox = section.getBoundingClientRect();
                            var prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
                            var offset = Math.max(150, prevHeight / 4);
                            // GetBoundingClientRect returns values relative to viewport
                            if (bbox.top - offset < 0) {
                                currentSectionId = section.getAttribute('data-id');
                                prevBBox = bbox;
                                continue;
                            }
                            // No need to continue loop, if last element has been detected
                            break;
                        }
                        setActiveSection_1(currentSectionId);
                    }, throttleMs);
                    if (hasToc) {
                        React.useEffect(function () {
                            window.addEventListener('scroll', actionSectionScrollSpy_1);
                            actionSectionScrollSpy_1();
                            return function () {
                                window.removeEventListener('scroll', actionSectionScrollSpy_1);
                            };
                        }, []);
                    }
                    var hasPageCover = pageCover || page_cover;
                    return (React.createElement("div", { className: cs('notion', 'notion-app', darkMode ? 'dark-mode' : 'light-mode', blockId, className) },
                        React.createElement("div", { className: 'notion-viewport' }),
                        React.createElement("div", { className: 'notion-frame' },
                            React.createElement(PageHeader, null),
                            React.createElement("div", { className: 'notion-page-scroller' },
                                hasPageCover ? (pageCover ? (pageCover) : (React.createElement(LazyImage, { src: mapImageUrl(page_cover, block), alt: getTextContent(properties === null || properties === void 0 ? void 0 : properties.title), className: 'notion-page-cover', style: {
                                        objectPosition: "center " + coverPosition + "%"
                                    } }))) : null,
                                React.createElement("main", { className: cs('notion-page', hasPageCover
                                        ? 'notion-page-has-cover'
                                        : 'notion-page-no-cover', page_icon
                                        ? 'notion-page-has-icon'
                                        : 'notion-page-no-icon', isPageIconUrl
                                        ? 'notion-page-has-image-icon'
                                        : 'notion-page-has-text-icon', 'notion-full-page', page_full_width && 'notion-full-width', page_small_text && 'notion-small-text', bodyClassName) },
                                    page_icon && (React.createElement("div", { className: 'notion-page-icon-wrapper' },
                                        React.createElement(PageIcon, { block: block, defaultIcon: defaultPageIcon }))),
                                    pageHeader,
                                    React.createElement("div", { className: 'notion-title' },
                                        React.createElement(Text, { value: properties === null || properties === void 0 ? void 0 : properties.title, block: block })),
                                    block.type === 'page' &&
                                        block.parent_table === 'collection' && (React.createElement(components.collectionRow, { block: block })),
                                    block.type === 'collection_view_page' && (React.createElement(components.collection, { block: block })),
                                    React.createElement("div", { className: cs('notion-page-content', hasAside && 'notion-page-content-has-aside', hasToc && 'notion-page-content-has-toc') },
                                        React.createElement("article", { className: 'notion-page-content-inner' }, children),
                                        hasAside && (React.createElement("aside", { className: 'notion-aside' },
                                            hasToc && (React.createElement("div", { className: 'notion-aside-table-of-contents' },
                                                React.createElement("div", { className: 'notion-aside-table-of-contents-header' }, "Table of Contents"),
                                                React.createElement("nav", { className: cs('notion-table-of-contents', !darkMode && 'notion-gray') }, toc.map(function (tocItem) {
                                                    var id = uuidToId(tocItem.id);
                                                    return (React.createElement("a", { key: id, href: "#" + id, className: cs('notion-table-of-contents-item', "notion-table-of-contents-item-indent-level-" + tocItem.indentLevel, activeSection_1 === id &&
                                                            'notion-table-of-contents-active-item') },
                                                        React.createElement("span", { className: 'notion-table-of-contents-item-body', style: {
                                                                display: 'inline-block',
                                                                marginLeft: tocItem.indentLevel * 16
                                                            } }, tocItem.text)));
                                                })))),
                                            pageAside))),
                                    pageFooter),
                                footer))));
                }
                else {
                    return (React.createElement("main", { className: cs('notion', darkMode ? 'dark-mode' : 'light-mode', 'notion-page', page_full_width && 'notion-full-width', page_small_text && 'notion-small-text', blockId, className, bodyClassName) },
                        React.createElement("div", { className: 'notion-viewport' }),
                        pageHeader,
                        block.type === 'page' && block.parent_table === 'collection' && (React.createElement(components.collectionRow, { block: block })),
                        block.type === 'collection_view_page' && (React.createElement(components.collection, { block: block })),
                        children,
                        pageFooter));
                }
            }
            else {
                var blockColor_1 = (_d = block.format) === null || _d === void 0 ? void 0 : _d.block_color;
                return (React.createElement(components.pageLink, { className: cs('notion-page-link', blockColor_1 && "notion-" + blockColor_1, blockId), href: mapPageUrl(block.id) },
                    React.createElement(PageTitle, { block: block })));
            }
        case 'header':
        // fallthrough
        case 'sub_header':
        // fallthrough
        case 'sub_sub_header': {
            if (!block.properties)
                return null;
            var blockColor_2 = (_e = block.format) === null || _e === void 0 ? void 0 : _e.block_color;
            var id = uuidToId(block.id);
            var title_1 = getTextContent(block.properties.title) || "Notion Header " + id;
            // we use a cache here because constructing the ToC is non-trivial
            var indentLevel = tocIndentLevelCache[block.id];
            var indentLevelClass = void 0;
            if (indentLevel === undefined) {
                var page = getBlockParentPage(block, recordMap);
                if (page) {
                    var toc = getPageTableOfContents(page, recordMap);
                    var tocItem = toc.find(function (tocItem) { return tocItem.id === block.id; });
                    if (tocItem) {
                        indentLevel = tocItem.indentLevel;
                        tocIndentLevelCache[block.id] = indentLevel;
                    }
                }
            }
            if (indentLevel !== undefined) {
                indentLevelClass = "notion-h-indent-" + indentLevel;
            }
            return (React.createElement("h3", { className: cs(block.type === 'header' && 'notion-h notion-h1', block.type === 'sub_header' && 'notion-h notion-h2', block.type === 'sub_sub_header' && 'notion-h notion-h3', blockColor_2 && "notion-" + blockColor_2, indentLevelClass, blockId), "data-id": id },
                React.createElement("div", { id: id, className: 'notion-header-anchor' }),
                React.createElement("a", { className: 'notion-hash-link', href: "#" + id, title: title_1 },
                    React.createElement(LinkIcon, null)),
                React.createElement("span", { className: 'notion-h-title' },
                    React.createElement(Text, { value: block.properties.title, block: block }))));
        }
        case 'divider':
            return React.createElement("hr", { className: cs('notion-hr', blockId) });
        case 'text':
            if (!block.properties && !((_f = block.content) === null || _f === void 0 ? void 0 : _f.length)) {
                return React.createElement("div", { className: cs('notion-blank', blockId) }, "\u00A0");
            }
            var blockColor = (_g = block.format) === null || _g === void 0 ? void 0 : _g.block_color;
            return (React.createElement("div", { className: cs('notion-text', blockColor && "notion-" + blockColor, blockId) },
                ((_h = block.properties) === null || _h === void 0 ? void 0 : _h.title) && (React.createElement(Text, { value: block.properties.title, block: block })),
                children && React.createElement("div", { className: 'notion-text-children' }, children)));
        case 'bulleted_list':
        // fallthrough
        case 'numbered_list':
            var wrapList = function (content, start) {
                return block.type === 'bulleted_list' ? (React.createElement("ul", { className: cs('notion-list', 'notion-list-disc', blockId) }, content)) : (React.createElement("ol", { start: start, className: cs('notion-list', 'notion-list-numbered', blockId) }, content));
            };
            var output = null;
            if (block.content) {
                output = (React.createElement(React.Fragment, null,
                    block.properties && (React.createElement("li", null,
                        React.createElement(Text, { value: block.properties.title, block: block }))),
                    wrapList(children)));
            }
            else {
                output = block.properties ? (React.createElement("li", null,
                    React.createElement(Text, { value: block.properties.title, block: block }))) : null;
            }
            var isTopLevel = block.type !== ((_k = (_j = recordMap.block[block.parent_id]) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.type);
            var start = getListNumber(block.id, recordMap.block);
            return isTopLevel ? wrapList(output, start) : output;
        case 'tweet':
        // fallthrough
        case 'maps':
        // fallthrough
        case 'pdf':
        // fallthrough
        case 'figma':
        // fallthrough
        case 'typeform':
        // fallthrough
        case 'image':
        // fallthrough
        case 'gist':
        // fallthrough
        case 'embed':
        // fallthrough
        case 'video':
            var value = block;
            return (React.createElement("figure", { className: cs('notion-asset-wrapper', "notion-asset-wrapper-" + block.type, ((_l = block.format) === null || _l === void 0 ? void 0 : _l.block_full_width) && 'notion-asset-wrapper-full', blockId) },
                React.createElement(Asset, { block: block }),
                ((_m = value === null || value === void 0 ? void 0 : value.properties) === null || _m === void 0 ? void 0 : _m.caption) && (React.createElement("figcaption", { className: 'notion-asset-caption' },
                    React.createElement(Text, { value: block.properties.caption, block: block })))));
        case 'drive':
            return (React.createElement(GoogleDrive, { block: block, className: blockId }));
        case 'audio':
            return React.createElement(Audio, { block: block, className: blockId });
        case 'file':
            return React.createElement(File, { block: block, className: blockId });
        case 'equation':
            var math = block.properties.title[0][0];
            if (!math)
                return null;
            return React.createElement(Equation, { math: math, block: true, className: blockId });
        case 'code': {
            if (block.properties.title) {
                var content = block.properties.title[0][0];
                var language = block.properties.language[0][0];
                // TODO: add className
                return (React.createElement(components.code, { key: block.id, language: language || '', code: content }));
            }
            break;
        }
        case 'column_list':
            return React.createElement("div", { className: cs('notion-row', blockId) }, children);
        case 'column':
            // note: notion uses 46px
            var spacerWidth = "min(32px, 4vw)";
            var ratio = ((_o = block.format) === null || _o === void 0 ? void 0 : _o.column_ratio) || 0.5;
            var parent_1 = (_p = recordMap.block[block.parent_id]) === null || _p === void 0 ? void 0 : _p.value;
            var columns = ((_q = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.content) === null || _q === void 0 ? void 0 : _q.length) || Math.max(2, Math.ceil(1.0 / ratio));
            var width = "calc((100% - (" + (columns - 1) + " * " + spacerWidth + ")) * " + ratio + ")";
            var style = { width: width };
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: cs('notion-column', blockId), style: style }, children),
                React.createElement("div", { className: 'notion-spacer' })));
        case 'quote': {
            if (!block.properties)
                return null;
            var blockColor_3 = (_r = block.format) === null || _r === void 0 ? void 0 : _r.block_color;
            return (React.createElement("blockquote", { className: cs('notion-quote', blockColor_3 && "notion-" + blockColor_3, blockId) },
                React.createElement(Text, { value: block.properties.title, block: block })));
        }
        case 'collection_view':
            return React.createElement(components.collection, { block: block, className: blockId });
        case 'callout':
            return (React.createElement("div", { className: cs('notion-callout', ((_s = block.format) === null || _s === void 0 ? void 0 : _s.block_color) &&
                    "notion-" + ((_t = block.format) === null || _t === void 0 ? void 0 : _t.block_color) + "_co", blockId) },
                React.createElement(PageIcon, { block: block }),
                React.createElement("div", { className: 'notion-callout-text' },
                    React.createElement(Text, { value: (_u = block.properties) === null || _u === void 0 ? void 0 : _u.title, block: block }))));
        case 'bookmark':
            var title = getTextContent((_v = block.properties) === null || _v === void 0 ? void 0 : _v.title);
            if (!title) {
                title = getTextContent((_w = block.properties) === null || _w === void 0 ? void 0 : _w.link);
            }
            if (title) {
                if (title.startsWith('http')) {
                    try {
                        var url = new URL(title);
                        title = url.hostname;
                    }
                    catch (err) {
                        // ignore invalid links
                    }
                }
            }
            return (React.createElement("div", { className: 'notion-row' },
                React.createElement(components.link, { target: '_blank', rel: 'noopener noreferrer', className: cs('notion-bookmark', ((_x = block.format) === null || _x === void 0 ? void 0 : _x.block_color) && "notion-" + block.format.block_color, blockId), href: block.properties.link[0][0] },
                    React.createElement("div", null,
                        title && (React.createElement("div", { className: 'notion-bookmark-title' },
                            React.createElement(Text, { value: [[title]], block: block }))),
                        ((_y = block.properties) === null || _y === void 0 ? void 0 : _y.description) && (React.createElement("div", { className: 'notion-bookmark-description' },
                            React.createElement(Text, { value: (_z = block.properties) === null || _z === void 0 ? void 0 : _z.description, block: block }))),
                        React.createElement("div", { className: 'notion-bookmark-link' },
                            ((_0 = block.format) === null || _0 === void 0 ? void 0 : _0.bookmark_icon) && (React.createElement(GracefulImage, { src: (_1 = block.format) === null || _1 === void 0 ? void 0 : _1.bookmark_icon, alt: title, loading: 'lazy' })),
                            React.createElement("div", null,
                                React.createElement(Text, { value: (_2 = block.properties) === null || _2 === void 0 ? void 0 : _2.link, block: block })))),
                    ((_3 = block.format) === null || _3 === void 0 ? void 0 : _3.bookmark_cover) && (React.createElement("div", { className: 'notion-bookmark-image' },
                        React.createElement(GracefulImage, { src: (_4 = block.format) === null || _4 === void 0 ? void 0 : _4.bookmark_cover, alt: getTextContent((_5 = block.properties) === null || _5 === void 0 ? void 0 : _5.title), loading: 'lazy' }))))));
        case 'toggle':
            return (React.createElement("details", { className: cs('notion-toggle', blockId) },
                React.createElement("summary", null,
                    React.createElement(Text, { value: (_6 = block.properties) === null || _6 === void 0 ? void 0 : _6.title, block: block })),
                React.createElement("div", null, children)));
        case 'table_of_contents': {
            var page = getBlockParentPage(block, recordMap);
            if (!page)
                return null;
            var toc = getPageTableOfContents(page, recordMap);
            var blockColor_4 = (_7 = block.format) === null || _7 === void 0 ? void 0 : _7.block_color;
            return (React.createElement("div", { className: cs('notion-table-of-contents', blockColor_4 && "notion-" + blockColor_4, blockId) }, toc.map(function (tocItem) { return (React.createElement("a", { key: tocItem.id, href: "#" + uuidToId(tocItem.id), className: 'notion-table-of-contents-item' },
                React.createElement("span", { className: 'notion-table-of-contents-item-body', style: {
                        display: 'inline-block',
                        marginLeft: tocItem.indentLevel * 24
                    } }, tocItem.text))); })));
        }
        case 'to_do':
            var isChecked = ((_10 = (_9 = (_8 = block.properties) === null || _8 === void 0 ? void 0 : _8.checked) === null || _9 === void 0 ? void 0 : _9[0]) === null || _10 === void 0 ? void 0 : _10[0]) === 'Yes';
            return (React.createElement("div", { className: cs('notion-to-do', blockId) },
                React.createElement("div", { className: 'notion-to-do-item' },
                    React.createElement(Checkbox, { isChecked: isChecked }),
                    React.createElement("div", { className: cs('notion-to-do-body', isChecked && "notion-to-do-checked") },
                        React.createElement(Text, { value: (_11 = block.properties) === null || _11 === void 0 ? void 0 : _11.title, block: block }))),
                React.createElement("div", { className: 'notion-to-do-children' }, children)));
        default:
            if (process.env.NODE_ENV !== 'production') {
                console.log('Unsupported type ' + block.type, JSON.stringify(block, null, 2));
            }
            return React.createElement("div", null);
    }
    return null;
};
//# sourceMappingURL=block.js.map