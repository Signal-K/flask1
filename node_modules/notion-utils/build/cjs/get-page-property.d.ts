import { Block, ExtendedRecordMap } from 'notion-types';
/**
 * Gets the value of a collection property for a given page (collection item).
 *
 * TODO: handle non-text property types.
 */
export declare function getPageProperty(propertyName: string, block: Block, recordMap: ExtendedRecordMap): string | null;
