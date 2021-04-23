import React from 'react';
import { Property } from './property';
import { useNotionContext } from '../context';
export var CollectionViewList = function (_a) {
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData;
    var _b = useNotionContext(), components = _b.components, recordMap = _b.recordMap, mapPageUrl = _b.mapPageUrl;
    console.log('list', { collection: collection, collectionView: collectionView, collectionData: collectionData });
    return (React.createElement("div", { className: 'notion-list-collection' },
        React.createElement("div", { className: 'notion-list-view' },
            React.createElement("div", { className: 'notion-list-body' }, collectionData.blockIds.map(function (blockId) {
                var _a, _b, _c, _d;
                var block = (_a = recordMap.block[blockId]) === null || _a === void 0 ? void 0 : _a.value;
                var titleSchema = collection.schema.title;
                var titleData = (_b = block === null || block === void 0 ? void 0 : block.properties) === null || _b === void 0 ? void 0 : _b.title;
                return (React.createElement(components.pageLink, { className: 'notion-list-item notion-page-link', href: mapPageUrl(block.id), key: blockId },
                    React.createElement("div", { className: 'notion-list-item-title' },
                        React.createElement(Property, { schema: titleSchema, data: titleData, block: block, collection: collection })),
                    React.createElement("div", { className: 'notion-list-item-body' }, (_d = (_c = collectionView.format) === null || _c === void 0 ? void 0 : _c.list_properties) === null || _d === void 0 ? void 0 : _d.filter(function (p) { return p.visible; }).map(function (p) {
                        var _a;
                        var schema = collection.schema[p.property];
                        var data = block && ((_a = block.properties) === null || _a === void 0 ? void 0 : _a[p.property]);
                        // console.log('list item body', p, schema, data)
                        if (!schema) {
                            return null;
                        }
                        return (React.createElement("div", { className: 'notion-list-item-property', key: p.property },
                            React.createElement(Property, { schema: schema, data: data, block: block, collection: collection })));
                    }))));
            })))));
};
//# sourceMappingURL=collection-view-list.js.map