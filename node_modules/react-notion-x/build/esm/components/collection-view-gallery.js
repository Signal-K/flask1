import React from 'react';
import { cs } from '../utils';
import { useNotionContext } from '../context';
import { CollectionCard } from './collection-card';
export var CollectionViewGallery = function (_a) {
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData;
    var recordMap = useNotionContext().recordMap;
    var _b = collectionView.format || {}, _c = _b.gallery_cover, gallery_cover = _c === void 0 ? { type: 'none' } : _c, _d = _b.gallery_cover_size, gallery_cover_size = _d === void 0 ? 'medium' : _d, _e = _b.gallery_cover_aspect, gallery_cover_aspect = _e === void 0 ? 'cover' : _e;
    console.log('gallery', { collection: collection, collectionView: collectionView, collectionData: collectionData });
    return (React.createElement("div", { className: 'notion-gallery' },
        React.createElement("div", { className: 'notion-gallery-view' },
            React.createElement("div", { className: cs('notion-gallery-grid', "notion-gallery-grid-size-" + gallery_cover_size) }, collectionData.blockIds.map(function (blockId) {
                var _a, _b;
                var block = (_a = recordMap.block[blockId]) === null || _a === void 0 ? void 0 : _a.value;
                if (!block)
                    return null;
                return (React.createElement(CollectionCard, { collection: collection, block: block, cover: gallery_cover, coverSize: gallery_cover_size, coverAspect: gallery_cover_aspect, properties: (_b = collectionView.format) === null || _b === void 0 ? void 0 : _b.gallery_properties, key: blockId }));
            })))));
};
//# sourceMappingURL=collection-view-gallery.js.map