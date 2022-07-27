export interface PropsWithClass {
    className?: string;
}

export interface PropsWithStyle {
    style?: React.CSSProperties;
}

export interface SequelizeTableCommonDBResults extends Object{
    createdAt: string;
    updatedAt: string;
}