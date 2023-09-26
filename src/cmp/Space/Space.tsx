import React from "react";
import {Space as AntdSpace, SpaceProps as AntdSpaceProps} from 'antd';
import clsx from 'clsx';
import "./Space.less";

export interface SpaceProps {
    className?: AntdSpaceProps["className"]
    size?: AntdSpaceProps["size"]
    direction?: AntdSpaceProps["direction"]
    align?: AntdSpaceProps["align"]
    wrap?: AntdSpaceProps["wrap"]
    children?: React.ReactNode
}

const prefixCls = "cmp-space";

export const Space : React.FC<SpaceProps> = ({children, className, align = "baseline", direction, ...props}: SpaceProps) => {
    return (<AntdSpace
        prefixCls={prefixCls}
        className={clsx(className)}
        align={align}
        direction={direction}
        {...props}
    >{children}</AntdSpace>);
}