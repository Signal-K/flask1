import { Block, BlockMap } from 'notion-types';
import isUrl from 'is-url-superb';
export declare const cs: (...classes: Array<string | undefined | false>) => string;
export { isUrl };
export declare const getListNumber: (blockId: string, blockMap: BlockMap) => number;
export declare const defaultMapImageUrl: (url: string, block: Block) => string;
export declare const defaultMapPageUrl: (rootPageId?: string) => (pageId: string) => string;
export declare const formatDate: (input: string) => string;
