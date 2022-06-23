import {ReactNode} from "react";

export interface ChildrenProps {
    children?: ReactNode
}

export interface CSSClassesProps {
    className?: string;
}

export interface CSSStylesProps {
    style?: React.CSSProperties;
}

export interface SequelizeTableCommonDBResults {
    createdAt: string;
    updatedAt: string;
}