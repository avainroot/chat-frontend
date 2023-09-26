import React from "react";
import {Button as AntdButton, ButtonProps as AntdButtonProps} from 'antd';
import clsx from 'clsx';
import "./Button.less";

export interface ButtonProps {
    type?: "primary" | "secondary" | "dropdown"
    children?: AntdButtonProps["children"]
    loading?: AntdButtonProps["loading"]
    disabled?: AntdButtonProps["disabled"]
    size?: AntdButtonProps["size"]
    block?: AntdButtonProps["block"]
    beforeIcon?: AntdButtonProps["icon"]
    afterIcon?: AntdButtonProps["icon"]
    className?: AntdButtonProps["className"]
    htmlType?: AntdButtonProps["htmlType"]
    onClick?: AntdButtonProps["onClick"]
}

export interface ButtonTextProps extends ButtonProps {
    type?: "secondary" | "primary"
}

const prefixCls = "cmp-button";

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {
        type = "secondary",
        children, className,
        beforeIcon, afterIcon,
        loading, disabled, onClick,
        size, block, htmlType,
    } = props;

    return (<AntdButton
        prefixCls={prefixCls}
        className={clsx(
            className,
            `${prefixCls}-type-${type}`, {
                [`${prefixCls}-has-content`]: !!children
            }
        )}
        size={size}
        htmlType={htmlType}
        block={block}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        type="default"
    >
        {!!beforeIcon && <span
            className={clsx(`${prefixCls}-icon`, `${prefixCls}-before-icon`)}
        >{beforeIcon}</span>}
        {!!children && <span className={clsx(`${prefixCls}-text`)}
        >{children}</span>}
        {!!afterIcon && <span className={clsx(`${prefixCls}-icon`, `${prefixCls}-after-icon`)}
        >{afterIcon}</span>}
    </AntdButton>);
}

export const ButtonText: React.FC<ButtonTextProps> = ({className, ...props}: ButtonTextProps) => {

    return (<Button
        className={clsx(className, `${prefixCls}-has-text`,)}
        {...props}
    />);
}