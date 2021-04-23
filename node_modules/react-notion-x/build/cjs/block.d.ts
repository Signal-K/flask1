import React from 'react';
import * as types from 'notion-types';
interface BlockProps {
    block: types.Block;
    level: number;
    className?: string;
    bodyClassName?: string;
    footer?: React.ReactNode;
    pageHeader?: React.ReactNode;
    pageFooter?: React.ReactNode;
    pageAside?: React.ReactNode;
    pageCover?: React.ReactNode;
}
export declare const Block: React.FC<BlockProps>;
export {};
