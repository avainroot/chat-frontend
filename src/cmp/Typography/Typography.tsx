import React from "react";
import clsx from 'clsx';
import './Typography.less';

const prefixCls = "cmp-typography";

export interface TypographyTitleProps {
    type?: "default" | "success" | "warning" | "danger" | "secondary"
    level?: "inherit" | 'title'
    disabled?: boolean
    children?: React.ReactNode
}

export const TypographyTitle: React.FC<TypographyTitleProps> = (props: TypographyTitleProps) => {
    const {level = 'title', disabled, type = "default", children} = props;

    return (
        <p className={clsx(`${prefixCls}-${level}`, `${prefixCls}`, `${prefixCls}-${type}`, {
            [`${prefixCls}-disabled`]: disabled
        })}>{children}</p>
    );
}

export interface TypographyTextProps {
    type?: "default" | "success" | "warning" | "danger" | "secondary"
    disabled?: boolean
    level?: 'small' | 'middle' | 'large' | "inherit"
    children?: React.ReactNode
}

export const TypographyText: React.FC<TypographyTextProps> = (props: TypographyTextProps) => {
    const {level = 'middle', disabled, type = "default", children} = props;

    return (<p
        className={clsx(`${prefixCls}-${level}`, `${prefixCls}`, `${prefixCls}-${type}`, {
            [`${prefixCls}-disabled`]: disabled
        })}
    >{children}</p>);
}