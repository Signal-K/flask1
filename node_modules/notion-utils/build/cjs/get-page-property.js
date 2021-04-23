"use strict";
exports.__esModule = true;
exports.getPageProperty = void 0;
var get_text_content_1 = require("./get-text-content");
/**
 * Gets the value of a collection property for a given page (collection item).
 *
 * TODO: handle non-text property types.
 */
function getPageProperty(propertyName, block, recordMap) {
    var _a;
    if (!block.properties) {
        // TODO: check parent page?
        return null;
    }
    var collection = (_a = recordMap.collection[block.parent_id]) === null || _a === void 0 ? void 0 : _a.value;
    if (collection) {
        var propertyId = Object.keys(collection.schema).find(function (key) { var _a; return ((_a = collection.schema[key]) === null || _a === void 0 ? void 0 : _a.name) === propertyName; });
        if (propertyId) {
            return get_text_content_1.getTextContent(block.properties[propertyId]);
        }
    }
    return null;
}
exports.getPageProperty = getPageProperty;
//# sourceMappingURL=get-page-property.js.map