import isUrl from 'is-url-superb';
export var cs = function () {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(function (a) { return !!a; }).join(' ');
};
export { isUrl };
var groupBlockContent = function (blockMap) {
    var output = [];
    var lastType = undefined;
    var index = -1;
    Object.keys(blockMap).forEach(function (id) {
        var _a, _b;
        var blockValue = (_a = blockMap[id]) === null || _a === void 0 ? void 0 : _a.value;
        if (blockValue) {
            (_b = blockValue.content) === null || _b === void 0 ? void 0 : _b.forEach(function (blockId) {
                var _a, _b;
                var blockType = (_b = (_a = blockMap[blockId]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.type;
                if (blockType && blockType !== lastType) {
                    index++;
                    lastType = blockType;
                    output[index] = [];
                }
                output[index].push(blockId);
            });
        }
        lastType = undefined;
    });
    return output;
};
export var getListNumber = function (blockId, blockMap) {
    var groups = groupBlockContent(blockMap);
    var group = groups.find(function (g) { return g.includes(blockId); });
    if (!group) {
        return;
    }
    return group.indexOf(blockId) + 1;
};
export var defaultMapImageUrl = function (url, block) {
    if (!url) {
        return null;
    }
    if (url.startsWith('data:')) {
        return url;
    }
    if (url.startsWith('/images')) {
        url = "https://www.notion.so" + url;
    }
    // more recent versions of notion don't proxy unsplash images
    if (!url.startsWith('https://images.unsplash.com')) {
        url = "https://www.notion.so" + (url.startsWith('/image') ? url : "/image/" + encodeURIComponent(url));
        var notionImageUrlV2 = new URL(url);
        var table = block.parent_table === 'space' ? 'block' : block.parent_table;
        if (table === 'collection') {
            table = 'block';
        }
        notionImageUrlV2.searchParams.set('table', table);
        notionImageUrlV2.searchParams.set('id', block.id);
        notionImageUrlV2.searchParams.set('cache', 'v2');
        url = notionImageUrlV2.toString();
    }
    return url;
};
export var defaultMapPageUrl = function (rootPageId) { return function (pageId) {
    pageId = (pageId || '').replace(/-/g, '');
    if (rootPageId && pageId === rootPageId) {
        return '/';
    }
    else {
        return "/" + pageId;
    }
}; };
var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
export var formatDate = function (input) {
    var date = new Date(input);
    var month = date.getMonth();
    return months[month] + " " + date.getDate() + ", " + date.getFullYear();
};
//# sourceMappingURL=utils.js.map