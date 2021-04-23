import * as types from 'notion-types';
export declare type MapPageUrl = (pageId: string) => string;
export declare type MapImageUrl = (url: string, block: types.Block) => string;
export declare type SearchNotion = (params: types.SearchParams) => Promise<types.SearchResults>;
export interface NotionComponents {
    link: any;
    pageLink: any;
    code: any;
    equation: any;
    collection: any;
    collectionRow: any;
    pdf: any;
    tweet: any;
    modal: any;
}
export interface CollectionViewProps {
    collection: types.Collection;
    collectionView: types.CollectionView;
    collectionData: types.CollectionQueryResult;
    padding: number;
    width: number;
}
export interface CollectionCardProps {
    collection: types.Collection;
    block: types.PageBlock;
    cover: types.CollectionCardCover;
    coverSize: types.CollectionCardCoverSize;
    coverAspect: types.CollectionCardCoverAspect;
    properties?: Array<{
        property: types.PropertyID;
        visible: boolean;
    }>;
    className?: string;
}
